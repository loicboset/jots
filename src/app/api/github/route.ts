// app/api/auth/github/route.ts
import { randomBytes } from 'crypto';

import { cookies } from 'next/headers';

import type { MutableCookies } from '@/types/github';

export const runtime = 'nodejs'; // ⬅ force Node runtime

export async function GET(): Promise<Response> {
  const state = randomBytes(16).toString('hex');

  // In node runtime this is a MutableCookies instance
  const cookieStore = (await cookies()) as unknown as MutableCookies;

  cookieStore.set({
    name: 'gh_state',
    value: state,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID ?? '',
    redirect_uri: process.env.GITHUB_OAUTH_CALLBACK ?? '',
    scope: process.env.GITHUB_SCOPES || 'repo:read',
    state,
    allow_signup: 'false',
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
