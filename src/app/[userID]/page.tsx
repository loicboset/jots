import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import App from '@/components/App'

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

  return (
    <div className='flex h-screen'>
      <App userID={data.user.id} />
    </div>
  )
}

export default UserAppRoot