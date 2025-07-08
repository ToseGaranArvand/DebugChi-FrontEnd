"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Badge,
  Button,
  Chip,
} from "@heroui/react";
import { Main } from "@/components/types/all-debugers";
import React from "react";
import { Star } from "lucide-react";
import { useFilter } from "@/context/AllDebugersContext";
import Link from "next/link";

type Props = {
  users: Main[];
};

const EngineersList = ({ users }: Props) => {
  const { filteredUsers } = useFilter();
  return (
    <div className="w-full h-full box-border p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
      {filteredUsers &&
        filteredUsers.map((user) => (
          <Card key={user.id} className="w-full max-h-[450px]">
            <CardHeader className="flex gap-3">
              <Image
                alt={`${user.first_name} ${user.last_name}`}
                height={40}
                radius="sm"
                src={
                  user.image_profile ||
                  "/user.jpg"
                }
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-small text-default-500">@{user.username}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="space-y-3">
                {user.debugger_bio && (
                  <p className="text-small text-right my-4">
                    {user.debugger_bio}
                  </p>
                )}
                  {user.user_expertise.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.user_expertise.map((exp, index) => {
                        return exp.expertise?.map((item) => {
                          return (
                            <Chip
                              key={item.id}
                              variant="flat"
                              color="warning"
                              size="sm"
                            >
                              {item.title}
                            </Chip>
                          );
                        });
                      })}
                    </div>
                  </div>
                )}
               
                <Divider />

               {user.user_language.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.user_language.map((lang, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Chip
                            radius="sm"
                            variant="flat"
                            startContent={
                              <Image
                                alt={lang.language_name.name}
                                height={20}
                                src={
                                  lang.language_name.image
                                }
                                width={20}
                              />
                            }
                          >
                            {lang.language_name.name} (
                            {lang.language_name.level})
                          </Chip>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="justify-between">
              <div>
                <Chip
                  className="text-default-600"
                  startContent={
                    <Star
                      className="stroke-amber-500 fill-amber-500"
                      size={14}
                    />
                  }
                >
                  {user.user_score}{" "}
                </Chip>
              </div>
              <Button
                as={Link}
                variant="shadow"
                color="primary"
                href={`/engineers/${user.uuid}`}
              >
                مشاهده پروفایل
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default EngineersList;
