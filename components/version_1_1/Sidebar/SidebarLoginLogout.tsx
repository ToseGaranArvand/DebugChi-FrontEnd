// components/version_1_1/Sidebar/SidebarLoginLogout.tsx
"use client";

import { showLogin } from "@/redux/slices/globalSlice";
import { useAppDispatch } from "@/redux/store/store";
import { Button, Tooltip } from "@heroui/react";
import { LogIn, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

interface SidebarLoginLogoutProps {
  token?: string;
  user?: any;
}

const SidebarLoginLogout = ({ token, user }: SidebarLoginLogoutProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  // اگر کاربر لاگین کرده باشد
  if (user) {
    return (
      <>
        <Tooltip placement="right" content="خروج">
          <Button
            size="lg"
            variant="light"
            radius="full"
            isIconOnly
            startContent={<LogOut size={24} style={{ color: '#FF3838' }} />}
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
                  <p>از حساب کاربری خود خارج می‌شوید؟</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    isDisabled={isLoading}
                  >
                    منصرف شدم
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      setIsLoading(true);
                      Cookies.remove("token");
                      localStorage.removeItem("user_data");
                      setTimeout(() => {
                        onClose();
                        window.location.href = "/";
                      }, 1000);
                    }}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  >
                    بله خارج می‌شوم
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Tooltip placement="right" content="ورود">
      <Button
        size="lg"
        variant="light"
        radius="full"
        isIconOnly
        startContent={<LogIn size={24} style={{ color: '#FF3838' }} />}
        onPress={() => dispatch(showLogin({ show: true, path: pathname }))}
      />
    </Tooltip>
  );
};

export default SidebarLoginLogout;