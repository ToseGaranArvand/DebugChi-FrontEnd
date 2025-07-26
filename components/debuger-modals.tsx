"use client";

import {
  Button,
  Card,
  CardBody,
  cn,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  Tab,
  Tabs,
} from "@heroui/react";
import { Headset, PhoneCall, Settings, Star, X } from "lucide-react";
import Cookies from "js-cookie";

export const ModalSettings = ({
  setShow,
  show,
  isOpen,
  onOpen,
  onOpenChange,
}: {
  setShow: (show: boolean) => void;
  show: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      hideCloseButton
      backdrop="blur"
      dir="rtl"
      classNames={{
        wrapper: "z-[10000]",
        backdrop: "z-[10000]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Settings size={20} />
                <span className="font-lightSans !font-normal">تنظیمات</span>
              </div>
              <Button
                isIconOnly
                startContent={<X size={14} />}
                color="danger"
                variant="light"
                onPress={() => {
                  setShow(!show);
                  onClose();
                }}
              ></Button>
            </ModalHeader>
            <ModalBody className="min-h-[500px] flex flex-col gap-4">
              <SettingTabContent />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const ModalTask = ({
  setShow,
  show,
  isOpen,
  onOpen,
  onOpenChange,
  onFilterChange,
}: {
  setShow: (show: boolean) => void;
  show: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onFilterChange: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      backdrop="blur"
      dir="rtl"
      classNames={{
        wrapper: "z-[10000]",
        backdrop: "z-[10000]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Star size={20} />
                <span className="font-lightSans !font-normal">تسک منتخب</span>
              </div>
              <Button
                isIconOnly
                startContent={<X size={14} />}
                color="danger"
                variant="light"
                onPress={() => {
                  setShow(!show);
                  onClose();
                }}
              ></Button>
            </ModalHeader>
            <ModalBody className="min-h-[500px] flex flex-col gap-4">
              <TaskSettingsContent onFilterChange={onFilterChange} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const SettingTabContent = () => {
  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options" variant="underlined">
        <Tab key="contact_us" title={"ارتباط با ما"}>
          <div className="w-full min-h-[400px] flex items-center justify-center flex-col gap-4">
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
        </Tab>

        <Tab key="about" title={"درباره ما"}>
          <Card>
            <CardBody className="flex flex-col gap-4">
              <p className="text-medium max-w-2xl mx-auto text-gray-500 font-mediumSans text-wrap text-right">
                درباره ما ما یک تیم نرم‌افزاری هستیم که با هدف ساده‌سازی یادگیری و
                رفع مشکلات برنامه‌نویسی، پلتفرم «دیباگچی» را توسعه داده‌ایم.
                <br />
                <br />
                دیباگچی با بهره‌گیری از هوش مصنوعی، کاربران را در سریع‌ترین زمان
                ممکن به متخصصان واقعی در زمینه‌های مختلف از جمله دیباگ، مشاوره،
                و کلاس‌های خصوصی یا عمومی متصل می‌کند.
                <br />
                <br />
                هدف ما اینه که مسیر یادگیری و حل مسئله برای علاقه‌مندان و
                برنامه‌نویسان، ساده، سریع و موثر باشه.
              </p>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export const TaskSettingsContent = ({
  onFilterChange,
}: {
  onFilterChange: () => void;
}) => {
  const changeStatus = (
    type: "debug" | "private_class" | "moshavere",
    status: boolean
  ) => {
    Cookies.set(type, String(status));
    onFilterChange();
  };

  return (
    <div className="w-full h-full flex flex-col gap-4" dir="rtl">
      <Switch
        defaultSelected={Cookies.get("debug") == "true"}
        onValueChange={(value) => {
          changeStatus("debug", value);
        }}
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            "group-data-[selected=true]:ms-6",
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ms-4"
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">دیباگ</p>
          <p className="text-tiny text-default-400">
            دریافت پیام دیباگ کردن درخواست ها و تسک ها
          </p>
        </div>
      </Switch>
      <Switch
        defaultSelected={Cookies.get("moshavere") == "true"}
        onValueChange={(value) => {
          changeStatus("moshavere", value);
        }}
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            "group-data-[selected=true]:ms-6",
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ms-4"
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">مشاوره</p>
          <p className="text-tiny text-default-400">
            دریافت پیام مشاوره در زمینه درخواست ها و تسک ها
          </p>
        </div>
      </Switch>
      <Switch
        defaultSelected={Cookies.get("private_class") == "true"}
        onValueChange={(value) => {
          changeStatus("private_class", value);
        }}
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            "group-data-[selected=true]:ms-6",
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ms-4"
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">کلاس خصوصی</p>
          <p className="text-tiny text-default-400">
            دریافت پیام کلاس خصوصی در زمینه درخواست ها و تسک ها
          </p>
        </div>
      </Switch>
    </div>
  );
};