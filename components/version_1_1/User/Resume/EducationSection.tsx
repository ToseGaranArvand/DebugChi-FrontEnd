"use client";
import { UserDegree } from "@/components/types/user.types";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  user,
} from "@heroui/react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FilePlus2,
  GraduationCap,
  Plus,
  Trash,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import education from "@/public/lottie/education.json.json";

import Cookies from "js-cookie";
import { perform_delete } from "@/lib/api";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type EducationItem = {
  id: number;
  title: string;
  color: string;
  textColor: string;
  size: string;
};

const EducationSection = ({
  degree,
  user_id,
}: {
  degree: UserDegree[];
  user_id: number;
}) => {
  const currentPath = usePathname();
  const is_engineer = currentPath.startsWith("/engineers/");

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<UserDegree[]>([]);
  useEffect(() => {
    setMounted(true);
    setData(degree);
  }, [degree]);

  const deleteDegree = async (degree_id: number) => {
    const response = await perform_delete(`api/v1/user-degrees/${degree_id}/`);

    if (response?.success) {
      setData((prev) => prev.filter((item) => item.id !== degree_id));
      addToast({
        title: "حذف اطلاعات",
        description: "با موفقیت حذف شد",
        color: "success",
      });
    } else {
      addToast({
        title: "حذف اطلاعات",
        description: "با خطا مواجه شد دوباره اقدام کنید",
        color: "danger",
      });
    }
  };
  // Sample education items with different colors and sizes

  // Calculate positions for the circles around the main circle
  const getPosition = (index: number, total: number, radius: number) => {
    // Start from the top-left position (225 degrees) and go clockwise
    const startAngle = Math.PI * 1.25;
    const angle = startAngle + (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Small glowing dots on the circular path
  const dots = [0, 1, 2, 3];

  return (
    <div className="w-full flex items-center justify-center min-h-screen box-border p-5 relative overflow-hidden rounded-3xl">
      {/* Dotted circular path */}
      <div className="flex items-center gap-3 mb-4 absolute top-2 right-2">
        <div className="w-5 h-5 rounded-full bg-white"></div>
        <h3 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
          تحصیلات آکادمیک و دانشگاهی
        </h3>
      </div>
      {!is_engineer && (
        <AddEducation data={data} setData={setData} user_id={user_id} />
      )}
      <div className="absolute w-[700px] h-[700px] rounded-full border border-dashed border-purple-500/30"></div>

      {/* Small glowing dots on the path */}
      {dots.map((dot, index) => {
        const dotPosition = getPosition(index + 0.5, dots.length, 350);

        return (
          <motion.div
            key={`dot-${index}`}
            className="absolute w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 z-20"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: dotPosition.x,
              y: dotPosition.y,
              opacity: mounted ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              delay: 1.5 + index * 0.2,
            }}
          />
        );
      })}

      {/* Main central circle with gradient and dot pattern */}
      <motion.div
        className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-center p-8 z-10 relative shadow-xl shadow-purple-700/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-20 ">
          <div className="w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:10px_10px]"></div>
        </div>

        <div className=" font-bold relative z-10">
          {/* <Lottie animationData={education} loop={true}  /> */}

          <GraduationCap size={64} />
        </div>
      </motion.div>

      {/* Surrounding circles */}
      {data.length > 0 &&
        data.map((item, index) => {
          const position = getPosition(index, data.length, 300);

          return (
            <motion.div
              key={item.id}
              className={`w-48 h-48 rounded-full bg-purple-400 absolute flex items-center justify-center text-center p-4 shadow-lg z-10 border-8 border-gray-950`}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: mounted ? 1 : 0,
                x: position.x,
                y: position.y,
              }}
              transition={{
                duration: 0.7,
                delay: 0.8 + index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {!is_engineer && (
                <Button
                  className="absolute right-0 bottom-0 bg-c_secondary"
                  variant="shadow"
                  isIconOnly
                  size="md"
                  startContent={<Trash2 size={14} />}
                  onPress={() => deleteDegree(item.id || 0)}
                ></Button>
              )}

              {/* Dot pattern overlay for dark circles */}

              <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                <div className="w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
              </div>

              <p
                className={`text-lg font-medium text-foreground-100 relative z-10`}
              >
                {item.title}
              </p>
            </motion.div>
          );
        })}
    </div>
  );
};

export default EducationSection;

interface _UserDegree {
  title: string;
  degree_file: File | null;
  user: number;
}
const AddEducation = ({
  data,
  setData,
  user_id,
}: {
  data: UserDegree[];
  setData: (data: UserDegree[]) => void;
  user_id: number;
}) => {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
  const [_data, _setData] = useState<_UserDegree>({
    title: "",
    degree_file: null,
    user: user_id,
  });

  const createDegree = async () => {
    const token = Cookies.get("token");
    await axios
      .post(`${process.env.server}/api/v1/user-degrees/`, _data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == 201) {
          setData([...data, res.data as UserDegree]);
          addToast({
            title: "ثبت تحصیلات",
            description: "با موفقیت انجام شد",
            color: "success",
          });
          onClose();
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.message.status == 400)
          addToast({
            title: "ثبت تحصیلات",
            description: "با خطا مواجه شد دوباره اقدام کنید",
            color: "danger",
          });
      });
  };

  return (
    <>
      <Button
        variant="flat"
        radius="full"
        className="absolute left-0 top-0"
        startContent={<Plus />}
        size="lg"
        onPress={onOpen}
        color="secondary"
      >
        تحصیلات جدید
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                تحصیلات جدید
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <Input
                  type="text"
                  label="عنوان"
                  placeholder="عنوان"
                  onValueChange={(value) => {
                    _setData({ ..._data, title: value });
                  }}
                />
                <Input
                  type="file"
                  label="مدرک"
                  onChange={(e) => {
                    if (e.target.files) {
                      _setData({ ..._data, degree_file: e.target.files[0] });
                    }
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="primary" onPress={createDegree}>
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
