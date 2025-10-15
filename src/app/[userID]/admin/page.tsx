import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import Admin from './Admin';

const AdminWrapper = async (): Promise<React.ReactElement> => {
  // AUTH
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  const allowedUsers = ['loic.boset@gmail.com', 'j.zouzou@icloud.com'];

  if (error || !data?.user || !data.user.email || !allowedUsers.includes(data.user.email)) {
    redirect('/');
  }

  return <Admin />;
};

export default AdminWrapper;
