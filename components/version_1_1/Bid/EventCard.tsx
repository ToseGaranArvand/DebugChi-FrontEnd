"use client";

import { Image as ImageDetails, Main } from "@/components/types/classDetails";
import type { Project } from "@/components/types/tender.type";
import Cookies from "js-cookie";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Image,
  Link,
  Tooltip,
  Avatar,
  AvatarGroup,
  addToast,
} from "@heroui/react";
import { Download, Ellipsis, Projector } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CourseDetailContainer } from "./CourseDetailContainer/CourseDetailContainer";
import { perform_get } from "@/lib/api";

export default function EventCard({
  data,
  color,
}: {
  data: any;
  color?: "success";
}) {
  const currentPath = usePathname();
  const is_main = currentPath === "/" ? true : false;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selecetdImage, setSelectedImage] = useState<string>("/user.jpg");

  const handleCopyLink = () => {
    const eventUrl = `${window.location.origin}/events/${data.id}`;

    navigator.clipboard
      .writeText(eventUrl)
      .then(() => {
        addToast({
          title: "لینک کپی شد",
          description: "لینک کلاس با موفقیت کپی شد",
          color: "success",
        });
      })
      .catch((err) => {
        addToast({
          title: "خطا در کپی لینک",
          description: "مشکلی در کپی لینک به وجود آمد",
          color: "danger",
          classNames: {
            base: "z-[9999]",
          },
        });
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <Button
        className="w-[107px] lg:w-full h-[49px] lg:h-[34px] !bg-[#252328] rounded-2xl text-center text-sm"
        onPress={onOpen}
      >
        بررسی سرفصل
      </Button>
      <Drawer
        hideCloseButton
        backdrop="transparent"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <CourseDetailContainer />
              {/* <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-start gap-2">
                  <Button
                    className="font-medium text-small text-default-500"
                    size="sm"
                    startContent={
                      <svg
                        height="16"
                        viewBox="0 0 16 16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.85.75c-.908 0-1.702.328-2.265.933-.558.599-.835 1.41-.835 2.29V7.88c0 .801.23 1.548.697 2.129.472.587 1.15.96 1.951 1.06a.75.75 0 1 0 .185-1.489c-.435-.054-.752-.243-.967-.51-.219-.273-.366-.673-.366-1.19V3.973c0-.568.176-.993.433-1.268.25-.27.632-.455 1.167-.455h4.146c.479 0 .828.146 1.071.359.246.215.43.54.497.979a.75.75 0 0 0 1.483-.23c-.115-.739-.447-1.4-.99-1.877C9.51 1 8.796.75 7.996.75zM7.9 4.828c-.908 0-1.702.326-2.265.93-.558.6-.835 1.41-.835 2.29v3.905c0 .879.275 1.69.833 2.289.563.605 1.357.931 2.267.931h4.144c.91 0 1.705-.326 2.268-.931.558-.599.833-1.41.833-2.289V8.048c0-.879-.275-1.69-.833-2.289-.563-.605-1.357-.931-2.267-.931zm-1.6 3.22c0-.568.176-.992.432-1.266.25-.27.632-.454 1.168-.454h4.145c.54 0 .92.185 1.17.453.255.274.43.698.43 1.267v3.905c0 .569-.175.993-.43 1.267-.25.268-.631.453-1.17.453H7.898c-.54 0-.92-.185-1.17-.453-.255-.274-.43-.698-.43-1.267z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    }
                    variant="flat"
                    onPress={handleCopyLink}
                  >
                    کپی لینک
                  </Button>
                </div>
                <div className="flex gap-1 items-center"></div>
              </DrawerHeader> */}
              {/* <DrawerBody className="pt-16" dir="rtl">
                <div className="flex flex-col gap-2 w-full justify-center items-center pt-4">
                  <Image
                    isBlurred
                    isZoomed
                    alt={data.class_title}
                    className="aspect-square w-full hover:scale-110"
                    height={300}
                    src={`${selecetdImage}`}
                  />
                  <div className="w-full justify-center items-center flex gap-2">
                    {data.images
                      .map((item: ImageDetails) => {
                        return (
                          <Image
                            onClick={() =>
                              setSelectedImage(
                                is_main
                                  ? process.env.server + "/" + item.image
                                  : item.image
                              )
                            }
                            key={item.id}
                            isBlurred
                            isZoomed
                            alt={data.class_title}
                            className="aspect-square w-full hover:scale-110"
                            height={50}
                            src={
                              is_main
                                ? process.env.server + "/" + item.image
                                : item.image
                            }
                          />
                        );
                      })
                      .slice(0, 4)}
                    <Button
                      startContent={<Ellipsis />}
                      variant="light"
                      size="sm"
                      isIconOnly
                    ></Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-4">
                  <h1 className="text-2xl font-bold leading-7">
                    {data.class_title}
                  </h1>
                  <p className="text-sm text-default-500 flex gap-2">
                    <span>برگزاری کلاس در Google Meet</span>
                    <Projector />
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                          {data.start_date
                            ? new Date(
                                data.start_date || ""
                              ).toLocaleDateString("fa-IR", {
                                month: "short",
                              })
                            : "هنوز زمانی تعیین نشده"}
                        </div>
                        <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
                          {data.start_date
                            ? new Date(data.start_date).getDay()
                            : "-"}
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-medium text-foreground font-medium">
                          زمان برگزاری کلاس
                        </p>
                        <p className="text-small text-default-500"></p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                        <Projector />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span>محل برگزاری</span>
                        <p className="text-small text-default-500">
                          گوگل میت Google Meet
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-medium font-medium">
                        درباره کلاس
                      </span>
                      <p className="text-sm leading-relaxed text-default-600 whitespace-pre-line">
                        {data.description}
                      </p>
                      <div className="text-medium text-default-500 flex flex-col gap-2">
                        <p className="text-sm leading-relaxed text-default-600 whitespace-pre-line">
                          {data.educational_heading}
                        </p>
                        <Button
                          size="sm"
                          className="w-2/4 my-2"
                          color="secondary"
                          startContent={<Download size={14} />}
                          variant="faded"
                          as={Link}
                          href={
                            is_main
                              ? `${process.env.server}/${data.educational_heading_file}`
                              : data.educational_heading_file
                          }
                        >
                          دانلود سرفصل
                        </Button>
                        <p className="mt-4">
                          Brought to you by the{" "}
                          <Link
                            className="text-default-700"
                            href="https://heroui.com"
                          >
                            HeroUI team
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-small text-default-500">
                        Hosted By
                      </span>
                      <div className="flex gap-2 items-center">
                        <Avatar
                          name="HeroUI"
                          size="sm"
                          src="https://heroui.com/android-chrome-192x192.png"
                        />
                        <span className="text-small text-default-500">
                          HeroUI Team
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-small text-default-500">
                        105 Going
                      </span>
                      <div className="flex gap-2 items-center">
                        <AvatarGroup
                          isBordered
                          classNames={{
                            base: "pl-2",
                            count: "text-default-500 text-tiny bg-default-100",
                          }}
                          size="sm"
                          total={101}
                        >
                          <Tooltip content="Alex">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Alex"
                              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                            />
                          </Tooltip>
                          <Tooltip content="Joe">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Joe"
                              src="https://i.pravatar.cc/150?u=a04258114e290267084"
                            />
                          </Tooltip>
                          <Tooltip content="John">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="John"
                              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            />
                          </Tooltip>
                          <Tooltip content="Jane">
                            <Avatar
                              className="data-[hover=true]:!translate-x-0"
                              name="Jane"
                              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                            />
                          </Tooltip>
                        </AvatarGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="flex flex-col gap-1">
                <Link
                  className="text-default-400"
                  href="mailto:hello@heroui.com"
                  size="sm"
                >
                  گزارش
                </Link>
              </DrawerFooter> */}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
