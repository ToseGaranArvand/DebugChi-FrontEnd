"use client";
import { BackgroundLines } from "@/components/ui/ace/background-line";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const Roadmap = (props: Props) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col justify-center gap-4 items-center min-h-[1400px] bg-slate-100 dark:bg-slate-900 border-b dark:border-b-slate-950 text-violet-500  box-border p-5 relative">
      <BackgroundLines className="flex flex-col">
        <span></span>
      </BackgroundLines>
      <div className="absolute top-0">
        <Image
          src={
            theme === "light" ? "/landing/card_9.png" : "/landing/roadmap-dark.png"
          }
          width={1400}
          height={700}
          className="mx-auto"
          alt="چگونه از خدمات استفاده کنیم"
        />
        <Image
          src={
            theme === "light" ? "/landing/card_8.png" : "/landing/card_7.png"
          }
          width={1400}
          height={700}
          className="mx-auto"
          alt="چگونه از خدمات استفاده کنیم"
        />
      </div>
    </div>
  );
};

export default Roadmap;
