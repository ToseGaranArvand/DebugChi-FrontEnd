import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { useBidFilter } from "@/context/BidFilterContext";

interface NormalDrawerProps {
  className?: string;
  BtnClassName?: string;
  width:
    | "sm"
    | "md"
    | "lg"
    | "xs"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  children: React.ReactNode;
  icon?: React.ReactNode;
  placement: "bottom" | "left" | "right" | "top";
  closable?: boolean;
  haveBtn?: boolean;
  hideCloseButton?: boolean;
  style?: React.CSSProperties;
}

const NormalDrawer: React.FC<NormalDrawerProps> = ({
  className,
  BtnClassName,
  width,
  children,
  icon,
  placement,
  hideCloseButton = false,
  style,
  haveBtn = true,
}) => {
  const { openDrawer, setOpenDrawer } = useBidFilter();

  const onOpenChange = (open: boolean) => setOpenDrawer(open);

  return (
    <>
      {haveBtn && (
        <button
          className={`fixed bg-[#0039C6] w-[75px] h-[32px] z-50 top-1/2 -translate-y-1/2 rounded-none ${BtnClassName}`}
          onClick={() => setOpenDrawer(true)}
        >
          {icon ?? "+"}
        </button>
      )}

      <Drawer
        classNames={{ base: className }}
        isOpen={openDrawer}
        placement={placement}
        size={width}
        onOpenChange={onOpenChange}
        style={style}
        backdrop="opaque"
        hideCloseButton={hideCloseButton}
      >
        <DrawerContent>
          <DrawerBody className="!p-0">{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { NormalDrawer };
