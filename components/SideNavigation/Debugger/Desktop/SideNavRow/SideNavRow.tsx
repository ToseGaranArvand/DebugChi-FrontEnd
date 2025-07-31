"use client";

import { Tab, Tabs } from "@heroui/react";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SideNavRow = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const pathParts = pathName?.split("/") || [];

  // اگر داخل صفحه‌ی چت باشیم، تب نشون داده نشه
  if (pathName.includes("/chat/")) return null;

  // تب جاری رو از مسیر بعد از "debugger" پیدا می‌کنیم
  const tabIndex = pathParts.indexOf("debugger") + 1;
  const selectedTab = pathParts[tabIndex] || "dashboard";

  const onTabChange = (key: string) => {
    const newPathParts = [...pathParts];

    // اگر تب قبلاً در مسیر بوده، جایگزین کن، وگرنه اضافه کن
    if (tabIndex < newPathParts.length) {
      newPathParts[tabIndex] = key;
    } else {
      newPathParts.push(key);
    }

    const newPath = newPathParts.join("/");

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("tab"); // tab تو مسیر هست دیگه نیازی به query نیست

    const newUrl = params.toString()
      ? `${newPath}?${params.toString()}`
      : newPath;

    router.replace(newUrl, { scroll: false });
  };

  return (
    <div
      dir="rtl"
      className="p-0.5 rounded-2xl bg-gradient-to-r from-[#242424] via-transparent to-[#242424]"
    >
      <div className="bg-[#0F0F0F] w-full flex-shrink-0 rounded-2xl">
        <div className="flex justify-between items-center h-20 px-4">
          <Tabs
            aria-label="Tabs variants"
            variant="underlined"
            selectedKey={selectedTab}
            onSelectionChange={(key) => onTabChange(key as string)}
            classNames={{
              tabList: "gap-6",
              cursor: "bg-white",
              tab: "px-2 py-1 text-sm text-gray-400 data-[selected=true]:text-white",
            }}
          >
            <Tab key="dashboard" title="بخش اصلی" />
            <Tab key="activeClasses" title="کلاس‌ها" />
            <Tab key="support" title="پشتیبانی" />
            <Tab key="history" title="تاریخچه" />
            <Tab key="rate" title="رتبه" />
          </Tabs>

          <div className="flex gap-6">
            <button className="text-gray-400 hover:text-white transition-colors px-2 py-1 text-sm">
              تسک منتخب
            </button>
            <button className="text-gray-400 hover:text-white transition-colors px-2 py-1 text-sm">
              تنظیمات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SideNavRow };
