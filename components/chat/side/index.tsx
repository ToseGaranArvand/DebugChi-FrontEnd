"use client";
import React, { useEffect, useState } from "react";
import SelectOption from "./SelectOption";
import { perform_get } from "@/lib/api";
import { Button } from "@heroui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

type Props = {};

interface Main {
  id: number;
  name: string;
  image: string;
}

const ChatSidebar = (props: Props) => {

  const [language, setLanguage] = useState<Main[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const getLanguageList = async () => {
      const response = await perform_get("api/v1/programming-list/");
      if (response) {
        setLanguage(response);
      }
    };
    getLanguageList();
  }, []);

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full flex flex-col justify-start py-2 box-border h-full overflow-hidden">
      <SelectOption />
      <ScrollArea aria-label="scroll-area">
        <div className="w-full flex flex-col items-center flex-1 py-4 box-border gap-2">
          {
          language.length > 0 && language.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <Button
                key={item.id}
                aria-label={item.name}
                onPress={() => handleSelect(item.id)}
                className={`${isSelected ? 'w-full' : 'w-full'} h-14 transition-all duration-500 ease-in-out`}
                variant={isSelected ? "flat" : "light"}
                color={isSelected ? "primary" : "default"}
                radius="none"
                isIconOnly
                startContent={
                  <Image
                    alt={item.name}
                    src={item.image}
                    className="rounded-full"
                    height={25}
                    width={25}
                  />
                }
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
