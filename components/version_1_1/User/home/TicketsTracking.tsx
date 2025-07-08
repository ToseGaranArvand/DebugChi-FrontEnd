import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { useEffect } from "react";






export default function TicketsTracking({phone}:{phone:string}) {


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
     

  useEffect(() => {
    console.log("first")
    const fetchTickets = async (phone:string)=>{
      const response = await fetch(`/api/support?phone=${phone}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()

      console.log(data)
    }
    fetchTickets(phone)
  }, [])
  
  return (
    <>
      <Button
        className="absolute left-2 bottom-2"
        variant="solid"
        color="success"
        onPress={onOpen}
      >
        پیگیری تیکت
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" dir="rtl">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                لیست تیکت های من
              </DrawerHeader>
              <DrawerBody>
                <div className="w-full h-full flex">
                  <div className="flex flex-col w-80 bg-default-100 rounded-r-2xl  h-full"></div>
                  <div className="flex-1 flex flex-col bg-default-100 h-full rounded-l-2xl"></div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
