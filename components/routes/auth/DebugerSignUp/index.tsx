"use client";
import { LogoIcon } from "@/components/ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Input,
} from "@heroui/react";
import Link from "next/link";
import React, { FormEvent } from "react";

type Props = {};

const DebugerSignUp = (props: Props) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Card className="min-w-96 box-border p-5">
        <CardHeader className="flex justify-between">
          <LogoIcon size="150" />
          <Link href={"/debug/login"} className="text-amber-500">
            دیباگر هستی؟
          </Link>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            isRequired
            label="شماره تلفن"
            name="user_phone"
            placeholder="09xxxxmmxxxxx"
            type="text"
            validate={(value) => {
              if (value.length > 11 || value.length < 11) {
                return "شماره تلفن وارد شده صحیح نیست";
              } else if (!value.startsWith("09", 0)) {
                return "شماره تلفن وارد شده صحیح نیست";
              }
            }}
          />
          <div className="flex w-full  gap-4">
            <Input
              isRequired
              errorMessage="نام خود را وارد نمایید"
              label="نام"
              name="first_name"
              placeholder="جان"
              type="text"
            />
            <Input
              isRequired
              errorMessage="نام خانوادگی را وارد نمایید"
              label="نام خانودگی"
              name="last_name"
              placeholder="دو"
              type="text"
            />
          </div>
          <Input
            isRequired
            errorMessage="ایمیل صحیح وارد نمایید"
            label="ایمیل"
            name="email"
            placeholder="abc@gmail.com"
            type="email"
          />
          <Input
            isRequired
            errorMessage="نام کاربری صحیح نمی باشد"
            label="نام کاربری"
            name="username"
            placeholder="HelloWorld"
            type="text"
          />
          <Input
            isRequired
            errorMessage="حداقل 8 کاراکتر وارد نمایید"
            label="کلمه عبور"
            name="password"
            placeholder="حداقل 8 کاراکتر"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "حداقل 8 کاراکتر وارد نمایید";
              }
            }}
          />
        </CardBody>
        <CardFooter>
          <Button
            fullWidth
            color="warning"
            variant="shadow"
            type="submit"
            className="w-full h-14 text-xl"
          >
            ثبت نام
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default DebugerSignUp;
