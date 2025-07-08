import DebuggerCards from "@/components/routes/user_by_role/Cards";
import OnlineDebuggers from "@/components/routes/user_by_role/OnlineDebuggers";
import DotGrid from "@/components/Tools/DotGrid";
import { Main, User } from "@/components/types/UserByRole";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ArrowRight, ChevronRightIcon } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: any) => {
  const param = await params;
  const token = (await cookies()).get("token")?.value;
  let user: any;
  if (token) {
    user = jwtDecode(token);
  }
  const getData = await axios.get(
    `${process.env.server}/api/v1/user-by-role/?name=${param.user_by_role}`
  );
  const res = await getData.data;

  return (
    <main className="flex flex-col">
      <section className="bg-center bg-no-repeat bg-cover bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
          مشاوره و راهنمایی تخصصی برای رفع اشکالات برنامه‌نویسی و دیباگ
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          آیا در کد خود به بن‌بست رسیده‌اید؟ یا نیاز به یک نگاه حرفه‌ای برای رفع مشکلات پروژه‌تان دارید؟
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              <ChevronRightIcon />
             دیباگر شو
            </a>
            <a
              href="#"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
             دیباگ میخوام
            </a>
          </div>
        </div>
      </section>
      <section className="w-3/4 mx-auto my-6">
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 py-3 ">پیشنهاد دیباگچی</span>
        <OnlineDebuggers />
      </section>
      <section className="grid grid-cols-[25%_75%] gap-4  mt-2 h-auto box-border place-content-center w-3/4 mx-auto">
        <div className="border box-border p-5 rounded-xl shadow-md max-h-max sticky top-24">
          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1">
              <AccordionTrigger>زبان برنامه نویسی</AccordionTrigger>
              <AccordionContent>
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  پایتون
                </label>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>مهارت ها</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>نوع مشاواره</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {res && res[0].users.map((item: User) => {
            return (
              <DebuggerCards
                key={item.id}
                data={item}
                debugger_applicator={token ? user.user_id : 0}
              />
            );
          })}
    
        </div>
      </section>
    </main>
  );
};

export default page;
