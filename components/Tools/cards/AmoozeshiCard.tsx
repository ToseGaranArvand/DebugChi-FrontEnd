import { Main } from '@/components/routes/projects/Amoozeshi/Amoozeshi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import { faIR } from 'date-fns/locale'
import { Download } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers'

type Props = {
    item:Main,
    user_id:any
}

const AmoozeshiCard = ({item,user_id}: Props) => {
  console.log(item)
  return (

    <Card key={item.id} className="flex flex-col">
    <CardHeader className="flex">
      <CardTitle className="w-full flex items-center text-xl font-bold gap-4">
        {item.educational_heading}

        {item.language.map((lang) => (
          <Badge
            key={lang.id}
            className="bg-green-100 text-green-900"
          >
            {lang.name + " " + lang.level}
          </Badge>
        ))}

        <div className="flex-1"></div>
        <Badge variant={"secondary"}>
          {" "}
          {formatDistanceToNow(new Date(item.created_at), {
            addSuffix: true,
            locale: faIR,
          })}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      {/* Type Class */}

      <p className="text-sm w-3/4 text-wrap">{item.description}</p>
      {/* Price and Discount */}
      {/* <p className="text-lg font-semibold mb-2">
        قیمت: {item.price} تومان{' '}
        {item.discount > 0 && (
          <span className="text-red-500 line-through mr-2">
            {item.price + item.discount}
          </span>
        )}
      </p> */}

      {/* Languages */}

      {/* Expertise */}
      <span className="font-extrabold">
        مهارت هایی که یاد میگیرید :{" "}
      </span>
      <div className="flex flex-wrap gap-2">
        {item.expertise.map((exp) => (
          <Badge key={exp.id} variant="outline">
            {exp.title}
          </Badge>
        ))}
      </div>

      {/* User Info */}
    </CardContent>

    <CardFooter dir="ltr" className="flex items-end gap-4">
      <Button>
     
          <span>قبول کردن</span>
     
        
      </Button>
      <Link
        href={item.educational_heading_file}
        download={item.educational_heading_file}
        className="flex items-center gap-2 border rounded-md w-36 h-9 px-2 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <span>دانلود سرفصل</span>
        <Separator orientation="vertical" />
        <Download />
      </Link>
      <div className="flex-1"></div>
      {/* <div className="flex items-center mt-4 gap-4" dir="rtl">
        <img
          src={item.user.image_profile || "/default-profile.png"}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">
            {item.user.first_name} {item.user.last_name}
          </p>
          <p className="text-sm text-gray-500">
            {item.user.user_expertise.map((exp) => exp)}
          </p>
        </div>
      </div> */}
    </CardFooter>
  </Card>
  )
}

export default AmoozeshiCard