import { Expertise } from '@/components/types/user.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, User } from 'lucide-react';
import React from 'react'

type Props = {
    name:string,
    image:string,
    speciality:Expertise[],
    user_score:number
}
const StarRating = ({ score }: { score: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={star <= score ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const ProfileWithImageCard = ({name,image,speciality,user_score}: Props) => {
  return (
    <div className="flex items-center mt-4 gap-4" dir="rtl">
      <Avatar>
        <AvatarImage src={image} alt={name}></AvatarImage>
        <AvatarFallback><User /></AvatarFallback>
      
      </Avatar>
      {/* {
        image != '' && 
    <img
      src={image || ''}
      alt="User Profile"
      className="w-12 h-12 rounded-full object-cover mr-4"
    />
      }
    {image == '' && <User size={32} />} */}
    <div>
      <div className='flex gap-4 items-center'>
      <span className="font-semibold">
        {name}
      </span>
      <StarRating score={Math.min(Math.round(user_score), 5)} />

      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        {speciality.map((exp) => {
          return (
            <span key={exp.id}>{exp.title}</span>
          )
        })}
      </p>
    </div>
    </div>
  )
}

export default ProfileWithImageCard