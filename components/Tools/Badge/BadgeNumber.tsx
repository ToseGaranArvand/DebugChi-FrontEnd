import { Badge } from '@/components/ui/badge'
import React from 'react'

type Props = {
    number:number;
}

const BadgeNumber = (props: Props) => {
  return (
    <div className='absolute left-2 rounded-full w-5 h-5  flex items-center justify-center bg-blue-500 text-blue-200'>
        {/* <span> */}
            {props.number}
        {/* </span> */}
    </div>
  )
}

export default BadgeNumber