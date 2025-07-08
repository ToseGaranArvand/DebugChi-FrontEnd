"use client";
import React, { useEffect, useState } from "react";
import {

  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  User,
  Select,
  SelectItem,
  Tooltip,
  Divider,
  Input,
  Textarea,
  DatePicker,
  NumberInput,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Avatar,
  Alert,
  addToast,
} from "@heroui/react";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronLeft,
  CircleFadingPlusIcon,
  EllipsisVertical,
  Eye,
  Gavel,
  Mail,
  PlusSquare,
  Search,
  X,
} from "lucide-react";
import { LibraIcon } from "@/components/ui/icons";
import { tenderContext, TenderProvider } from "@/context/UploadTenderContext";
import { I18nProvider, useDateFormatter } from "@react-aria/i18n";
import { start } from "repl";
import { set } from "date-fns";
import { FileUpload } from "../ui/file-upload";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import ImageUploader from "../UploadImage";
import axios from "axios";
import { perform_get, perform_post } from "@/lib/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import {
  Main,
  Public,
  Bid as MainBid,
} from "@/components/types/RequestListForBid";
import { formatCurrency, formatTimeAgo } from "@/utils/tools";
import TenderBidsList from "./TenderBidsList";
import TednerCancelation from "./TenderCancelation";
import CardGradient from "../ui/CardGradient";
import Scrollbar from "../ui/scroll-area";
import Image from "next/image";

type Bid = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  // نوع کلاس: private, public یا consultation
  classType: "private" | "public" | "consultation";
  date: string;
  amount: string;
  status: "approved" | "pending" | "rejected";
};

const bids: Bid[] = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    classType: "private", // کلاس خصوصی
    date: "1402/07/20",
    amount: "1,000,000 تومان",
    status: "pending",
  },
  {
    id: 2,
    name: "Ali Reza",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?u=b02358114e29026702d",
    classType: "public", // کلاس عمومی
    date: "1402/07/22",
    amount: "750,000 تومان",
    status: "approved",
  },
  {
    id: 3,
    name: "Sara Mohammadi",
    role: "UI Specialist",
    avatar: "https://i.pravatar.cc/150?u=c12358114e29026702d",
    classType: "consultation", // مشاوره
    date: "1402/07/25",
    amount: "600,000 تومان",
    status: "rejected",
  },
];

const classOptions = [
  { key: "all", label: "همه" },
  { key: "private", label: "کلاس خصوصی" },
  { key: "public", label: "کلاس عمومی" },
  { key: "consultation", label: "مشاوره" },
];

const statusOptions = [
  { key: "all", label: "همه" },
  { key: "approved", label: "تایید شده" },
  { key: "pending", label: "در حال بررسی" },
  { key: "rejected", label: "رد شده" },
];

