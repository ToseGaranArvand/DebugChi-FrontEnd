"use client";
import { Main } from "@/components/types/classDetails";
import { Main as UserType } from "@/components/types/user.types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
} from "@heroui/react";
import {
  Cable,
  GraduationCap,
  Headset,
  Heart,
  Info,
  Instagram,
  MailOpen,
  MessageCircle,
  MonitorPlay,
  PhoneCall,
  Play,
  Projector,
  Send,
  Ticket,
  User,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SettingTabContent } from "../OnlineAction";
import EventCard from "../../Bid/EventCard";

import { Project } from "@/components/types/tender.type";

export default function ClassDetails({ details }: { details: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [readmore, setReadMore] = useState<number>(50);

  return (
    <>
      <Button
        className="bg-default-200/30"
        onPress={onOpen}
        endContent={<Info size={14} />}
      >
        جزئیات
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        placement="bottom"
        hideCloseButton
      >
        <DrawerContent className="rtl">
          <DrawerHeader className="flex justify-between gap-1 box-border px-4 pb-4">
            <Button color="danger" variant="shadow" onPress={onClose}>
              بستن
            </Button>
            <h2 className="text-xl font-bold text-center">جزئیات کلاس</h2>
          </DrawerHeader>
          <DrawerBody className="overflow-auto max-w-7xl mx-auto scrollbar-hide">
            <div
              className="w-full rounded-xl bg-purple-950/50 p-6 mb-10 flex flex-col md:flex-row items-center gap-6 min-h-96"
              dir="rtl"
            >
              <div className="w-full md:w-1/3 min-h-64 flex justify-center shadow-2xl rounded-2xl ">
                <Image
                  src={
                    details.images && details.images.length > 0
                      ? details.images[0].image
                      : "/user.jpg"
                  }
                  alt={details.class_title}
                  width={400}
                  height={400}
                  className="object-cover  rounded-2xl "
                />
              </div>
              <div className="w-full md:w-2/3 text-white mr-4 flex flex-col h-full relative">
                <div className=" flex items-center h-28">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {details.class_title}
                  </h2>
                </div>
                <div className="flex-1 ">
                  <p className="text-white/80 mb-2">
                    {details.description.substring(0, readmore)}{" "}
                    <Button
                      variant="light"
                      color="default"
                      onPress={() => setReadMore(details.description.length)}
                    >
                      بیشتر بخوانید
                    </Button>
                  </p>
                  <p className="text-white/70 text-sm mb-14">
                    توضیحات بیشتر در مورد این کلاس و ویژگی های آن
                  </p>
                </div>
                <div>
                <EventCard data={details} color={"success"}/>
                </div>
                {/* <Button
                  fullWidth={false}
                  as={Link}
                  href={
                    process.env.server + "/" + details.educational_heading_file
                  }
                  className="max-w-48 bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
                >
                  دیدن سرفصل ها
                </Button> */}
              </div>
            </div>

            {/* Templates Section */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-center mb-8">
                منوی راهنما
              </h2>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                dir="rtl"
              >
                {/* Support Contact */}
                <div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
                  <div className="h-40 flex items-center justify-center bg-gray-950">
                    <div className=" w-24 h-24 rounded-full inset-0 flex items-center justify-center bg-violet-900">
                      <Headset size={48} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2 gap-2">
                      <div className="w-auto p-2 h-auto bg-violet-900 rounded-full flex items-center justify-center gap-2">
                        <Cable />
                      </div>
                      <h3 className="text-sm">ارتباط با پشتیبانی</h3>
                    </div>
                    <SendTicketModal />
                  </div>
                </div>

                {/* Send Ticket */}
                <div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
                  <div className="h-40 flex items-center justify-center bg-gray-950">
                    <div className=" w-24 h-24 rounded-full inset-0 flex flex-col items-center justify-center bg-violet-900">
                      {/* <GraduationCap size={24} strokeWidth={1}/> */}
                      <Users size={48} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2 gap-2 ">
                      <div className="w-auto p-2 h-auto bg-violet-900 rounded-full flex items-center justify-center gap-2">
                        <Ticket />
                      </div>
                      <h3 className="text-sm">لیست دانشجویان</h3>
                    </div>
                    <UsersList users={details.users} />
                  </div>
                </div>

                {/* Correspondence */}
                <div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
                  <div className="h-40 flex items-center justify-center bg-gray-950">
                    <div className=" w-24 h-24 rounded-full inset-0 flex flex-col items-center justify-center bg-violet-900">
                      <MailOpen size={48} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-auto h-auto p-2 bg-violet-800 rounded-full ">
                        <Users fill="white" />
                      </div>
                      <h3 className="text-xs">ارسال نوتیف به دانشجویان</h3>
                    </div>
                    <Button size="sm" color="primary" fullWidth>
                      ارسال
                    </Button>
                  </div>
                </div>

                {/* Class Holding */}
                <div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
                  <div className="h-40  flex items-center justify-center bg-gray-950">
                    <div className=" w-24 h-24 rounded-full inset-0 flex flex-col items-center justify-center bg-violet-900">
                      <Projector />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2 gap-2">
                      <div className="w-auto h-auto p-2 bg-violet-800 rounded-full">
                        <MonitorPlay />
                      </div>
                      <h3 className="text-sm">برگزاری کلاس</h3>
                    </div>
                    <Button size="sm" color="primary" fullWidth>
                      شروع کلاس
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Signature */}
            <div className="text-center text-gray-500 mb-4">
              <p>توسعه داده شده توسط مهدی</p>
            </div>
          </DrawerBody>
          <DrawerFooter className=" pt-4"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const HeadingModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size="sm" fullWidth color="primary">
        مشاهده دانشجویان
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                لیست دانشجویان
              </DrawerHeader>
              <DrawerBody></DrawerBody>
              <DrawerFooter>
                <Button color="danger" onPress={onClose}>
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
const UsersList = ({ users }: { users: UserType[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size="sm" fullWidth color="primary">
        مشاهده دانشجویان
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                لیست دانشجویان
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-2">
                {users.length <= 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {" "}
                    دانشجویی وجود ندارد
                  </div>
                ) : (
                  users.map((user) => {
                    return <div>{user.first_name}</div>;
                  })
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" onPress={onClose}>
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SendTicketModal = () => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  const [description, setDescription] = useState({
    title: "",
    description: "",
  });
  return (
    <>
      <Button size="sm" color="primary" fullWidth onPress={onOpen}>
        تیکت
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        dir="rtl"
        hideCloseButton
        size="5xl"
      >
        <ModalContent>
          <ModalHeader>ارسال تیکت</ModalHeader>
          <ModalBody className="">
            {/* <SettingTabContent /> */}
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <div className="w-auto h-auto p-5 bg-secondary-200 rounded-full">
                <Headset size={90} className="stroke-secondary-900" />
              </div>
              <span className="mb-6">جهت ارتباط با کارشناسان تماس بگیرید</span>
              <Input
                className="max-w-96"
                type="tel"
                value={"+989029457261"}
                variant="faded"
                startContent={
                  <Button
                    startContent={<PhoneCall size={14} />}
                    isIconOnly
                    variant="light"
                  ></Button>
                }
              />
            </div>

            <Input
              isRequired
              isClearable
              placeholder="عنوان مشکل خود را بنویسید..."
              fullWidth
              onValueChange={(value) =>
                setDescription({
                  ...description,
                  title: value,
                })
              }
            />

            <Textarea
              className="relative"
              onValueChange={(value) =>
                setDescription({ ...description, description: value })
              }
              placeholder="توضیحات خود را بنویسید..."
              minRows={4}
              maxRows={6}
              endContent={
                <Button
                  className="absolute left-2 bottom-2"
                  variant="solid"
                  color="success"
                  startContent={<Send />}
                >
                  ارسال
                </Button>
              }
            />
          </ModalBody>
          {/* <ModalFooter>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
