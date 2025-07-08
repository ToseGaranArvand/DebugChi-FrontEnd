import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { findPriceByValue, UserRequestMode } from "./data";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { updateRequest } from "@/redux/slices/consultSlice";
type Props = {};

const RequestMode = (props: Props) => {
  const dispatch = useAppDispatch();
  const { request } = useAppSelector((state) => state.consult);
  return (
    <Tabs
      defaultValue="chat"
      onValueChange={(value) =>
        dispatch(updateRequest({ mode: value, price: findPriceByValue(value) }))
      }
    >
      <TabsList className="w-full" defaultValue={UserRequestMode[0].label}>
        {UserRequestMode.map((item, index) => {
          return (
            <TabsTrigger
              value={item.value}
              className="w-full flex gap-4"
              key={index}
            >
              <span>{item.label}</span>
              <item.icon size={18} />
            </TabsTrigger>
          );
        })}
      </TabsList>
      {UserRequestMode.map((item, index) => {
        return (
          <TabsContent
            value={item.value}
            className={`${
              item.value === request.mode ? "flex" : "hidden"
            } w-full p-5 box-border justify-center items-center`}
            key={index}
          >
            {item.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default RequestMode;
