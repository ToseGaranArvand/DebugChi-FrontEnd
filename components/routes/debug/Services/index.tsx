import React from "react";
import Services from "../../home/Services";
import { DebugServiceIcon } from "@/components/ui/icons";

type Props = {};

const service = [
  {
    name: "توسعه وب",
    icon: "/svg/Rectangle 125.svg",
    url:  "/community/chat/ai?mode=Web Development",
  },
  {
    name: "اپلیکیشن موبایل",
    icon: "/svg/Rectangle 126.svg",
    url: "/assistent/request/?query=Mobile App",
  },
  {
    name: "نرم افزار ویندوز",
    icon: "/svg/Rectangle 127.svg",
    url: "/assistent/request/?query=Windows Software",
  },
  {
    name: "بازی سازی",
    icon: "/svg/Rectangle 128.svg",
    url: "/assistent/request/?query=Game Development",
  },
  {
    name: "داده هوش مصنوعی",
    icon: <DebugServiceIcon />,
    url: "/assistent/request/?query=AI Data",
  },
  {
    name: "بلاکچین،وب 3",
    icon: "/svg/Rectangle 129.svg",
    url: "/assistent/request/?query=Blockchain, Web 3",
  },
  {
    name: "امنیت و هک قانونمند",
    icon: "/svg/Rectangle 130.svg",
    url: "/assistent/request/?query=and Ethical Hacking",
  },
  {
    name: "اینترنت اشیاء",
    icon: "/svg/Rectangle 131.svg",
    url: "/assistent/request/?query=Internet of Things",
  },
  {
    name: "اتوماسیون و اسکریپت نویسی",
    icon: "/svg/Rectangle 132.svg",
    url: "/assistent/request/?query=Automation and Scripting",
  },
  {
    name: "پایگاه داده",
    icon: "/svg/Rectangle 125.svg",
    url: "/community/chat/ai?mode=Database",
  },
];

const DebugService = (props: Props) => {
  return (
    <section
      className="max-w-7xl mx-auto min-h-[400px] mt-[212px]"
      id="service"
    >
      <Services data={service}  title="خدمات رفع باگ" title_placement="justify-start"/>
    </section>
  );
};

export default DebugService;
