import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React from "react";

type Props = {
  tender_uuid:string;
};

const TednerCancelation = ({tender_uuid}: Props) => {
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} variant="solid" color="danger" size="sm">
        انصراف
      </Button>
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>آیا از حذف کلاس خود مطمئنید؟</ModalHeader>
          <ModalBody className="p-4 box-border">
            <div className="bg-default-100 rounded-3xl">

            <p>لغو کلاس به معنی بستن کامل و بازگشت پول به تمام شرکت کننده ها هست.</p>
            <span>آیا از حذف مطمئنید؟</span>
            </div>
          </ModalBody>
          <ModalFooter className="flex gap-2">
            <Button fullWidth variant="solid" color="danger">
              لغو مزاید
            </Button>
            <Button fullWidth onPress={onClose}>نه ادامه میدم</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TednerCancelation;
