import React from 'react'
import MenuButton from './MenuButton'
import { Button, Link } from '@heroui/react'
import { ArrowRightSquare } from 'lucide-react'

type Props = {
    user:any
}

const ProfileMenuButton = (props: Props) => {
  return (
    // <div className='w-auto px-4 flex gap-2'>
        <MenuButton user={props.user}/>
        // </div>
      )
    }
    
    export default ProfileMenuButton
    {/* <Button as={Link} variant='flat' size='lg' color='warning' startContent={<ArrowRightSquare />}>داشبورد</Button> */}