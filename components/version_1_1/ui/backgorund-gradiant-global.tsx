import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const BackgroundGlobalGradient = () => {
  
  return (
     <div className="absolute inset-0 -z-10 pointer-events-none">
             <div className="absolute -left-[900px] -top-[616px] w-[1400px] h-[832px] bg-[#002c7851] blur-[500px]" />
             <div className="absolute -right-[900px] -bottom-[616px] w-[1400px] h-[832px] bg-[#002c7851] blur-[500px]" />
           </div>
  )
}

export default BackgroundGlobalGradient
