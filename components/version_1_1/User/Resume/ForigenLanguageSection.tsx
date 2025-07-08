import { UserForiegnLanguage } from "@/components/types/user.types";
import { perform_delete, perform_post } from "@/lib/api";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import { data } from "motion/react-client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  data: UserForiegnLanguage[];
  user_id: number;
};

const ForeignLanguageSection = ({ data, user_id }: Props) => {
  const [_data, setData] = useState<UserForiegnLanguage[]>([]);
   const currentPath = usePathname();
  const addNewLanguage = (language: UserForiegnLanguage) => {
    setData((prev) => [...prev, language]);
  };

   const deleteLanguage = (language_id: number) => {
  setData((prev) =>
    prev.filter(
      (item) =>
        item.id !== language_id // فرض بر این که هر زبان یک `id` یکتا دارد
    )
  );
};

  useEffect(() => {
    setData(data);
  }, []);

  return (
    <div className="w-full  flex flex-col  rounded-3xl p-8 relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-5 h-5 rounded-full bg-white"></div>
        <h3 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
          زبان هایی که بلدم
        </h3>
      </div>
      {
        !currentPath.startsWith("/engineers/") && <AddNewLanguage user_id={user_id} setData={addNewLanguage} />
      }

      <div className="flex flex-wrap justify-center gap-8">
        {_data && _data.length == 0 && (
          <div className="w-full h-20 flex items-center justify-center">
            زبانی وارد نشده
          </div>
        )}
        {_data && _data.map((language, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {
              !currentPath.startsWith("/engineers/") &&
            <DeleteLanguage language_id={language.id} deleteData={deleteLanguage}/>
            }
            <div className="relative w-24 h-24 mb-2">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#333"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeDasharray={`${
                    (2 * Math.PI * 40 * language.rate) / 100
                  } ${2 * Math.PI * 40 * (1 - language.rate / 100)}`}
                  strokeDashoffset={2 * Math.PI * 40 * 0.25}
                  transform="rotate(-90 50 50)"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  {language.name}
                </span>
              </div>
            </div>
            <div className="text-violet-500  text-xl font-bold">
              {language.rate}%
            </div>
            <div className="text-gray-400  text-sm">{language.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForeignLanguageSection;

const AddNewLanguage = ({
  user_id,
  setData,
}: {
  user_id: number;
  setData: (data: UserForiegnLanguage) => void;
}) => {
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
    const [isLoading,setLoading] = useState<boolean>(false)

  const [selectedItems, setSelected] = useState({
    name: "",
    rate: 0,
  });

  const languages = [
    { key: "EN", label: "English" },
    { key: "FA", label: "Farsi" },
    { key: "DE", label: "German" },
    { key: "FR", label: "French" },
    { key: "ES", label: "Spanish" },
    { key: "IT", label: "Italian" },
    { key: "PT", label: "Portuguese" },
    { key: "RU", label: "Russian" },
    { key: "AR", label: "Arabic" },
    { key: "ZH", label: "Chinese" },
    { key: "JA", label: "Japanese" },
    { key: "KO", label: "Korean" },
    { key: "HI", label: "Hindi" },
  ];
  const level = [
    { key: 10, label: 10 },
    { key: 20, label: 20 },
    { key: 30, label: 30 },
    { key: 40, label: 40 },
    { key: 50, label: 50 },
    { key: 60, label: 60 },
    { key: 70, label: 70 },
    { key: 80, label: 80 },
    { key: 90, label: 90 },
    { key: 100, label: 100 },
  ];

  const submitHandler = async () => {
    setLoading(true)
    const response = await perform_post("api/v1/foriegn_language/", {
      ...selectedItems,
      user: user_id,
    });
    if(response.status == 400){
      addToast({
        title:"خطا ارسال اطلاعات",
        description:"دوباره اقدام کنید",
        color:"danger",
        timeout:5000
      })
    setLoading(false)

    }else{
         addToast({
        title:"ارسال اطلاعت",
        description:"زبان جدید اضافه شد",
        color:"success",
        timeout:5000
      })
      console.log(data)
      setData(response)
      onClose()
      setLoading(false)
    }
  };

  return (
    <>
      <Button
        className="absolute left-2 top-2"
        color="secondary"
        variant="flat"
        onPress={onOpen}
      >
        <span>زبان جدید</span>
        <Plus size={14} />
      </Button>
      <Modal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        dir="rtl"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>اضافه کردن زبان جدید</ModalHeader>
          <ModalBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                className="max-w-xs"
                label="انتخاب زبان"
                placeholder="یک زبان انتخاب کنید"
              >
                {languages.map((item) => (
                  <SelectItem
                    key={item.key}
                    onPress={() => {
                      setSelected({
                        ...selectedItems,
                        name: item.key,
                      });
                    }}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="max-w-xs"
                label="سطح زبان"
                placeholder="درصد تسلط"
              >
                {level.map((item) => (
                  <SelectItem
                    key={item.key}
                    onPress={() => {
                      setSelected({
                        ...selectedItems,
                        rate: item.key,
                      });
                    }}
                  >
                    {item.label.toString()}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-2">
              <Button fullWidth color="success" onPress={submitHandler} isDisabled={isLoading} isLoading={isLoading}>
                ثبت
              </Button>
              <Button fullWidth color="danger" onPress={onClose}>
                بستن
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};



const DeleteLanguage = ({
  language_id,
  deleteData,
}: {
  language_id: number;
  deleteData: (id: number) => void;
}) => {
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
    const [isLoading,setLoading] = useState<boolean>(false)


  

  const submitHandler = async () => {
    setLoading(true)
    const response = await perform_delete("api/v1/foriegn_language/"+language_id+"/");
    if(response?.status == 400){
      addToast({
        title:"خطا ارسال اطلاعات",
        description:"دوباره اقدام کنید",
        color:"danger",
        timeout:5000
      })
    setLoading(false)

    }else{
         addToast({
        title:"حذف زبان",
        description:response?.message,
        color:"success",
        timeout:5000
      })
      console.log(data)
      deleteData(language_id)
      onClose()
      setLoading(false)
    }
  };

  return (
    <>
      <Button
        className="absolute left-2 top-2 z-50"
        color="secondary"
        size="sm"
        onPress={onOpen}
        isIconOnly
        radius="full"
        startContent={
          <Trash2 size={14} />
        }
      >
      </Button>
      <Modal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        dir="rtl"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>اضافه کردن زبان جدید</ModalHeader>
          <ModalBody>
            <p>از حذف زبان اطمینان دارید؟</p>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-2">
              <Button fullWidth color="success" onPress={submitHandler} isDisabled={isLoading} isLoading={isLoading}>
                بله
              </Button>
              <Button fullWidth color="danger" onPress={onClose}>
                بستن
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};