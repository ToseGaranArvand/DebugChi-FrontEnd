import { Main } from "@/components/types/user.types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Tab,
  Tabs,
  Chip,
  Tooltip,
  Avatar,
} from "@heroui/react";
import { LogOut, Music, PictureInPicture, Video } from "lucide-react";
import Image from "next/image";
import Login from "../Login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
type Props = {
  user: Main;
};

export default function ModalInfo({ user }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <Tooltip
        placement="right"
        content={user.first_name + " " + user.last_name}
      >
        <Button
          size="lg"
          variant="light"
          radius="full"
          isIconOnly
          onPress={onOpen}
        >
          <Avatar
            src={`${process.env.server}/${user.image_profile}`}
            name={"user.first_name"}
            fallback={user.first_name}
          />
        </Button>
      </Tooltip>
      <Drawer
        hideCloseButton
        className="w-[90%]"
        size="full"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              dur: 0.3,
            },
            exit: {
              x: 100,
              opacity: 0,
              dur: 0.3,
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              {/* <DrawerHeader className="flex flex-col gap-1"></DrawerHeader> */}
              <DrawerBody className="flex flex-col">
                <div className="w-full h-64 relative ">
                  <div className="flex bg-slate-800 w-full h-52 rounded-[60px]">
                    <Image
                      src="/banner.jpg"
                      alt="avatar"
                      fill
                      objectFit="cover"
                      className="rounded-[60px]"
                    />
                  </div>
                  <div className="flex flex-row-reverse items-end gap-4  absolute right-24 -bottom-36  min-w-40 h-auto p-4 box-border">
                    <Image
                      src={`${process.env.server}/${user.image_profile}`}
                      alt="avatar"
                      width={200}
                      height={200}
                      className="rounded-full aspect-square border-8 border-[#18181a]"
                    />
                    <div className="flex-1 flex flex-col justify-center items-end gap-4">
                      <h3 className="text-xl font-blackSans">
                        {user.username + " " + user.first_name}
                      </h3>
                      <div className="w-2/4" dir="rtl">
                        <p className="text-foreground-500">
                          🚀 برنامه‌نویس و حل‌کننده مشکلات کدنویسی، متخصص در
                          Next.js، Django و توسعه وب، آماده رفع باگ، بهینه‌سازی
                          و مشاوره فنی!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" ml-10 w-1/4 h-40 gap-4  grid grid-cols-2">
                  <Button variant="flat" color="secondary">
                    درخواست
                  </Button>
                  <Button variant="bordered" color="warning">
                    درخواست
                  </Button>
                </div>

                <div className="min-h-96 max-w-7xl flex flex-col ">
                  <Tabs
                    aria-label="Options"
                    classNames={{
                      tabList:
                        "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                      //   cursor: "w-full bg-[#22d3ee]",
                      tab: "max-w-fit px-0 h-12",
                      //   tabContent: "group-data-[selected=true]",
                    }}
                    color="success"
                    variant="underlined"
                  >
                    <Tab
                      key="photos"
                      title={
                        <div className="flex items-center space-x-2">
                          <PictureInPicture />
                          <span>Photos</span>
                        </div>
                      }
                    ></Tab>
                    <Tab
                      key="music"
                      title={
                        <div className="flex items-center space-x-2">
                          <Music />
                          <span>Music</span>
                        </div>
                      }
                    />
                    <Tab
                      key="videos"
                      title={
                        <div className="flex items-center space-x-2">
                          <Video />
                          <span>Videos</span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <div className="flex-1 flex items-center justify-start">
                  <Button
                  variant="solid"
                  color="danger"
                  startContent={<LogOut />}
                    onPress={() => {
                      localStorage.removeItem("user_data");
                      Cookies.remove("token");
                      window.location.href = "/"
                    }}
                  >
                    خروج
                  </Button>
                </div>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
