import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tab,
  Tabs,
  User,
  Accordion,
  addToast,
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
} from "@heroui/react";
import { Search } from "lucide-react";
import {
  ConsultElement,
  Debug,
  IChatListTypes,
  Main,
} from "@/components/types/debug-request";
import ChatList from "@/components/version_1_1/chatList";
import { useRequestFilter } from "@/context/RequetsFilterProvider";
import Link from "next/link";
import { perform_get, perform_post } from "@/lib/api";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MessagesPanel = () => {
  return (
    <>
      <div className="w-full h-full pt-[23px] flex flex-wrap bg-[#0F0F0F] rounded-[16px] flex-col items-center gap-[45px]">
        <div className="p-[1px] rounded-[10px] bg-gradient-to-r from-[#6E6E6EA6] via-[#6E6E6E] to-transparent">
          <div className="w-[246px] h-[26px] flex items-center justify-center bg-[#0F0F0F] rounded-[10px]">
            <h1 className="text-xs">پیام های فعال</h1>
          </div>
        </div>
        <MessagesList />
        {/* <NotificationActitvities /> */}
      </div>
    </>
  );
};
export { MessagesPanel };

const MessagesList = () => {
  const [chatLists, setChatLists] = useState<(ConsultElement | Debug)[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const token = Cookies.get("token");
      const response = await perform_get(
        `api/v1/debug/open_debug_session/`,
        token
      );

      if (
        response &&
        Array.isArray(response.opened_consult) &&
        Array.isArray(response.opened_debug)
      ) {
        const combinedArr = [
          ...response.opened_consult,
          ...response.opened_debug,
        ];

        setChatLists(combinedArr);
      } else {
        console.warn("Invalid response format:", response);
        setChatLists([]);
      }
    };

    fetchChats();
  }, []);
  return (
    <div className="w-full space-y-[3px]">
      {chatLists.map((chatCard, idx) => (
        <ChatCard
          key={idx}
          data={chatCard}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      ))}
    </div>
  );
};

const ChatCard = ({
  data,
  selectedChat,
  setSelectedChat,
}: {
  data: ConsultElement | Debug;
  selectedChat: string | null;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
}) => {
  const router = useRouter();
  const isDebug = "debuger_applicator" in data;

  const profileImage = isDebug
    ? data.debuger_applicator.image_profile
    : data.consult_applicator.image_profile;

  const userName = isDebug
    ? data.debuger_applicator.username
    : data.consult_applicator.username;

  const lastMessage =
    data.description.length > 20
      ? data.description.slice(0, 30) + "..."
      : data.description;

  const handleOpenChat = () => {
    setSelectedChat(data.session_id);

    router.push(`/debugger/chat/${data.session_id}?side=messages`);
  };

  return (
    <div
      dir="rtl"
      onClick={handleOpenChat}
      className={`${
        selectedChat === data.session_id ? "border-2 border-[#212121]" : ""
      } w-full h-20 pr-7 bg-gradient-to-r from-[#1F1F1F3B] via-[#1F1F1F3B] to-[#1f1f1f74]`}
    >
      <div className="h-full flex items-center gap-2">
        <div className="w-10 h-10 border border-white rounded-full overflow-hidden">
          <Image
            src={profileImage || "/images/general/Profile.png"}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="pt-0.5">
          <h1 className="text-sm text-[#9DA5FF]">{userName}</h1>
          <p className="-mt-0.5 text-[10px] text-[#B7B7B7] font-iranLight">
            {lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

const NotificationActitvities = () => {
  return (
    <div className=" w-full rounded-xl box-border overflow-y-auto">
      <ChatList />
    </div>
  );
};

const FilterDropDown = () => {
  const [selectedKey, setSelectedKey] = React.useState("همه");
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedKey}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        closeOnSelect={true}
        selectedKeys={new Set([selectedKey])}
        selectionMode="single"
        variant="flat"
        // onSelectionChange={(keys) => {
        //   const key: any = Array.from(keys)[0];
        //   setSelectedKey(key);
        //   if (key == "همه") {
        //     setFilter("");
        //   } else {
        //     setFilter(key);
        //   }
        // }}
      >
        <DropdownItem key="همه">همه</DropdownItem>
        <DropdownItem key="دیباگ">دیباگ</DropdownItem>
        <DropdownItem key="کلاس خصوصی">کلاس خصوصی</DropdownItem>
        <DropdownItem key="مشاوره">مشاوره</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const RequetsList = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { filter } = useRequestFilter();
  const [refresh, setRefresh] = useState<boolean>(false);
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
      setRefresh(false);
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
      applicator.image_profile != null ? applicator.image_profile : "/user.jpg";
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
            <RejectSession
              session_id={item.session_id}
              setRefresh={setRefresh}
            />
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
const RejectSession = ({
  session_id,
  setRefresh,
}: {
  session_id: string;
  setRefresh: (refresh: boolean) => void;
}) => {
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();

  const [isLoading, setIsloading] = useState<boolean>(false);

  const rejectHandler = async () => {
    setIsloading(true);
    const response = await perform_post("api/v1/reject-session/", {
      action: "reject",
      session_id: session_id,
    });
    if (response.success) {
      addToast({
        title: "لغو درخواست",
        description: "لغو درخواست با موفقیت انجام شد",
        color: "success",
        variant: "bordered",
        size: "lg",
        timeout: 5000,
      });
      setRefresh(true);
      setIsloading(false);
    } else if (response.status == 400) {
      addToast({
        title: "لغو درخواست",
        description: "لغو درخواست با موفقیت انجام شد",
        color: "danger",
        variant: "bordered",
        size: "lg",
        timeout: 5000,
      });
      setIsloading(false);
    }
  };

  return (
    <>
      <Button color="danger" variant="bordered" fullWidth onPress={onOpen}>
        رد درخواست
      </Button>

      <Modal onOpenChange={onOpenChange} isOpen={isOpen} dir="rtl">
        <ModalContent>
          <ModalHeader>لغو درخواست</ModalHeader>
          <ModalBody>
            <p>آیا از لغو درخواست مطمئنید؟</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose} variant="solid" color="success">
              ادامه میدم
            </Button>
            <Button
              onPress={rejectHandler}
              isDisabled={isLoading}
              isLoading={isLoading}
              variant="bordered"
              color="danger"
            >
              بله مطمئنم
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
