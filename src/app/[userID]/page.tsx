import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import NavBar from './parts/Navbar'
import Editor from './parts/Editor'

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
      <NavBar />
      <Editor />
    </div>
  )
}

export default UserAppRoot