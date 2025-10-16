'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { FormValues } from './page';

export async function login(formData: FormValues): Promise<{ message: string }> {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(data);

  if (error || !user) {
    return {
      message: error?.message ?? 'An error occurred. Please try again or contact support.',
    };
  }

  revalidatePath('/', 'layout');
  redirect(`/${user.id}/reflections`);
}
