import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type Props = {
  params: Promise<{ userID: string }>
}

const UserAppRoot = async ({ params }: Props) => {
  // PROPS
  const userID = (await params).userID

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user || data.user.id !== userID) {
    redirect('/login')
  }

  return <p>Hello there, {userID}</p>
}

export default UserAppRoot