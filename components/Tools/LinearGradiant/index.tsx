import React from 'react'

type Props = {

    from:string;
    to:string;
}

export const LinearGradiant = (props: Props) => {
  return (
     <div className={`bg-gradient-to-t ${props.from} ${props.to} w-full h-full`}>
    </div>
  )
}


export const LinearGradiantDownToTop = (props:Props)=>{
  return(
    <div className={`absolute bg-gradient-to-t ${props.from} ${props.to} w-full h-full z-0`}>
    </div>
  )
}

