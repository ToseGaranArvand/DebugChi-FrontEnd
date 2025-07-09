//base
import { FC, useState } from "react";

//lib
import { Collapse, Typography, Space } from "antd";

//style
import "./ui.css";
import Image from "next/image";

//core
export interface ICustomCollapsePropTypes {
  placeHolder?: string;
  dataItems: { key: string; label: string }[];
  handeler?: (e: { key: string; label: string }) => void;
  defaultValue?: string;
  bg?: string;
  textColor?: string;
  className?: string;
  containerClassName?: string;
  itemsContainerClassName?: string;
}

const CustomCollapse: FC<ICustomCollapsePropTypes> = ({
  placeHolder = "انتخاب کنید",
  dataItems = [],
  handeler,
  defaultValue,
  bg,
  textColor,
  className,
  containerClassName,
  itemsContainerClassName,
}): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<string>(
    defaultValue || placeHolder
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (item: { key: string; label: string }) => {
    setSelectedItem(item.label);
    setIsOpen(false);
    if (handeler) {
      handeler(item);
    }
  };

  return (
    <div className={`relative z-10 w-full ${containerClassName}`}>
      <section
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: bg }}
        className={`cursor-pointer flex rounded-[12px] overflow-hidden ${className}`}
      >
        <Typography.Link className="w-full flex items-center">
          <Space
            style={{ color: textColor }}
            className="m-0 p-0 pr-3 pl-2 w-full flex items-center justify-between sm:gap-5 gap-3 leading-none text-nowrap"
          >
            <span style={{ color: textColor }} className="mb-1">
              {selectedItem}
            </span>
            <Image
              src="/images/svg/DownArrowSvg.svg"
              alt=""
              width={20}
              height={20}
              className={`w-3 h-3 ml-1 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </Space>
        </Typography.Link>
      </section>

      <Collapse
        className={`transition-all ${
          isOpen ? "p-2" : ""
        } ${itemsContainerClassName}`}
        activeKey={isOpen ? ["1"] : []}
        ghost
        items={[
          {
            key: "1",
            label: null,
            children: (
              <div className="flex flex-col gap-1 mt-2 !p-0">
                {dataItems.map((item) => (
                  <div
                    key={item.key}
                    style={{ color: textColor }}
                    onClick={() => handleClick(item)}
                    className="cursor-pointer px-3 py-2 rounded-md hover:bg-[#2c2c2c]"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            ),
            showArrow: false,
            className: "!p-0",
          },
        ]}
      />
    </div>
  );
};

export { CustomCollapse };
