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
    try {
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

      if (!res.error) {
        setOTP(true);
      }
    } catch (error) {
      setStats({
        loading: false,
        alert: true,
        error: true,
        message: "خطا در ارتباط با سرور",
      });
    }
  };

  const verifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    setStats({ ...stats, loading: true });
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    try {
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

      if (!res.error) {
        setTimeout(() => {
          router.push(`/auth/reset-password/?code=${res.data}`);
        }, 2000);
      }
    } catch (error) {
      setStats({
        alert: true,
        message: "خطا در ارتباط با سرور",
        error: true,
        loading: false,
      });
    }
  };


  return (
    <>
      <Button
        variant="light"
        color="default"
        onPress={() => router.push("/")}
        isIconOnly
        className="absolute left-4 top-4 z-50"
        startContent={<ArrowLeft size={24} />}
      />
    
      <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      
        <Card dir="rtl" className="w-[500px]">
          {OTP ? (
            <>
              <CardHeader className="flex items-center justify-center py-6">
                <h2 className="text-2xl font-bold">بازیابی کلمه عبور</h2>
              </CardHeader>
              <CardBody className="py-4">
                <Form onSubmit={verifyHandler} className="space-y-8">
                  <div className="flex flex-col items-center">
                    <InputOtp
                      size="lg"
                      dir="ltr"
                      length={6}
                      name="code"
                      placeholder="کد تأیید را وارد نمایید"
                      className="justify-center"
                    />
                  </div>
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
            </>
          ) : (
            <>
              <CardHeader className="flex items-center justify-center py-6">
                <h2 className="text-2xl font-bold">بازیابی کلمه عبور</h2>
              </CardHeader>
              <CardBody className="py-4">
                <Form onSubmit={submitHandler} className="space-y-8">
                  <Input
                    isRequired
                    name="phone"
                    placeholder="شماره تلفن خود را وارد نمایید"
                    validate={(value) => {
                      if (value.length !== 11 || !value.startsWith("09")) {
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
                    ارسال کد تأیید
                  </Button>
                </Form>
              </CardBody>
            </>
          )}

          <CardFooter className="pt-0 pb-6">
            {stats.alert && (
              <Alert
                title={stats.message}
                color={stats.error ? "danger" : "success"}
                className="mt-4"
              />
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgetPassword;