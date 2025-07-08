import { perform_delete } from "@/lib/api";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

type Props = {
  title: string;
  description: string;
  url: string;
};

const DeleteModal = ({ title, description, url }: Props) => {
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const deleteHandler = async () => {
    setLoading(true);
    const response = await perform_delete(url);
    console.log(response)
    if (response?.success) {
      onClose();
      addToast({
        title: "حذف کارت",
        description: response.message,
        color: "success",
      });
      setLoading(false);
    } else {
      setLoading(false);
      addToast({
        title: "حذف کارت",
        description: "دوباره اقدام کنید خطا در انجام عمیات",
        color: "danger",
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        radius="lg"
        variant="solid"
        color="danger"
        startContent={<Trash2 size={14} />}
        isIconOnly
      ></Button>

      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{description}</ModalBody>
          <ModalFooter>
            <div className="flex gap-2">
              <Button fullWidth color="danger" onPress={deleteHandler} isLoading={isLoading} isDisabled={isLoading}>
                حذف
              </Button>
              <Button color="default" fullWidth onPress={onClose}>
                بستن
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
