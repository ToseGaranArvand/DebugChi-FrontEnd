import { Bid } from "@/components/types/RequestListForBid";
import { formatCurrency } from "@/utils/tools";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  User,
} from "@heroui/react";
import { CheckCircle, X } from "lucide-react";
import React from "react";

type Props = {};

const TenderBidsList = ({ title, bids }: { title: string; bids: Bid[] }) => {
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  return (
    <>
      <Button variant="flat" color="default" size="sm" onPress={onOpen}>
        شرکت کننده ها
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        placement="left"
        dir="rtl"
        hideCloseButton
      >
        <DrawerContent>
          <DrawerHeader>
            <div className="flex-1 flex items-center">
              <span>{title}</span>
            </div>
            <Button variant="solid" color="danger" onPress={onClose}>
              بستن
            </Button>
          </DrawerHeader>
          <DrawerBody>
            {bids.map((bid) => {
              return (
                <div
                  className="w-full rounded-xl bg-default-100 h-auto flex items-center gap-2 my-2 p-2 box-border"
                  key={bid.id}
                >
                  <div className="flex-1 flex gap-2 items-center">
                    <User
                      name={bid.user.first_name + " " + bid.user.last_name}
                      avatarProps={{
                        src: bid.user.image_profile || "/user.jpg",
                      }}
                    />
                    <span className="text-tiny">
                      {formatCurrency(Number(bid.amount), false)}
                    </span>
                  </div>
                  <Button
                    variant="solid"
                    color="success"
                    size="lg"
                    startContent={<CheckCircle size={14} />}
                  >
                    تایید
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    size="lg"
                    startContent={<X size={14} />}
                  >
                    رد درخواست
                  </Button>
                </div>
              );
            })}
            {bids.length == 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <span>کاربری شرکت نکرده</span>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TenderBidsList;
