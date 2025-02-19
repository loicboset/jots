'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { FormValues } from './page';

export async function login(formData: FormValues) {
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
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect(`/${user.id}`);
}
