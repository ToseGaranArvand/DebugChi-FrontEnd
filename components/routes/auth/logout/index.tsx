"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Logout() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const logoutHandler = () => {
    setIsloading(true);
    Cookies.remove("token");
    localStorage.removeItem("user_data");

    setTimeout(() => {
      onClose();
      window.location.href = "/";
    }, 2000);
  };

  return (
    <>
      <Tooltip
        classNames={{
          content: "!text-[12px]",
        }}
        placement="top"
        content={"خروج"}
      >
        <Button
          className="pl-1 w-[50px] h-[50px]"
          size="lg"
          variant="light"
          radius="full"
          isIconOnly
          startContent={<LogOut color="red" size={24} />}
          onPress={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        dir="rtl"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                خروج از حساب کاربری
              </ModalHeader>
              <ModalBody>
                <p>از حساب کاربری خود خارج میشوید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isLoading ? true : false}
                >
                  منصرف شدم
                </Button>
                <Button
                  color="primary"
                  onPress={logoutHandler}
                  isLoading={isLoading ? true : false}
                  isDisabled={isLoading ? true : false}
                >
                  بله خارج میشوم
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
