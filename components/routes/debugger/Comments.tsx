"use client";
import React from 'react'
import CommentSlide from './CommentSlide'

type Props = {}

const Comments = (props: Props) => {
  return (
    <div className='border w-full h-auto rounded-lg shadow-md p-5 box-border'>
        <span >نظر کاربران</span>
        <CommentSlide />
    </div>
  )
}

export default Comments