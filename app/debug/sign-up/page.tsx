import DebugerSignUp from '@/components/routes/auth/DebugerSignUp'
import Sidebar from '@/components/version_1_1/Sidebar'
import SidebarBody from '@/components/version_1_1/Sidebar/SideBar'
import SidebarFooter from '@/components/version_1_1/Sidebar/sidebar-footer'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <main className="w-full h-screen flex">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter />
      </Sidebar>
      <div className="flex-1 h-full flex w-full justify-center items-center" dir='rtl'>
        <DebugerSignUp />
      </div>
    </main>
  )
}

export default page