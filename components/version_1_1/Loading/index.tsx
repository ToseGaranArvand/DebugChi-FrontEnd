import React from 'react'
import SidebarBody from '../Sidebar/SideBar'
import SidebarFooter from '../Sidebar/sidebar-footer'
import Cookies from 'js-cookie'
import Sidebar from '../Sidebar'
type Props = {}

const Loading = () => {

    const token = Cookies.get('token')

  return (
    <main className='w-full h-full flex'>
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div className="flex-1 flex   h-full box-border p-4 gap-4">loading...</div>
    </main>
  )
}

export default Loading