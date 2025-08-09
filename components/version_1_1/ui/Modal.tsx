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
  bodyClassName?: string;
  modalHeader?: React.ReactNode;
  children?: React.ReactNode;
  modalFooter?: React.ReactNode;
  hideCloseButton?: boolean;
  hideOpenButton?: boolean;
  isDismissable?: boolean;
  style?: React.CSSProperties;
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
  isDismissable = true,
  hideOpenButton = false,
  bodyClassName,
  style,
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
        style={style}
        isOpen={isOpen}
        classNames={{
          body: `!p-0 !w-fit !min-w-[200px] ${bodyClassName}`,
          wrapper:
            "[&>section]:!w-fit [&>section]:!min-w-[200px] [&>section]:!overflow-visible",
        }}
        onOpenChange={onOpenChange}
        hideCloseButton={hideCloseButton}
        isDismissable={isDismissable}
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
