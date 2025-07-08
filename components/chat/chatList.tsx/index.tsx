"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { Check, CheckCircle, CheckCircle2, ListFilter, Menu } from "lucide-react";
import React, { useState } from "react";
import CardChat from "./Card";

type Props = {
  
};
const filterButton = ["مشاوره", "دیباگ", "مدرس ها"];
const ChatList = (props: Props) => {
  const [selected, setSelected] = useState("مشاوره");

  return (
    <div className="w-full flex flex-col items-center justify-start gap-3 h-full  px-2 box-border">
      <div className="flex h-auto gap-2">
        {filterButton.map((item, index) => {
          return (
            <Button
              radius="full"
              key={index}
              color="primary"
              variant={selected == item ? "solid" : "flat"}
              startContent={selected == item ? <Check size={14} /> : null}
              onPress={() => setSelected(item)}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <div className=" w-full grid grid-cols-5 gap-2">
        <Input placeholder="جستجو کنید..."  className="col-span-4"/>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" isIconOnly startContent={<ListFilter />} className="w-full"></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Example with disabled actions">
            <DropdownItem key="new">Senior</DropdownItem>
            <DropdownItem key="copy">Mid Level</DropdownItem>
            <DropdownItem key="edit">Junior </DropdownItem>

          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex-1 w-full">
          <CardChat />
      </div>

       

    </div>
  );
};

export default ChatList;
