"use client";
import { Ripple } from "@/components/ui/magicUI/Ripple";
import { Button, Link } from "@heroui/react";
import localFont from "next/font/local";
import React from "react";

type Props={
  header : string;
  description:string;
  description_2:string;
  button_title:string;
  url:string,

} 

const Hero = (props:Props) => {
  return (
    <section
      className={`font-blackSans  relative w-full overflow-hidden min-h-[500px] mx-auto flex flex-col  items-center justify-center gap-14 my-14 dark:bg-black`}
    >
      <h1 className="text-amber-500 text-[60px] font-iranSans z-10">
        {props.header}
      </h1>
      <p className="text-center text-xl leading-10 z-10">
        {props.description}
        <br />
      {props.description_2}
      </p>
      <Button
        variant="shadow"
        color="warning"
        className="rounded-full border z-10"
        as={Link}
        href={props.url}
      >
        {props.button_title}
      </Button>
      <div className=" h-full rounded-full  w-2/4 absolute top-1/4">
      
        {/* <Ripple animate={"false"} mainSize={150} numCircles={20} top="105%" /> */}
      </div>
    </section>
  );
};

export default Hero;
