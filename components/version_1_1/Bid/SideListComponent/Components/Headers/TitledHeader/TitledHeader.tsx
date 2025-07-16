"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { useBidFilter } from "@/context/BidFilterContext";
import { SearchInput } from "@/components/version_1_1/ui/SearchInput";
import { CustomCollapse } from "@/components/version_1_1/ui/CustomCollapse";

interface CollapseItem {
  title: string;
  items: { key: string; label: string }[];
}

interface TitledHeaderProps {
  titleOptions?: { show: boolean; text: string };
  searchEnabled?: boolean;
  filterOptions?: { show: boolean; collapses: CollapseItem[] };
  backButton?: {
    show: boolean;
    path: "pendingClasses" | "notification" | { id: number };
  };
}
const TitledHeader: FC<TitledHeaderProps> = ({
  titleOptions = { show: false, text: "" },
  searchEnabled = false,
  filterOptions = { show: false, collapses: [] },
  backButton = { show: false, path: "pendingClasses" },
}) => {
  const { setSidePanelContent, windowWidth, setOpenDrawer } = useBidFilter();
  const [openFilter, setOpenFilter] = useState(false);

  const handleBackPress = () => {
    if (backButton?.path && windowWidth >= 1536) {
      setSidePanelContent(backButton.path);
    } else {
      setOpenDrawer(false);
    }
  };

  const renderCollapse = () =>
    filterOptions.collapses.map(({ title, items }, index) => (
      <div key={index}>
        <h1 className="mb-[11px] font-iranMedium">{title}</h1>
        <CustomCollapse
          dataItems={items}
          defaultValue={items[0]?.label || ""}
          textColor="#BBBBBB"
          containerClassName="rounded-xl !bg-[#222222] border-[#252525]"
          className="w-full h-[37px] text-xs font-iranRegular"
        />
      </div>
    ));

  return (
    <>
      <div className="px-3 relative h-10 flex justify-between items-center">
        {titleOptions.show && (
          <h1 className="mr-6 text-[18px]">{titleOptions.text}</h1>
        )}

        {searchEnabled && (
          <SearchInput
            placeholder="جستجو..."
            className="w-full h-[43px] !bg-[#1C1C1CB2] rounded-[20px] border !border-[#252525] text-[#BBBBBB] placeholder:text-[#BBBBBB] text-[15px] font-iranLight"
          />
        )}

        <div className="pr-2 flex items-center">
          {filterOptions.show && (
            <>
              <Button
                isIconOnly
                onPress={() => setOpenFilter(!openFilter)}
                startContent={
                  <Image
                    src="/images/svg/FilterSvg2.svg"
                    alt="filter"
                    width={20}
                    height={20}
                    className="w-[22px] h-[22px]"
                  />
                }
                className="!min-w-[30px] !px-0 rounded-md !bg-transparent border-none"
              />

              <div
                className={`${
                  openFilter
                    ? "py-2 h-[100px] !overflow-visible rounded-b-[20px]"
                    : "py-0 h-0"
                } overflow-hidden px-3 grid grid-cols-2 gap-5 text-sm bg-[#0F0F0F] absolute top-11 z-10 left-0 w-full transition-all duration-300`}
              >
                {renderCollapse()}
              </div>
            </>
          )}

          {(backButton.show || windowWidth <= 640) && (
            <Button
              onPress={handleBackPress}
              isIconOnly
              startContent={
                <Image
                  src="/images/svg/BackSvg.svg"
                  alt="back"
                  width={20}
                  height={20}
                />
              }
              className="!min-w-[40px] px-0 !bg-transparent border-none"
            />
          )}
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[8px] mb-[18px]"
      />
    </>
  );
};

export { TitledHeader };
