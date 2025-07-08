"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { log } from "console";
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const phone = useRef<HTMLInputElement | null>(null)
    const [phone_number, setPhone] = useState("")
    const [value, setValue] = useState("")
    const [showOtp, setShowOtp] = useState(false)
    const [loading, setLoading] = useState(false)
    const route = useRouter()
    const loginHandler = async (e:FormEvent)=>{
      
      e.preventDefault()
      
      
      setShowOtp(true)
      setLoading(true)
      setPhone(phone.current?.value || "")
        try {
            const request = await axios.post(`${process.env.server}/auths/login/`, {
                phone: phone.current?.value
            })
            const response = await request.data
            console.log(response);
            if (response.success){
                setShowOtp(true)
                setLoading(false)
            }
        } catch (err: any) {
          setLoading(false)
          
            if (err?.response.status == 401){
                console.log(err)
                
            }
            else if (err?.response.status == 400){
                console.log(err)
            }
            else if (err?.response.status == 500){
                console.log(err)
        }
    }

    }


    const verifyOtpHandler = async ()=>{
        setLoading(true)
        try {
         
            const request_server = await axios.post(`${process.env.server}/auths/verify_otp/`, {
                phone: phone.current?.value,
                otp:value
            })
            const response = await request_server.data
            console.log(response);
            if (response.success){
              Cookies.set('token',response.access)
              Cookies.set('uuid',response.uuid)
            }
            if (response.intro){
                window.location.href = '/'
            }else{
              window.location.href = '/user/intro'
            }
            
                
              

            
        } catch (err: any) {
          setLoading(false)

            if (err?.response.status == 401){
                console.log(err)
            }
            else if (err?.response.status == 400){
                console.log(err)

            }
          } 
        }
    useEffect(()=>{
      if(value.length === 6){
        verifyOtpHandler()
      }
    },[value])
  return (
    <div className={cn(`flex flex-col gap-6`, className)} {...props}>
      <div className={`w-[800px] h-[500px] ${showOtp ? "hidden" : ""}`}>
        <Card className=" overflow-hidden ">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={loginHandler}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">به دیباگچی خوش آمدید</h1>
                  <p className="text-balance text-muted-foreground my-4">
                    دیباگچی دنیای کد نویسی
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">شماره تلفن</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="09xxxxxxxxx"
                    required
                    ref={phone}
                  />
                </div>
               
                <Button type="submit" className="w-full flex gap-5">
                  <span>ورود</span>
                  {loading &&
                  <Loader2Icon className="animate-spin duration-500"/>
                  }
                </Button>
             
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://bairesdev.mo.cloudinary.net/blog/2023/07/debug.jpg?tx=w_1920,q_auto"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
         
        </div>
      </div>

      <Card className={`${showOtp ? "flex flex-col" : "hidden"} transition-all duration-500`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="flex-1">
              کد تایید
              </span>
              <Button variant={"outline"} onClick={()=>setShowOtp(false)}><span>
                بازگشت</span>
                
                <ArrowLeft className="w-4 h-4 ml-2" />
                </Button>
            </CardTitle>
          <CardDescription>
            <p className="mt-5">

            کد شش رقمی برای شماره تلفن {phone.current?.value} ارسال شده
            </p>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <div className="space-y-2" dir="ltr">
      <InputOTP

        maxLength={6}
        value={value}
        onChange={(value) =>{ setValue(value);}}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
     
    </div>
        </CardContent>
        <CardFooter className="flex flex-col">

          <Button className="w-full flex-1" onClick={verifyOtpHandler}>
            <span>تایید</span>
            {loading &&
                  <Loader2Icon className="animate-spin duration-500"/>
                  }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
