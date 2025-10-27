import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import Profile from './Profile';

const ProfileWrapper = async (): Promise<React.ReactElement> => {
  // AUTH
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || !data.user.email) {
    redirect('/login');
  }

  return <Profile email={data.user.email} />;
};

export default ProfileWrapper;
