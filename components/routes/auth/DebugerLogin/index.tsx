"use client";
import { CardContent } from "@/components/ui/card";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Input,
} from "@heroui/react";
import Link from "next/link";
import React from "react";

type Props = {};

const DebugerLogin = (props: Props) => {
  const [action, setAction] = React.useState<string>("");
  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        console.log(data);
      }}
    >
      <Card dir="rtl" className="box-border p-4">
        <CardHeader className="flex justify-between">
          <span>ورود دیباگر ها</span>
          <Link
            href={"/debug/sign-up"}
            className="text-amber-500 underline underline-offset-2"
          >
            دیباگر شو!
          </Link>
        </CardHeader>
        <CardBody className="w-96 h-64 flex items-center justify-center gap-4">
          <Input
            size="lg"
            isRequired
            errorMessage="لطفا نام کاربری وارد نمایید"
            label="ایمیل یا شماره تلفن یا نام کاربری"
            labelPlacement="outside"
            name="username"
            placeholder="نام کاربری"
            type="text"
          />

          <Input
            size="lg"
            isRequired
            errorMessage="کلمه عبور را حتما وارد نمایید"
            label="کلمه عبور"
            labelPlacement="outside"
            name="password"
            placeholder="کلمه عبور"
            type="password"
          />
        </CardBody>
        <CardFooter>
          <Button color="primary" type="submit" fullWidth size="lg">
            ورود
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default DebugerLogin;
