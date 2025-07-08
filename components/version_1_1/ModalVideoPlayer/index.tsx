import {
  LinearGradiant,
  LinearGradiantDownToTop,
} from "@/components/Tools/LinearGradiant";
import { Collection, Comment } from "@/components/types/posts";
import { perform_post } from "@/lib/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  User,
  Chip,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Play,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  post_id: number;
  title: string;
  url: string;
  comments: Comment[];
  uuid: string;
  is_liked: boolean;
  count: number;
  collection: Collection[];
};

export function ModalVideoPlayer({
  url,
  comments,
  title,
  is_liked,
  count,
  post_id,
  collection,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(is_liked);
  const PostAction = async (data: any) => {
    const response = await perform_post("api/v1/like_post/", data);
    if (response) {
      // ✅ به‌روزرسانی مقدار لایک‌ها از سرور
      setActions({
        is_liked: response.is_liked,
        count: response.like_count,
      });
    }
    console.log(response);
  };

  const [actions, setActions] = useState({
    is_liked: is_liked,
    count: count,
  });

  return (
    <>
      <Button
        variant="bordered"
        color="default"
        startContent={<Play className="fill-white" />}
        size="lg"
        isIconOnly
        radius="full"
        onPress={onOpen}
        className="z-50 border-slate-50"
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="flex flex-row min-h-[500px]">
                <div className="flex-1 flex items-center justify-center  relative rounded-lg">
                  <video autoPlay controls className="rounded-lg">
                    <source src={url} />
                  </video>

                  <div className="bg-gradient-to-t from-black to-transparent w-full h-1/4 absolute bottom-0"></div>
                  <div className="absolute w-full flex flex-row items-center left-0 bottom-0">
                    <Button
                      onPress={() =>
                        PostAction({
                          action: "like",
                          post_id: post_id,
                          liked: !actions.is_liked, // ارسال مقدار جدید به جای مقدار قدیمی
                        })
                      }
                      variant="light"
                      isIconOnly
                      size="md"
                      radius="full"
                      startContent={
                        actions.is_liked ? (
                          <Heart className="fill-red-600 stroke-red-600" />
                        ) : (
                          <Heart />
                        )
                      }
                    ></Button>
                    <span>{actions.count}</span>
                    <Button
                      variant="light"
                      isIconOnly
                      size="md"
                      radius="full"
                      startContent={<MessageCircle />}
                    ></Button>
                    <span>{comments.length}</span>
                    {/* <div className="flex-1 flex justify-end items-center">
                <Button variant="light" isIconOnly size="md" radius="full" startContent={<Play className="fill-foreground"/>}></Button>
                </div> */}
                  </div>
                </div>
                <div
                  className="w-96 overflow-y-auto flex flex-col gap-4 h-[500px]"
                  dir="rtl"
                >
                  {comments.length == 0 ? (
                    <div>کامنتی وجود ندارد</div>
                  ) : (
                    comments.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="w-full flex flex-col items-start gap-1 h-auto"
                        >
                          <User
                            avatarProps={{
                              src: item.user.image_profile || "",
                            }}
                            name={
                              item.user.username ||
                              `${item.user.first_name} ${item.user.last_name}`
                            }
                          />
                          <span className="text-tiny mr-12 text-foreground-500">
                            {item.text}
                          </span>
                          <div className="w-2/4 h-[1px] mx-auto bg-slate-800 my-4"></div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function ModalPicturePlayer({
  url,
  comments,
  title,
  is_liked,
  count,
  post_id,
  collection,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === collection.length - 1;
  const PostAction = async (data: any) => {
    const response = await perform_post("api/v1/like_post/", data);
    if (response) {
      setActions({
        is_liked: response.is_liked,
        count: response.like_count,
      });
    }
  };

  const [actions, setActions] = useState({
    is_liked: is_liked,
    count: count,
  });

  const nextImage = () => {
    if (!isLastImage) {
      setPage([page + 1, 1]);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % collection.length);
    }
  };

  const prevImage = () => {
    if (!isFirstImage) {
      setPage([page - 1, -1]);
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + collection.length) % collection.length
      );
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <>
      <Button
        variant="bordered"
        color="default"
        startContent={<Play className="fill-white" />}
        size="lg"
        isIconOnly
        radius="full"
        onPress={onOpen}
        className="z-50 border-slate-50"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="flex flex-row min-h-[500px]">
                <div className="flex-1 flex items-center justify-center relative rounded-lg overflow-hidden">
                  <Chip
                    color="default"
                    variant="solid"
                    className="absolute top-4 right-4 z-30 bg-black/70"
                  >
                    {currentImageIndex + 1}/{collection.length}
                  </Chip>
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={page}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute w-full h-full"
                    >
                      <Image
                        src={
                          collection[currentImageIndex].file ||
                          "/placeholder.svg"
                        }
                        alt={`Image ${currentImageIndex + 1}`}
                        className="object-contain w-full h-full"
                        fill
                      />
                    </motion.div>
                  </AnimatePresence>
                  <Button
                    variant="light"
                    isIconOnly
                    size="sm"
                    radius="full"
                    isDisabled={isFirstImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
                    onPress={prevImage}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="light"
                    isIconOnly
                    isDisabled={isLastImage}
                    size="sm"
                    radius="full"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                    onPress={nextImage}
                  >
                    <ChevronRight />
                  </Button>
                  <div className="bg-gradient-to-t from-black to-transparent w-full h-1/4 absolute bottom-0 z-20"></div>
                  <div className="absolute w-full flex flex-row items-center left-0 bottom-0 p-4 z-30">
                    <Button
                      onPress={() =>
                        PostAction({
                          action: "like",
                          post_id: post_id,
                          liked: !actions.is_liked,
                        })
                      }
                      variant="light"
                      isIconOnly
                      size="md"
                      radius="full"
                      startContent={
                        actions.is_liked ? (
                          <Heart className="fill-red-600 stroke-red-600" />
                        ) : (
                          <Heart />
                        )
                      }
                    />
                    <span className="text-white ml-2">{actions.count}</span>
                    <Button
                      variant="light"
                      isIconOnly
                      size="md"
                      radius="full"
                      startContent={<MessageCircle />}
                      className="ml-4"
                    />
                    <span className="text-white ml-2">{comments.length}</span>
                  </div>
                </div>
                <div
                  className="w-96 overflow-y-auto flex flex-col gap-4 h-[500px]"
                  dir="rtl"
                >
                  {comments.length === 0 ? (
                    <div>کامنتی وجود ندارد</div>
                  ) : (
                    comments.map((item) => (
                      <div
                        key={item.id}
                        className="w-full flex flex-col items-start gap-1 h-auto"
                      >
                        <User
                          avatarProps={{
                            src: item.user.image_profile || "",
                          }}
                          name={
                            item.user.username ||
                            `${item.user.first_name} ${item.user.last_name}`
                          }
                        />
                        <span className="text-tiny mr-12 text-foreground-500">
                          {item.text}
                        </span>
                        <div className="w-2/4 h-[1px] mx-auto bg-slate-800 my-4"></div>
                      </div>
                    ))
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
