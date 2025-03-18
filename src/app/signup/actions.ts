"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { FormValues } from "./page";

export async function signup(formData: FormValues): Promise<{ message: string }> {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { message: error?.message ?? "An error occurred. Please try again or contact support." };
  }

  revalidatePath("/", "layout");
  redirect("/private");
}
