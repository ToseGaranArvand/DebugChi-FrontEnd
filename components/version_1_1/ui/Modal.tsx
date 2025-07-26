import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import React, { FC } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
  btnText?: string;
  btnClassName?: string;
  modalHeaderClassname?: string;
  modalHeader?: React.ReactNode;
  children?: React.ReactNode;
  modalFooter?: React.ReactNode;
  hideCloseButton?: boolean;
  hideOpenButton?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onOpenChange,
  onOpen,
  btnText,
  btnClassName,
  modalHeaderClassname,
  modalHeader,
  children,
  modalFooter,
  hideCloseButton = true,
  hideOpenButton = false,
}) => {
  return (
    <>
      {!hideOpenButton && (
        <Button className={btnClassName} onPress={onOpen}>
          {btnText}
        </Button>
      )}

      <Modal
        className="shadow-none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={hideCloseButton}
      >
        <ModalContent className="!bg-transparent !border-none">
          {(onClose) => (
            <>
              {modalHeader && (
                <ModalHeader
                  className={`flex flex-col gap-1 ${modalHeaderClassname}`}
                >
                  {modalHeader}
                </ModalHeader>
              )}
              <ModalBody>{children}</ModalBody>
              {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { CustomModal };
