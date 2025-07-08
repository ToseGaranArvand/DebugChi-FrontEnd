import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
import { Plus } from "lucide-react";
  
  export default function AddPost() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
          <div className="flex items-center justify-center relative  border-slate-500 h-[500px] cursor-pointer border border-dashed mx-2" onClick={onOpen}>
                  <div className="rounded-full w-14 h-14 border border-dashed border-slate-500 flex items-center justify-center">
                      <Plus className="stroke-slate-500"/>
                  </div>
                </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">AddPost</ModalHeader>
                <ModalBody>
                 
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  