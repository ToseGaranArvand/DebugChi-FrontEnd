"use client";
import { Ripple } from "@/components/ui/magicUI/Ripple";
import { Avatar, Badge, Button, Link } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/ace/animated-tooltip";
import { Bug } from "lucide-react";

const onlineUsers = [
  {
    id: 1,
    name: "Alireza Yousef",
    designation: "Full-Stack Developer",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    position: { top: "10%", left: "30%" },
  },
  {
    id: 2,
    name: "Sarah Smith",
    designation: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826713d",
    position: { top: "30%", left: "80%" },
  },
  {
    id: 3,
    name: "John Doe",
    designation: "Backend Developer",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826714d",
    position: { top: "50%", left: "10%" },
  },
];

const LiveUsers = () => {
  return (
    <section className="w-full mt-[212px]">
      <div className="max-w-7xl min-h-[400px] mx-auto grid grid-cols-2 gap-4 box-border p-4 bg-gradient-to-r from-[#4f421a2c] to-transparent rounded-3xl">
        <div className="flex flex-col justify-center h-full gap-11">
          <div className="flex flex-col gap-3">

          <h2 className="text-4xl text-amber-500">چگونه من دیباگ انجام میدهم ؟</h2>
          <p className="font-light leading-9">
            
            افرادی که در حال حاضر آنلاین هستن و میتوانند به شما خدمات دیباگینگ
            <br />
            ارائه دهند.
          </p>
          </div>
          <Button endContent={<Bug />} variant="shadow" color="warning" className="w-1/4" as={Link} href="/community/chat/?query=urgent-debug">درخواست دیباگ</Button>
        </div>
        <div className="relative w-full flex mx-auto h-[500px] flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
          {onlineUsers.map((user) => (
            <motion.div
              key={user.id}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute z-50"
              style={{ top: user.position.top, left: user.position.left }}
            >
              <Badge
                color="success"
                content=""
                placement="bottom-right"
                shape="circle"
                className="z-50"
              >
                <AnimatedTooltip items={[user]} />
              </Badge>
            </motion.div>
          ))}
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="rounded-full w-6 h-6 bg-white/65">

            </div>

          <Ripple animate={"true"} mainSize={50} top="50%" bg_color="bg-gray-500"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveUsers;
