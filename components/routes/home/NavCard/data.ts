import { Bug, GraduationCap, Headset } from "lucide-react";


export const colors = {
    blue: {
      text: "text-blue-800",
      bg: "bg-blue-800",
      hover: "hover:bg-blue-500",
    },
    amber: {
      text: "text-amber-800",
      bg: "bg-amber-800",
      hover: "hover:bg-amber-500",
    },
    gray: {
      text: "text-gray-800",
      bg: "bg-gray-800",
      hover: "hover:bg-gray-500",
    },
    red: {
      text: "text-red-800",
      bg: "bg-red-800",
      hover: "hover:bg-red-500",
    },
  };
  
  export const navCard = [
    {
      id: 1,
      name: "دیباگ",
      icon: Bug,
      ...colors.blue,
      link: "/",
    },
    {
      id: 2,
      name: "کلاس خصوصی",
      icon: GraduationCap,
      ...colors.amber,
      link: "/",
    },
    {
      id: 3,
      name: "کلاس عمومی",
      icon: GraduationCap,
      ...colors.gray,
      link: "/",
    },
    {
      id: 4,
      name: "مشاوره آموزشی",
      icon: Headset,
      ...colors.red,
      link: "/",
    },
  ];
