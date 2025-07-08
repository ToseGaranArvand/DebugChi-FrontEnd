import { Main } from "@/components/types/debug-request";
import { useRequestFilter } from "@/context/RequetsFilterProvider";
import { perform_get, perform_post } from "@/lib/api";
import {
  Accordion,
  AccordionItem,
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

type Props = {};

const RequetsList = (props: Props) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { filter } = useRequestFilter();
  const [refresh,setRefresh] = useState<boolean>(false)
  const [data, setData] = useState<Main>({
    consult: [],
    debug: [],
  });

  useEffect(() => {
    setIsloading(true);
    const getRequest = async () => {
      const response = await perform_get("api/v1/get-request/");
      if (response.status === 400) {
        console.log("Error fetching requests");
      } else {
        setData(response);
      }
      setIsloading(false);
      setRefresh(false)
    };
    getRequest();
    
  }, [refresh]);

  // Deep search utility
  const deepSearch = (obj: any, keyword: string): boolean => {
    const lowerKeyword = keyword.toLowerCase();
    if (typeof obj === "string") {
      return obj.toLowerCase().includes(lowerKeyword);
    }
    if (Array.isArray(obj)) {
      return obj.some((item) => deepSearch(item, keyword));
    }
    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some((value) => deepSearch(value, keyword));
    }
    return false;
  };

  // Combine and filter data
  const filteredItems = useMemo(() => {
    const all = [
      ...data.consult.map((item) => ({ ...item, __type: "consult" })),
      ...data.debug.map((item) => ({ ...item, __type: "debug" })),
    ];
    if (!filter) return all;
    return all.filter((item) => deepSearch(item, filter));
  }, [data, filter]);

  // Render each item
  const renderItem = (item: any) => {
    const isConsult = item.__type === "consult";
    const applicator = isConsult
      ? item.consult_applicator
      : item.debuger_applicator;
    const label = isConsult ? "مشاوره" : "دیباگ";
    const image_profile =
      applicator.image_profile != null
        ? applicator.image_profile
        : "/user.jpg";
    return (
      <AccordionItem
        key={item.id}
        aria-label={`Accordion ${item.id}`}
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <User
                avatarProps={{
                  src: image_profile,
                }}
                description={item.description.substring(0, 40) + "..."}
                name={applicator.first_name}
              />

              <div className="text-tiny text-gray-500">
                <Chip size="sm">
                  {item.is_realtime === false ? "انلاین" : "زمان بندی شده"}
                </Chip>
              </div>
            </div>
          </div>
        }
      >
        <Card>
          <CardHeader />
          <CardBody>
            <div className="w-full h-full flex flex-col gap-2">
              <div className="text-sm text-gray-500 flex items-center justify-end">
                <Chip color="primary" size="sm" variant="flat">
                  {label}
                </Chip>
              </div>
              <div className="text-sm text-gray-500 flex items-center justify-between">
                <span>
                  {item.start_at
                    ? new Date(item.start_at).toLocaleDateString("fa-IR", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })
                    : "زمانی انتخاب نشده"}
                </span>
                <span>تاریخ</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center justify-between">
                <span>
                  {item.status === "open"
                    ? "فعال"
                    : item.status === "pending"
                    ? "در حال بررسی"
                    : "رد شده"}
                </span>
                <span>وضعیت</span>
              </div>
              {isConsult && (
                <div className="text-sm text-gray-500 flex items-center justify-between">
                  <span>{item.title}</span>
                  <span>عنوان</span>
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex items-center gap-4 w-full">
            <Button
              color="success"
              fullWidth
              isDisabled={item.status == "close"}
              as={Link}
              href={`/chat/${item.session_id}`}
            >
              {item.status == "close" ? "بسته شده" : "بررسی درخواست"}
            </Button>
            <RejectSession session_id={item.session_id} setRefresh={setRefresh}/>
          </CardFooter>
        </Card>
      </AccordionItem>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full flex-1 max-h-[700px] gap-2 overflow-y-auto">
      {filteredItems.length === 0 && (
        <p className="text-center text-foreground-500">موردی یافت نشد</p>
      )}
      <Accordion variant="splitted">
        {filteredItems.map((item) => renderItem(item))}
      </Accordion>
    </div>
  );
};

export default RequetsList;




const RejectSession = ({
  session_id,
  setRefresh,

}:{
  session_id:string,
  setRefresh:(refresh:boolean)=>void
})=>{
  const {onOpen,onOpenChange,onClose,isOpen} = useDisclosure()
  
  const [isLoading,setIsloading] = useState<boolean>(false)

  const rejectHandler = async ()=>{
    setIsloading(true)
    const response = await perform_post('api/v1/reject-session/',{
      action:"reject",
      session_id:session_id,
    }) 
    if (response.success){
      addToast({
        title:"لغو درخواست",
        description:"لغو درخواست با موفقیت انجام شد",
        color:"success",
        variant:"bordered",
        size:"lg",
        timeout:5000
      })
      setRefresh(true)
      setIsloading(false)


    }
    else if (response.status == 400){
      addToast({
        title:"لغو درخواست",
        description:"لغو درخواست با موفقیت انجام شد",
        color:"danger",
        variant:"bordered",
        size:"lg",
        timeout:5000
      })
      setIsloading(false)

    }
  }



  return (
    <>
         <Button
              color="danger"
              variant="bordered"
              fullWidth
              onPress={onOpen}
            >
              رد درخواست
            </Button>

            <Modal onOpenChange={onOpenChange} isOpen={isOpen} dir="rtl">
              <ModalContent>
                <ModalHeader>
                  لغور درخواست
                </ModalHeader>
                <ModalBody>
                  <p>آیا از لغو درخواست مطمئنید؟</p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} variant="solid" color="success">ادامه میدم</Button>
                  <Button onPress={rejectHandler} isDisabled={isLoading} isLoading={isLoading} variant="bordered" color="danger">بله مطمئنم</Button>
                </ModalFooter>

              </ModalContent>
            </Modal>
    </>
  )
}