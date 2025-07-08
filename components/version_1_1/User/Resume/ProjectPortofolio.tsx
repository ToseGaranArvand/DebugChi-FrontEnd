"use client";
import type { UserPortfolio } from "@/components/types/user.types";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Textarea,
  addToast,
} from "@heroui/react";
import { FilePlus2, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PorfolioImageUploader from "./PortfolioImageUploader";
import axios from "axios";
import { perform_post } from "@/lib/api";
import { usePathname } from "next/navigation";

const ProjectPortofolio = ({
  data,
  user_id,
}: {
  data: UserPortfolio[];
  user_id: number;
}) => {
  const [portfolio, setPortfolio] = useState<UserPortfolio[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setPortfolio(data);
  }, [data]);

  // Display only first 3 items if showAll is false
  const displayedPortfolio = showAll ? portfolio : portfolio.slice(0, 5);
  const hasMoreItems = portfolio.length > 3;
  const currentPath = usePathname();
  console.log(currentPath.startsWith("/engineers/"));

  if (portfolio.length == 0 && !currentPath.startsWith("/engineers/")) {
    return (
      <div className="w-full h-full py-8 border border-dashed border-slate-700 flex flex-col items-center justify-center gap-3 rounded-3xl box-border">
        <AddNewPortfolio
          user_id={user_id}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
        <span>نمونه کار جدید</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-4 ">
        <div className="w-5 h-5 rounded-full bg-white"></div>
        <h3 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
          پروژه های شخصی من
        </h3>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
        {displayedPortfolio.map((item) => {
          // let image;
          // if (currentPath.startsWith("/engineers/")) {
          //   image = process.env.server + item.images[0].image;
          // } else {
          //   image = item.images[0].image;
          // }
          return (
            <div
              key={item.id}
              className="min-h-[400px] rounded-3xl relative overflow-hidden"
            >
              <Image src={item.images[0].image} alt="image" fill className="object-cover" />
              <div className="w-full flex justify-between items-center box-border px-4 absolute bottom-0 h-20 bg-black">
                <ShowPortfolioDetails data={item} />
                <span>{item.name}</span>
              </div>
            </div>
          );
        })}
        {currentPath.startsWith("/engineers/") ? null : (
          <div className="w-full min-h-[400px] rounded-3xl border border-dashed border-default-100 flex flex-col items-center justify-center gap-4">
            <AddNewPortfolio
              user_id={user_id}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
            <span>نمونه کار جدید</span>
          </div>
        )}
      </div>

      {hasMoreItems && (
        <div className="w-full flex justify-center mt-4">
          <Button
            variant="flat"
            color="secondary"
            onPress={() => setShowAll(!showAll)}
            startContent={showAll ? <ChevronUp /> : <ChevronDown />}
          >
            {showAll ? "نمایش کمتر" : "نمایش بیشتر"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectPortofolio;

export const ShowPortfolioDetails = ({ data }: { data: UserPortfolio }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentPath = usePathname();

  return (
    <>
      <Button variant="light" color="secondary" onPress={onOpen}>
        مشاهده
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        size="full"
        hideCloseButton
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex justify-between gap-1" dir="rtl">
                <span>{data.name}</span>

                <Button color="danger" variant="solid" onPress={onClose}>
                  بستن
                </Button>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex w-full h-full gap-4 relative">
                  <div className="flex-1 flex flex-col box-border gap-4 overflow-y-auto rounded-3xl scrollbar-left">
                    {data.images.map((item) => {
                      // let image_src;

                      // if (currentPath.startsWith("/engineers/")) {
                      //   image_src = process.env.server + item.image;
                      // } else {
                      //   image_src = item.image;
                      // }

                      return (
                        <div
                          key={item.id}
                          className="relative w-full min-h-[900px] rounded-lg"
                        >
                          <Image
                            src={item.image}
                            alt={data.name}
                            fill
                            objectFit="cover"
                            // className="rounded-3xl"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-[500px]">
                    <p className="text-right whitespace-pre-line">
                      {data.description}
                    </p>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const AddNewPortfolio = ({
  user_id,
  portfolio,
  setPortfolio,
}: {
  user_id: number;
  portfolio: UserPortfolio[];
  setPortfolio: (portfolio: UserPortfolio[]) => void;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [images, setImages] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    name: "",
    description: "",
  });

  const createImageProject = async (id: number) => {
    console.log(id);
    try {
      const promises = images.map((data) =>
        axios.post(
          `${process.env.server}/api/v1/user_portfolio_image/`,
          {
            image: data.file,
            user_portfolio: id,
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
      return results;
    } catch (error) {
      console.error("One or more requests failed:", error);
    }
  };

  const createPortfolio = async () => {
    const response = await perform_post("api/v1/user_portfolio/", {
      ...data,
      owner: user_id,
    });

    if (response && response.id) {
      await createImageProject(response.id);

      // ✅ بعد از آپلود عکس‌ها، نمونه‌کار کامل‌شده رو بگیر
      const fullData = await axios.get(
        `${process.env.server}/api/v1/user_portfolio/${response.id}/`
      );

      if (fullData.data) {
        addToast({
          title: "success",
          description: "added successfully",
          color: "success",
        });

        // ✅ آپدیت استیت با نمونه‌کار کامل
        setPortfolio([...portfolio, fullData.data]);
        onClose();
      }
    } else if (response?.status === 400) {
      console.log(response.data);
    }
  };

  return (
    <>
      <Button
        variant="flat"
        isIconOnly
        radius="full"
        startContent={<FilePlus2 />}
        size="lg"
        onPress={onOpen}
        color="secondary"
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                نمونه کار جدید
              </ModalHeader>
              <ModalBody className="flex flex-col" dir="rtl">
                <PorfolioImageUploader setImages={setImages} />
                <Input
                  label="عنوان"
                  placeholder="عنوان"
                  type="text"
                  onValueChange={(value) => {
                    setData({ ...data, name: value });
                  }}
                />

                <Textarea
                  label="توضیحات نمونه کار"
                  placeholder="توضیحات نمونه کار"
                  min={8}
                  max={10}
                  onValueChange={(value) => {
                    setData({ ...data, description: value });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="primary" onPress={createPortfolio}>
                  اضافه کردن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
