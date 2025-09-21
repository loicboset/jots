import { cookies } from "next/headers";
import fetch from "node-fetch";

import { encrypt } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/server";
import type { MutableCookies } from "@/types/github";



export async function GET(req: Request): Promise<Response> {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = (await cookies()) as unknown as MutableCookies;
  const cookieState = cookieStore.get("gh_state")?.value;

  if (!code || !state || state !== cookieState) {
    return new Response("Invalid state", { status: 400 });
  }

  // --- GitHub token exchange using node-fetch ---
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.GITHUB_OAUTH_CALLBACK!,
    state,
  });

  const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const tokenJson: { access_token?: string; error?: string } = await tokenResp.json();

  if (!tokenJson.access_token) {
    return new Response("GitHub token error", { status: 400 });
  }

  const encrypted = encrypt(tokenJson.access_token);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.id) return new Response("Unauthorized", { status: 401 });

  await supabase
    .from("user_settings")
    .update({ github_token_encrypted: encrypted })
    .eq("user_id", user.id);

  // Redirect back to profile with optional connected=1
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const url = new URL(`/${user.id}/profile`, baseUrl);

  return Response.redirect(url.toString());
}



