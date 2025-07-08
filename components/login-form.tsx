"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
export function LoginForm() {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const loginHandler = async () => {
    try {
      setLoading(true);
      const request = await axios.post(`${process.env.server}/auths/login/`, {
        email: email.current?.value,
        password: password.current?.value,
      });
      const response = await request.data;
      console.log(response);
      Cookies.set("token",response.access)
      setLoading(false);
      setError(false)
    } catch (err: any) {
      if (err?.response.status === 401) {
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              ref={email}
              type="email"
              placeholder="m@example.com"
              required
              className={`${error && 'border border-red-500'}`}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required ref={password} className={`${error && 'border border-red-500'}`}/>
          </div>
          {loading ? (
            <Button type="submit" className="w-full" disabled>
              <Loader2 className="animate-spin duration-700" />
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={loginHandler}>
              Login
            </Button>
          )}
          {error && <span className="text-red-400 text-sm text-right">نام کاربری یا کلمه عبور اشتباه است</span>}

          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