const BidIncomingList = () => {
  const [tenderClass, setTenderClass] = useState<Main>();
  const { details,unSeenBid, acceptModal,setBidStatus,showUpload,setShowUpload } = tenderContext();
  useEffect(() => {
    const getAllClassData = async () => {
      const response = await perform_get("api/v1/get_all_tender_class/");
      if (response.status === 404) {
      } else {
        setTenderClass(response);
      }
    };
    getAllClassData();
  }, [setBidStatus]);

  // برای هر دو فیلتر مقدار پیش‌فرض "همه"
  const [selectedClass, setSelectedClass] = React.useState<any>(
    new Set(["all"])
  );
  const [selectedStatus, setSelectedStatus] = React.useState<any>(
    new Set(["all"])
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const filteredBids = bids.filter((bid) => {
    // فیلتر کلاس:
    const classFilterActive = !selectedClass.has("all");
    const statusFilterActive = !selectedStatus.has("all");

    const matchClass = classFilterActive
      ? selectedClass.has(bid.classType)
      : true;
    const matchStatus = statusFilterActive
      ? selectedStatus.has(bid.status)
      : true;

    return matchClass && matchStatus;
  });

  return (
    <div
      className={`${isOpen ? "w-[500px]" : "w-96"
        } transition-all duration-500 ease-in-out h-full flex flex-col gap-4 relative`}
    >
      {
        showUpload && <UploadBidSection setIsOpen={setIsOpen} />
      }
  

      {acceptModal.stats && <AcceptModal />}
      
      <div className="w-full h-10 gap-3 flex items-center justify-between  rounded-t-3xl">
        <TenderSearch />
        {/* <Select
            fullWidth
            label="نوع کلاس"
            placeholder="انتخاب کلاس"
            selectedKeys={selectedClass}
            selectionMode="single"
            onSelectionChange={setSelectedClass}
          >
            {classOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
          <Select
            fullWidth
            label="وضعیت"
            placeholder="انتخاب وضعیت"
            selectedKeys={selectedStatus}
            selectionMode="single"
            onSelectionChange={setSelectedStatus}
          >
            {statusOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select> */}
      </div>

  
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto box-border py-1 scrollbar-left relative">
        {details.state == false ? (
          <>
            <PublicAuctionRquestList public_data={tenderClass?.public || []} />
            <PrivateTenderRquestList
              private_data={tenderClass?.private || []}
            />
          </>
        ) : (
          <>
          {
            !unSeenBid && <BidIncomingListItem bids={details.bids} />
          }
          {
            unSeenBid && <BidUnSeenListItem bids={details.bids}/>
          }
          </>
        )}
      </div>
    </div>
  );
};

export default BidIncomingList;

const TenderSearch = () => {
  const { details, setDetails,setUnseenBids,setShowUpload } = tenderContext();
  return (
    <div className="flex gap-2 items-center w-full" dir="rtl">
      <Input
        startContent={<Search />}
        size="sm"
        radius="full"
        variant="bordered"
        className="border-default-50"
        placeholder="جستجوی مزایده..."
        fullWidth
      />
      <Button
        variant="light"
        isIconOnly
        size="sm"
        color="default"
        onPress={()=>setShowUpload(true)}
        startContent={<PlusSquare className="stroke-gray-500" />}
      ></Button>
      <Button
        isDisabled={!details.state}
        variant="light"
        size="sm"
        color="default"
        startContent={<ArrowLeft />}
        isIconOnly
        onPress={() =>{
          setDetails({ bids: [], state: false })
          setUnseenBids(false)
        }}
      ></Button>
    </div>
  );
};

const PublicAuctionRquestList = ({
  public_data,
}: {
  public_data: Public[];
}) => {
  const { setDetails,setUnseenBids } = tenderContext();

  if (public_data.length == 0) {
    return null;
  }

  return (
    <div className="space-y-4 flex flex-col">
      {public_data.map((item) => {
        return (
          <Card
            dir="rtl"
            key={item.id}
            className="relative h-48 border border-default-100 mr-2"
          >
            <CardGradient />
            <CardHeader className="text-lime-500 box-border px-4 flex justify-between">
              <h2>{item.title}</h2>
              <MoreTenderButton />
            </CardHeader>
            <CardBody className="space-y-2">
              <Divider className="w-3/4 mx-auto" />
              <Button
                onPress={() => {
                  setDetails({ bids: item.bids, state: true });
                }}
                variant="light"
                fullWidth
                className="justify-between hover:bg-transparent"
              >
                <span>درخواست</span>
                <ChevronLeft size={14} />
              </Button>
              <Divider className="w-3/4 mx-auto" />
              <Button
                variant="light"
                fullWidth
                className="justify-between hover:bg-transparent"
                onPress={() => {
                  setDetails({ bids: item.bids, state: true });
                  setUnseenBids(true)
                }}
              >
                <span>بررسی نشده</span>
                <ChevronLeft size={14} />
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

const MoreTenderButton = () => {
  return (
    <Dropdown dir="rtl" placement="bottom-start" backdrop="opaque">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          color="default"
          startContent={<EllipsisVertical size={14} />}
        ></Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key={"edit"}>ویرایش</DropdownItem>
        <DropdownItem key={"show"}>مشاهده در وبسایت</DropdownItem>
        <DropdownItem key={"copy"}>کپی در آگهی</DropdownItem>
        <DropdownItem key={"archive"}>ویرایش</DropdownItem>
        <DropdownItem key={"close"} variant="flat" color="danger">
          بستن
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const PrivateTenderRquestList = ({
  private_data,
}: {
  private_data: Public[];
}) => {
  if (private_data.length == 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {private_data.map((item) => (
        <Card key={item.id} dir="rtl">
          <CardHeader>{item.title}</CardHeader>
          <CardBody></CardBody>
          <CardFooter>{/* فوتر کارت */}</CardFooter>
        </Card>
      ))}
    </div>
  );
};

const BidIncomingListItem = ({ bids }: { bids: MainBid[] }) => {

  const { details, setDetails, setAcceptModal } = tenderContext();

  return (
    <div className="w-full rounded-xl space-y-4 h-auto flex flex-col items-center gap-2 my-2 ">
      {bids.filter(item => item.status == true).map((bid) => (
        <div className="w-full bg-default-100 h-44 border border-default-200 rounded-2xl space-y-4">
          <div className="flex-1 h-16 flex gap-2 items-center bg-default-50 rounded-2xl border border-default-200 relative justify-between">
            <CardGradient />
            <Button
              variant="solid"
              color="success"
              onPress={() => setAcceptModal({
                stats:true,
                uuid:bid.user.uuid,
                bid_id:bid.id
              })}
              className="text-white ml-4 bg-[#4A9909]"
              size="sm"
            >
              پذیرش
            </Button>
            <div className="flex items-center gap-2" dir="rtl">
              <User
                className="z-40 mr-4"
                name={bid.user.first_name + " " + bid.user.last_name}
                avatarProps={{
                  name: bid.user.image_profile,
                  src: bid.user.image_profile,
                }}
                description={bid.user.job_title || "تعیین نشده"}
              />
              {/* <Avatar
                className="mr-4"
                src={bid.user.image_profile}
                name={bid.user.first_name + " " + bid.user.last_name}
              />
              <span className="text-white z-10 text-xs">
                {bid.user.first_name + " " + bid.user.last_name}
              </span> */}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col gap-2 items-center justify-between box-border px-4">
            <div className="flex justify-between box-border px-10 w-full">
              <span className="text-xs font-lightSans">
                {formatTimeAgo(bid.created_at)}
              </span>
              <span className="text-xs font-lightSans">تاریخ درخواست</span>
            </div>
            <Image
              src={"/svg/LineGradient.svg"}
              alt="LineGradient"
              width={200}
              height={1}
            />
            <div className="flex justify-between box-border px-10 w-full">
              <span className="text-xs font-lightSans text-lime-500">
                در انتظار تایید
              </span>
              <span className="text-xs font-lightSans">وضعیت</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const BidUnSeenListItem = ({ bids }: { bids: MainBid[] }) => {
  const { details, setDetails, setAcceptModal,setBidStatus } = tenderContext();
  
  const [isLoading, setLoading] = useState(false);

  const watchBid = async (bid_id: number) => {
    const token = Cookies.get("token");
    setLoading(true);
    const response = await perform_post(
      `api/v1/handle_seen_bid/${bid_id}/`,{}, token || '')
      if(response.success){
        setLoading(false);
        addToast({
          title:"تایید بررسی",
          description:response.message,
          variant:"flat",
          color:"success",
          timeout:5000,
          shouldShowTimeoutProgess: true
        })

      }
    }
  return (
    <div className="w-full rounded-xl space-y-4 h-auto flex flex-col items-center gap-2 my-2 ">
      {bids.filter(item => item.status == false).map((bid) => (
        <div className="w-full bg-default-100 h-auto  rounded-2xl space-y-4 pb-2">
          <div className="flex-1 h-16 flex gap-2 items-center bg-default-50 rounded-2xl border border-default-200 relative justify-between">
            <CardGradient />
            {/* <Button
              variant="solid"
              color="success"
              onPress={() => setAcceptModal({
                stats:true,
                bid_id:bid.id
              })}
              className="text-white ml-4 bg-[#4A9909]"
              size="sm"
            >
              پذیرش
            </Button> */}
             <Button className="bg-btn_primary ml-4" isDisabled={isLoading} isLoading={isLoading} onPress={()=>{
              watchBid(bid.id)
              
              setBidStatus(bid.id)
              }}>ثبت بررسی</Button>
            <div className="flex items-center gap-2" dir="rtl">
              <User
                className="z-40 mr-4"
                name={bid.user.first_name + " " + bid.user.last_name}
                avatarProps={{
                  name: bid.user.image_profile,
                  src: bid.user.image_profile,
                }}
                description={bid.user.job_title || "تعیین نشده"}
              />
              {/* <Avatar
                className="mr-4"
                src={bid.user.image_profile}
                name={bid.user.first_name + " " + bid.user.last_name}
              />
              <span className="text-white z-10 text-xs">
                {bid.user.first_name + " " + bid.user.last_name}
              </span> */}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col gap-2 items-center justify-between box-border px-4">
            <div className="flex justify-between box-border px-10 w-full">
              <span className="text-xs font-lightSans">
                {formatTimeAgo(bid.created_at)}
              </span>
              <span className="text-xs font-lightSans">تاریخ درخواست</span>
            </div>
            <Image
              src={"/svg/LineGradient.svg"}
              alt="LineGradient"
              width={200}
              height={1}
            />
            <div className="flex justify-between box-border px-10 w-full">
              <span className="text-xs font-lightSans text-lime-500">
                در انتظار تایید
              </span>
              <span className="text-xs font-lightSans">وضعیت</span>
            </div>
            <Image
              src={"/svg/LineGradient.svg"}
              alt="LineGradient"
              width={200}
              height={1}
            />
            <div className="flex justify-between box-border px-10 w-full">
              <span className="text-xs font-lightSans text-lime-500">
               {formatCurrency(Number(bid.amount))}
              </span>
              <span className="text-xs font-lightSans">قیمت پیشنهادی</span>
            </div>
          </div>
          <div className="w-3/4 mx-auto">
           
          </div>
        </div>
      ))}

    </div>
  );
};

const UploadBidSection = ({
  setIsOpen,
}: {
  setIsOpen: (show: boolean) => void;
}) => {
  const [showUpload, setShowUpload] = React.useState(false);
  const [page, setPage] = React.useState<number>(1);
  const { tender, setTenderData } = tenderContext();
  return (
    <>
      <div className="absolute bottom-3 flex gap-2 items-center w-full justify-center box-border p-5 z-50">
        <Button
          fullWidth
          className="bg-white text-background"
          variant="solid"
          onPress={() => {
            setPage(1);
            setIsOpen(true);
            setShowUpload(true);
            setTenderData({ ...tender, mode: "auction" });
          }}
          endContent={<LibraIcon />}
        >
          آگهی جدید
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="solid"
          onPress={() => {
            setPage(1);
            setIsOpen(true);
            setShowUpload(true);
            setTenderData({ ...tender, mode: "tender" });
          }}
          endContent={<Gavel />}
        >
          مزایده جدید
        </Button>
      </div>

      <div
        className={`absolute box-border p-5 transition-all duration-500 ${showUpload ? "w-full h-[100%] z-50" : "w-0 h-[0%] opacity-0 -z-10"
          }`}
      >
        <div className="w-full h-full flex flex-col rounded-3xl bg-default-50 box-border p-5">
          {page === 1 && (
            <PageOneUpload
              setPage={setPage}
              setShowUpload={setShowUpload}
              onClose={setIsOpen}
            />
          )}
          {page === 2 && (
            <PageTwoUpload
              setPage={setPage}
              setShowUpload={setShowUpload}
              onClose={setIsOpen}
            />
          )}
        </div>
      </div>
    </>
  );
};

const PageOneUpload = ({
  setPage,
  setShowUpload,
  onClose,
}: {
  setPage: (number: number) => void;
  setShowUpload: (show: boolean) => void;
  onClose: (show: boolean) => void;
}) => {
  const { project, setProjectData, setTenderData, images, tender } =
    tenderContext();
  const [isLoading, setIsloading] = useState(false);

  const createImageProject = async (project_id: number) => {
    try {
      const promises = images.map((data) =>
        axios.post(
          `${process.env.server}/api/v1/project_image/`,
          {
            image: data.file,
            project: project_id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      );

      const results = await Promise.all(promises);

      results.forEach((res, index) => {
        console.log(`Success [${index}]:`, res.data);
      });
    } catch (error) {
      console.error("One or more requests failed:", error);
    }
  };

  const createProjectHandler = async () => {
    setIsloading(true);

    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        `${process.env.server}/api/v1/create_project/`,
        { ...project, is_tender: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTenderData({ ...tender, project: response.data.id });
      if (images.length > 0) {
        await createImageProject(response.data.id);
      }
      setIsloading(false);
      console.log("✅ موفقیت:", response.data);
      setPage(2);
    } catch (error: any) {
      setIsloading(false);
      console.error("❌ خطا:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="w-full flex justify-start">
        <Button
          startContent={<ArrowLeft />}
          variant="light"
          isIconOnly
          size="md"
          onPress={() => {
            setShowUpload(false);
            onClose(false);
            setShowUpload(false);
          }}
        ></Button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <Card dir="rtl" className="flex-1">
          <CardHeader>
            <div className="w-full ">
              <ImageUploader />
              {/* <FileUpload onChange={handleFileUpload} /> */}
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-64">
              <div className="flex w-full gap-2 items-center justify-between">
                <I18nProvider locale="fa-IR">
                  <DatePicker
                    onChange={(value) => {
                      setProjectData({
                        ...project,
                        start_date: value?.toString(),
                      });
                    }}
                    fullWidth
                    isRequired
                    label="شروع کلاس"
                  />
                </I18nProvider>
                <I18nProvider locale="fa-IR">
                  <DatePicker
                    onChange={(value) => {
                      setProjectData({
                        ...project,
                        end_date: value?.toString(),
                      });
                    }}
                    fullWidth
                    isRequired
                    label="پایان کلاس"
                  />
                </I18nProvider>
              </div>
              <Input
                isRequired
                label="عنوان آموزش"
                labelPlacement="inside"
                type="text"
                onValueChange={(value) =>
                  setProjectData({ ...project, class_title: value })
                }
              />
              <Textarea
                isRequired
                type="text"
                labelPlacement="inside"
                label="توضیحات آموزش"
                onValueChange={(value) =>
                  setProjectData({ ...project, description: value })
                }
              />

              <Textarea
                className="h-full"
                fullWidth
                isRequired
                type="text"
                labelPlacement="inside"
                label="سرفصل ها"
                onValueChange={(value) =>
                  setProjectData({ ...project, educational_heading: value })
                }
              />
              <Input
                type="file"
                onChange={(e) => {
                  setProjectData({
                    ...project,
                    educational_heading_file: e.target.files
                      ? e.target.files[0]
                      : null,
                  });
                }}
              />
            </div>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
      <Button
        color="success"
        variant="flat"
        onPress={createProjectHandler}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        بعدی
      </Button>
    </>
  );
};
const PageTwoUpload = ({
  setPage,
  setShowUpload,
  onClose,
}: {
  setPage: (number: number) => void;
  setShowUpload: (show: boolean) => void;
  onClose: (show: boolean) => void;
}) => {
  const { tender, project, setTenderData } = tenderContext();
  const createTender = async () => {
    const token = Cookies.get("token");

    const user_id: any = jwtDecode(token || "");

    const response = await axios.post(
      `${process.env.server}/api/v1/tender_project/`,
      { ...tender, created_by: user_id.user_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = await response.data;
    if (data) {
      console.log(response.data);
      window.location.href = "/bid";
    }
  };

  return (
    <>
      <div className="w-full flex justify-start">
        <Button
          startContent={<ArrowLeft />}
          variant="light"
          isIconOnly
          size="md"
          onPress={() => {
            setPage(1);
          }}
        ></Button>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Card dir="rtl" className="flex-1">
          <CardHeader>
            {/* <div className="w-full h-48 border-default-100 rounded-3xl border border-dashed flex items-center justify-center">
              <Input
                required
                type="file"
                fullWidth={false}
                startContent={<Image />}
              />
            </div> */}
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-2 items-center justify-between">
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setTenderData({ ...tender, image: e.target.files[0] });
                    }
                  }}
                />
                <I18nProvider locale="fa-IR">
                  <DatePicker
                    fullWidth
                    onChange={(value) => {
                      setTenderData({
                        ...tender,
                        start_time: value?.toString(),
                      });
                    }}
                    isRequired
                    label="شروع مزایده"
                  />
                </I18nProvider>
                <I18nProvider locale="fa-IR">
                  <DatePicker
                    onChange={(value) => {
                      setTenderData({
                        ...tender,
                        end_time: value?.toString(),
                      });
                    }}
                    fullWidth
                    isRequired
                    label="پایان مزایده"
                  />
                </I18nProvider>
              </div>
              <Input
                isRequired
                label="عنوان"
                labelPlacement="inside"
                type="text"
                onValueChange={(value) =>
                  setTenderData({ ...tender, title: value })
                }
              />
              <Textarea
                isRequired
                type="text"
                labelPlacement="inside"
                label="توضیحات"
                onValueChange={(value) =>
                  setTenderData({ ...tender, description: value })
                }
              />
            </div>
          </CardBody>
          <CardFooter>
            <SubmitPrice />
          </CardFooter>
        </Card>
        <Button color="success" variant="flat" onPress={createTender}>
          ثبت
        </Button>
      </div>
    </>
  );
};
const PageThreeUpload = ({
  setPage,
}: {
  setPage: (number: number) => void;
}) => {
  return (
    <>
      <div className="w-full flex justify-start">
        <Button
          startContent={<ArrowLeft />}
          variant="light"
          isIconOnly
          size="md"
          onPress={() => setPage(2)}
        ></Button>
      </div>
      <div className="flex-1">3</div>
      <Button
        color="success"
        variant="flat"
        onPress={() => console.log("first")}
      >
        ثبت
      </Button>
    </>
  );
};

const SubmitPrice = () => {
  const { tender, setTenderData } = tenderContext();
  if (tender?.mode == "tender") {
    return (
      // <div className="flex items-center gap-2 w-full justify-center">
      <NumberInput
        isRequired
        defaultValue={1024}
        label="حداقل"
        onValueChange={(value) =>
          setTenderData({ ...tender, start_bid: value })
        }
      />
      // </div>
    );
  }
  return (
    // <div className="flex items-center gap-2 w-full justify-center">
    <NumberInput
      isRequired
      defaultValue={1024}
      label="حداکثر"
      onValueChange={(value) => setTenderData({ ...tender, start_bid: value })}
    />
    // </div>
  );
};

const AcceptModal = () => {
  const { acceptModal, setAcceptModal } = tenderContext();
  const token = Cookies.get("token");
  const acceptUser = async ()=>{
    const response = await perform_post(`api/v1/accept_user_bid/${acceptModal.bid_id}/`,{
      uuid:acceptModal.uuid
    }, token || '')
    if (response.success){
      addToast({
        title:"تایید کاربر",
        description:response.message,
        color:"success",
        variant:"flat"
      })
    }else{
      addToast({
        title:"تایید کاربر",
        description:response.message,
        color:"danger",
        variant:"flat"
      })
    }
  }

  return (
    <div className="absolute z-50 w-full h-full flex items-center justify-center backdrop-blur-md bg-default-50/10 border border-default-100 rounded-2xl box-border p-5">
      <Card className="w-96 h-64 flex items-center justify-center border border-default-100">
        <CardHeader>
          <Alert
            color="danger"
            variant="flat"
            title={"این عملیات قابل بازگشت نیست"}
            dir="rtl"
          />
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center box-border p-4 gap-4">
          <p className="text-center">
            آیا از این که متخصص را به عنوان استاد پذیرفته اید اطمینان دارید؟
          </p>
        </CardBody>
        <CardFooter className="flex gap-4">
          <Button
            variant="ghost"
            fullWidth
            radius="full"
            color="default"
            onPress={() => {
              setAcceptModal({
                stats:false,
                uuid:"",
                bid_id:0
              })
            }}
          >
            خیر
          </Button>
          <Button
            radius="full"
            fullWidth
            variant="ghost"
            color="default"
            onPress={()=>acceptUser()}
          >
            بله
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
