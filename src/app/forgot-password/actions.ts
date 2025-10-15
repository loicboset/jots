'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

export async function sendResetPasswordLink(
  email: string,
): Promise<{ message: string; type: 'success' | 'danger' }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      message: error?.message ?? 'An error occurred. Please try again or contact support.',
      type: 'danger',
    };
  }

  revalidatePath('/', 'layout');

  return {
    message: 'A reset link has been sent to your email address.',
    type: 'success',
  };
}
