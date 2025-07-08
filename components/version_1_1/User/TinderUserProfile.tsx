"use client";
import TopChat from "@/components/chat/header";
import Action from "@/components/chat/header/action";
import SubmitRequest from "@/components/Tools/Actions/submit-request";
import ProgrammerRate from "@/components/Tools/ProgrammerRate";
import { CreatedBy } from "@/components/types/tender.type";
import { Main } from "@/components/types/user.types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { Avatar, Badge, Chip } from "@heroui/react";
import React from "react";

type Props = {
  user: CreatedBy;
};

const skills = ["python", "typescript", "javascript", "REST API", "NGINX"];

const TinderUserProfile = ({ user }: Props) => {
  return (
    <div className="h-full w-full box-border p-2">
      <ProgrammerRate level="Mid" />
      <div className="min-h-[400px]  flex flex-col gap-4 items-center justify-center">
        <Badge
          color="success"
          content=""
          placement="bottom-right"
          shape="circle"
        >
          <Avatar
            radius="full"
            className="w-40 h-40 text-2xl"
            src={`${process.env.server}/${user.image_profile}`}
          />
        </Badge>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-xl ">
            {user.first_name} {user.last_name}
          </h2>
        </div>

        <div className="w-full flex flex-wrap justify-start flex-row-reverse gap-2 border-b border-slate-800 py-2 box-border">
          {user.user_language.map((item, index) => {
            return (
              <Chip key={index} color="default" variant="flat" size="sm">
                {item.language_name.name}
              </Chip>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center flex-1">
        {/* <Action /> */}
      </div>

      {/* <SubmitRequest /> */}
    </div>
  );
};

export default TinderUserProfile;
