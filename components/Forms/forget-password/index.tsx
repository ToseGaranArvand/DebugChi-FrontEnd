"use client";
import Button from "@/components/version_1_1/ui/button";
import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  InputOtp,
  CardHeader,
  Form,
  Input,
} from "@heroui/react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const ForgetPassword = () => {
  const [stats, setStats] = useState({
    loading: false,
    error: false,
    message: "",
    alert: false,
  });
  const router = useRouter();
  const [OTP, setOTP] = useState(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setStats({ ...stats, loading: true });
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const req = await axios.post(
      process.env.server + "/auths/forget-password/",
      data
    );
    const res = await req.data;
    setStats({
      loading: false,
      alert: true,
      error: res.error,
      message: res.message,
    });

    if (res.error) {
      console.log(res);
    } else {
      setOTP(true);
      setStats({ ...stats, alert: false });
    }
  };

  const verifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    setStats({
      ...stats,
      loading: true,
    });
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const req = await axios.post(
      process.env.server + "/auths/code-verification/",
      data
    );
    const res = await req.data;

    setStats({
      alert: true,
      message: res.message,
      error: res.error,
      loading: false,
    });
    if (res.error == false) {
        setStats({
            ...stats,
            loading:true
        })
        setTimeout(()=>{
            router.push(`/auth/reset-password/?code=${res.data}`)
        },2000)
    } else if (res.error) {
      setStats({
        ...stats,
        loading: false,
      });
    }
  };

  if (OTP) {
    return (
      <Card dir="rtl" className="w-96 h-96">
        <CardHeader className="flex items-center justify-between box-border px-4">
          <span>بازیابی کلمه عبور</span>
          <Button
            variant="light"
            color="default"
            onPress={() => setOTP(false)}
            isIconOnly
            startContent={<ArrowLeft />}
          ></Button>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center w-full">
          <Form
            onSubmit={verifyHandler}
            className="w-full flex items-center justify-center"
          >
            <InputOtp
              size="lg"
              dir="ltr"
              length={6}
              name="code"
              placeholder="شماره تلفن خود را وارد نمایید"
            />
            <Button
              fullwidth
              size="lg"
              type="submit"
              isLoading={stats.loading}
              isDisabled={stats.loading}
            >
              بررسی
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          {stats.alert && (
            <Alert
              title={stats.message}
              color={stats.error ? "danger" : "success"}
            />
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <Card dir="rtl" className="w-96 h-96">
        <CardHeader className="flex items-center justify-between box-border px-4">
          <span>بازیابی کلمه عبور</span>
          <Button
            isDisabled
            variant="light"
            color="default"
            onPress={() => setOTP(false)}
            isIconOnly
            startContent={<ArrowLeft />}
          ></Button>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center w-full">
          <Form onSubmit={submitHandler} className="w-full">
            <Input
              isRequired
              name="phone"
              placeholder="شماره تلفن خود را وارد نمایید"
              validate={(value) => {
                if (value.length != 11 && !value.startsWith("09")) {
                  return "فرمت شماره موبایل صحیح نیست";
                }
              }}
            />
            <Button
              fullwidth
              size="lg"
              type="submit"
              isLoading={stats.loading}
              isDisabled={stats.loading}
            >
              ارسال لینک
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          {stats.alert && (
            <Alert
              title={stats.message}
              color={stats.error ? "danger" : "success"}
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ForgetPassword;
