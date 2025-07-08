import React from "react";
import { navigation } from "./data";
import Link from "next/link";
import { SearchIcon } from "@/components/ui/SearchInput";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className="w-full h-20 bg-[#363636ad]">
      <div className="flex items-center max-w-7xl mx-auto">
        {navigation.map((item) => {
          return (
            <Link href={item.url} key={item.id}>
              <div
                className={`flex items-center gap-1 ${
                  item.title_en === "Debug" ? "mx-4" : ""
                }`}
              >
                <div>{item.icon}</div>
                <div
                  className={`flex flex-col ${
                    item.title_en === "Debug" ? "mx-4" : ""
                  }`}
                >
                  <span>{item.title_fa}</span>
                  <span className="text-orange-500">{item.title_en}</span>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="flex-1"></div>
        <div>
          <Input
            radius="full"
            classNames={{
              // mainWrapper:"bg-white",
              inputWrapper:"bg-black text-white ",
              // input:"bg-[#363636ad] text-white",
              // innerWrapper:"bg-white text-white",
            }}
            className="w-80"
            endContent={<Search className="text-orange-500" />}
            placeholder="جستجو خدمات..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
