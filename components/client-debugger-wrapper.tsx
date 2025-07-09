"use client";

import * as React from "react";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import {
  DebugerHome,
  DebugerRequest,
} from "@/components/version_1_1/User/home";
import { RequestFilterProvider } from "@/context/RequetsFilterProvider";

interface ClientDebuggerWrapperProps {
  response: any;
  serializedFaq: any;
  token: string;
}

export default function ClientDebuggerWrapper({
  response,
  serializedFaq,
  token,
}: ClientDebuggerWrapperProps) {
  const [containerWidth, setContainerWidth] = React.useState<number>(720);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateContainerWidth();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <main className="w-full h-screen flex overflow-hidden">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div
        className="flex flex-1 box-border gap-4 p-2 overflow-hidden"
        dir="rtl"
      >
        <div className="flex flex-col w-96 bg-[#0F0F0F] h-full rounded-2xl bg-c_background/50">
          <RequestFilterProvider>
            <DebugerRequest />
          </RequestFilterProvider>
        </div>
        <div
          ref={containerRef}
          className="flex-1 flex flex-col h-full bg-[#0F0F0F] rounded-2xl relative overflow-hidden"
        >
          <section className="flex-1 overflow-hidden">
            <DebugerHome
              user={response}
              faq={serializedFaq}
              containerWidth={containerWidth}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
