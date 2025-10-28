import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

type Props = {
  params: Promise<{ userID: string }>;
};

const UserAppRoot = async ({ params }: Props): Promise<null> => {
  // PROPS
  const userID = (await params).userID;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || data.user.id !== userID) {
    redirect('/login');
  }

  return redirect(`/${userID}/reflections`);
};

export default UserAppRoot;
