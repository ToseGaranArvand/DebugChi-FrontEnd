"use client";

import React from "react";
import { CourseDetailContainer } from "./Components/CourseDetailContainer/CourseDetailContainer";
import { NotificationContainer } from "./Components/NotificationContainer/NotificationContainer";
import { PendingClassesContainer } from "./Components/PendingClassesContainer/PendingClassesContainer";
import { useBidFilter } from "@/context/BidFilterContext";
import { NormalDrawer } from "../../ui/NormalDrawer";
import { TitledHeader } from "./Components/Headers/TitledHeader/TitledHeader";
const collapseItems = [
  {
    title: "وضعیت",
    items: [
      { key: "all", label: "همه" },
      { key: "active", label: "فعال" },
      { key: "finished", label: "پایان یافته" },
    ],
  },
  {
    title: "نوع کلاس",
    items: [
      { key: "all", label: "همه" },
      { key: "tender", label: "مناقصه" },
      { key: "advertisement", label: "آگهی" },
    ],
  },
];
const RenderContent = ({ sidePanelContent }: { sidePanelContent: any }) => {
  if (
    typeof sidePanelContent === "object" &&
    sidePanelContent !== null &&
    "id" in sidePanelContent
  ) {
    return (
      <CourseDetailContainer
        id={sidePanelContent.id}
        header={
          <TitledHeader
            backButton={{ show: true, path: "notification" }}
            titleOptions={{ show: true, text: "سر فصل های پروژه" }}
          />
        }
      />
    );
  }

  if (sidePanelContent === "notification") {
    return (
      <NotificationContainer
        header={
          <TitledHeader
            searchEnabled
            filterOptions={{ show: true, collapses: collapseItems }}
          />
        }
      />
    );
  }

  if (sidePanelContent === "pendingClasses") {
    return (
      <PendingClassesContainer
        header={
          <TitledHeader
            backButton={{ show: true, path: "notification" }}
            searchEnabled
          />
        }
      />
    );
  }

  return null;
};

const SideListComponent = () => {
  const { sidePanelContent } = useBidFilter();

  return (
    <>
      {/* دسکتاپ */}
      <div className="2xl:block hidden w-[366px] relative border border-default-100 rounded-2xl py-4 overflow-hidden bg-[#0F0F0F]">
        <div className="h-full pb-5">
          <RenderContent sidePanelContent={sidePanelContent} />
        </div>
      </div>

      {/* موبایل */}
      <NormalDrawer
        hideCloseButton={true}
        haveBtn={false}
        placement="right"
        width="sm"
      >
        <div dir="rtl" className="2xl:h-full h-screen py-5 bg-[#0F0F0F]">
          <RenderContent sidePanelContent={sidePanelContent} />
        </div>
      </NormalDrawer>
    </>
  );
};

export { SideListComponent };
