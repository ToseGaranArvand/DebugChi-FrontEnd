// base
import React, { FC, useState } from "react";
// components

// core
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  TooltipPlacement,
} from "@heroui/react";

const CustomPopover: FC<{
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  PopoverContentClassName?: string;
}> = ({ children, content, placement, PopoverContentClassName }) => {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className={`!p-0 shadow-none ${PopoverContentClassName}`}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export { CustomPopover };
