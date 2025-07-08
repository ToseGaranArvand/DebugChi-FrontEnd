"use client";

import Button from "@/components/version_1_1/ui/button";
import Inputs from "@/components/version_1_1/ui/input";
import { showLogin } from "@/redux/slices/globalSlice";
import { useAppDispatch } from "@/redux/store/store";
import {  Alert, Card, CardBody, CardFooter, CardHeader, Form } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type Props = {
  token: string | string[];
};

const ResetPassword = ({ token }: Props) => {
  const [stats, setStats] = useState({
    loading: false,
    error: false,
    message: "",
    alert: false,
  });
  const router = useRouter()
const dispatch = useAppDispatch()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setStats({
        ...stats,loading:true
    })
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.password === data.retype_password) {
      const req = await axios.post(
        process.env.server + "/auths/reset-password/",
        { password: data.password, token: token }
      );

      const res = await req.data;
      setStats({
        alert: true,
        error: res.error,
        loading: true,
        message: res.message,
      });
      
      setTimeout(()=>{
        router.push('/')
        dispatch(showLogin({show:true,path:""}))

      },2000)
    } else {
      setStats({
        alert: true,
        error: true,
        loading: false,
        message: "کلمه عبور برابر نیست",
      });
    }
  };

  return (
    <Card className="min-w-96  min-h-64 border border-default-100">
      <CardHeader dir="rtl">کلمه عبور جدید</CardHeader>
      <CardBody className="flex items-center justify-center">
        <Form className="w-full" onSubmit={submitHandler}>
            
          <Inputs
            size="lg"
            hidden
            name="username"
            placeholder="کلمه عبور"
            type="text"
            autoComplete="username"
          />
          <Inputs
            size="lg"
            name="password"
            placeholder="کلمه عبور"
            type="password"
            autoComplete="new-password"
    
            validate={(value)=>{
                if(value.length < 8){
                    return "حداقل 8 کاراکتر"
                }
            }}
          />
          <Inputs
           validate={(value)=>{
                if(value.length < 8){
                    return "حداقل 8 کاراکتر"
                }
            }}
            size="lg"
            name="retype_password"
            autoComplete="new-password"
            placeholder="تکرار کلمه عبور"
            type="password"
          />
          <Button fullwidth isDisabled={stats.loading} isLoading={stats.loading} type="submit">تغییر کلمه عبور</Button>
          {
            stats.alert && <Alert title={stats.message} color={stats.error ? "danger" : "success"}/>
          }
        </Form>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ResetPassword;
