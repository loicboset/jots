'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

export async function resetPassword(
  newPassword: string,
): Promise<{ message: string; type: 'success' | 'danger' }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return {
      message: error?.message ?? 'An error occurred. Please try again or contact support.',
      type: 'danger',
    };
  }

  revalidatePath('/', 'layout');

  return { message: 'Your password has been updated!', type: 'success' };
}
