import { createClient } from '@/lib/supabase/server';

const getUserEmail = async (): Promise<string | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || !data.user.email) {
    return null;
  }

  return data.user.email;
};

export default getUserEmail;
