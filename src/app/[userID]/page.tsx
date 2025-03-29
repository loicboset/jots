import { redirect } from 'next/navigation'

import App from '@/components/App'
import { UserContextProvider } from '@/context/UserProvider'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ userID: string }>
}

const UserAppRoot = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const userID = (await params).userID

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user || data.user.id !== userID) {
    redirect('/login')
  }

  return (
    <UserContextProvider user={{ userID }}>
      <div className='flex h-screen'>
        <App userID={data.user.id} />
      </div>
    </UserContextProvider>
  )
}

export default UserAppRoot