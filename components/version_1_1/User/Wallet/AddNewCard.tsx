import { useUserContext } from "@/context/userContext";
import { perform_post } from "@/lib/api";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    addToast,
  } from "@heroui/react";
  import { CreditCard } from "lucide-react";
  import { useRef, useState } from "react";
  import Cookies from "js-cookie";
  export default function AddNewCard() {
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [cardValues, setCardValues] = useState(["", "", "", ""]);
    const {setUserData,user} = useUserContext()
    const fullCardNumber = cardValues.join("");
    const isCardComplete = fullCardNumber.length === 16;
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleInputChange = (index: number, value: string) => {
      value = value.replace(/\D/g, "");
      if (value.startsWith("0")) value = value.substring(1);
  
      const newValues = [...cardValues];
      newValues[index] = value;
      setCardValues(newValues);
  
      if (value.length === 4 && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    };




    const AddNewCardHandler = async () => {
        const token = Cookies.get('token')
        setIsLoading(true)
        const { data, success,message } = await perform_post('auths/user_cards/', {
            title:"تجارت",
            card_number: fullCardNumber
        });
        console.log(data)
        if ( success && user) { // بررسی وضعیت و مقدار داشتن user
            const updatedUser = {
                ...user,
                user_bank_cards: [...(user.user_bank_cards || []), data] // اضافه کردن کارت جدید به لیست
            };
            setUserData(updatedUser); // بروزرسانی state
            onClose()
            addToast({
                title: "",
                description:message,
                color: "success"
            })
            setIsLoading(false)
        }
        if (!success){
            setIsLoading(false)
            addToast({
                title: "خطا",
                description:message,
                color: "danger"
              })
        }
    };

  
    return (
      <>
        <Button size="sm" variant="flat"  color="success" onPress={onOpen} startContent={<CreditCard />}>
          کارت جدید
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" hideCloseButton>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1" dir="rtl">
                  کارت جدید
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex flex-col h-[300px] rounded-3xl box-border p-4">
                    <div className="flex-1 flex items-start justify-center">
                      <div className="flex flex-col gap-4 w-full" dir="rtl">
                        <span className="text-foreground-500 text-2xl">عنوان کارت</span>
                        <span className="text-foreground-700 text-sm">نام صاحب کارت</span>
                      </div>
                    </div>
                    <div className="flex justify-center w-full gap-4 h-14">
                      {[0, 1, 2, 3].map((index) => (
                        <Input
                          key={index}
                          ref={(el: any) => (inputRefs.current[index] = el)}
                          dir="ltr"
                          className="text-center"
                          classNames={{
                            input:"text-center"
                          }}
                          maxLength={4}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={cardValues[index]}
                          onInput={(e) => handleInputChange(index, e.currentTarget.value)}
                          onKeyDown={(e) => {
                            if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                              e.preventDefault();
                            }
                            if (e.key === "Backspace" && cardValues[index] === "" && index > 0) {
                              inputRefs.current[index - 1]?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    لغو
                  </Button>
                  <Button color="primary" isLoading={isLoading} onPress={AddNewCardHandler} isDisabled={!isCardComplete}>
                    تایید
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  