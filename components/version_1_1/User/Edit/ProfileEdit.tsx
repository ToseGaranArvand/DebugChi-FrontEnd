"use client";
import type { Main } from "@/components/types/user.types";
import type React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Avatar,
  Textarea,
  Form,
  addToast,
} from "@heroui/react";
import { Edit2, Upload, Check, X, Edit } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { performUpdate } from "@/lib/api";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
export default function ProfileEdit({ user }: { user: Main }) {
  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
  const {
    isOpen: isCropperOpen,
    onOpen: onCropperOpen,
    onOpenChange: onCropperOpenChange,
    onClose: onCropperClose,
  } = useDisclosure();
const currentPath = usePathname()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading,setIsLoading]= useState<boolean>(false)
  const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    user_bio: user.user_bio,
    job_title: user.job_title,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image_profile
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateImageSize = (file: File): boolean => {
    // Check file size (512KB = 512 * 1024 bytes)
    if (file.size > 512 * 1024) {
      setImageError("حجم تصویر باید کمتر از 512 کیلوبایت باشد");
      return false;
    }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (validateImageSize(file)) {
      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        onCropperOpen(); // Open the cropper modal
      };
      reader.readAsDataURL(file);
    }

    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to create a cropped image
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return Promise.reject(new Error("No 2d context"));
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      100,
      100
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        0.95 // Quality
      );
    });
  };

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const handleApplyCrop = async () => {
    if (!imgRef.current || !completedCrop) return;

    try {
      const croppedImageUrl = await getCroppedImg(
        imgRef.current,
        completedCrop
      );

      // Convert base64 to blob to check size
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();

      if (blob.size > 512 * 1024) {
        setImageError("حجم تصویر پس از برش همچنان بیشتر از 512 کیلوبایت است");
        return;
      }

      setImagePreview(croppedImageUrl);
      setImageError(null);
      onCropperClose();
    } catch (e) {
      console.error("Error applying crop:", e);
      setImageError("خطا در برش تصویر");
    }
  };

  const handleCancelCrop = () => {
    setOriginalImage(null);
    onCropperClose();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSubmit = new FormData(e.currentTarget);

    if (imagePreview && imagePreview !== user.image_profile) {
      fetch(imagePreview)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "profile-image.jpg", {
            type: "image/jpeg",
          });
          formDataToSubmit.set("image_profile", file);

          submitFormData(formDataToSubmit);
        });
    } else {
      submitFormData(formDataToSubmit);
    }
  };

  const submitFormData = async (formData: FormData) => {
    setIsLoading(true)
    const token = Cookies.get('token')
    const dataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });

    const response = await axios.patch(`${process.env.server}/auths/register/${user.id}/`,formData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response)
    if (response.status == 200){
        setIsLoading(false)
        onClose()
        addToast({
            title:"ویرایش پروفایل",
            description:"تغییرات با موفقیت انجام شد",
            color:"success"
        })
        window.location.href = currentPath
    }else if(response.status == 400){
        setIsLoading(false)
        addToast({
            title:"خطا در انجام عملیات",
            description:"اینترنت خود را بررسی نمایید",
            color:"danger"
        })
    }


  };

  return (
    <>
      <Button
        endContent={<Edit2 size={14} />}
        variant="light"
        color="warning"
        onPress={onOpen}
      >
        ویرایش
      </Button>


      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        dir="rtl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ویرایش پروفایل
              </ModalHeader>
              <ModalBody>
                <Form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={onSubmit}
                >
                    <Input className="hidden" name="id" value={`${user.id}`} hidden/>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    name="image_profile"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      type="button"
                      className="relative group h-24 w-24"
                      variant="light"
                      onPress={handleImageClick}
                      radius="full"
                    >
                      <Edit className="absolute left-2 bottom-4 z-50" />
                      <Avatar
                        size="lg"
                        src={imagePreview || user.image_profile}
                        className=""
                        radius="full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload size={20} className="text-white" />
                      </div>
                    </Button>
                    {imageError && (
                      <p className="text-danger text-sm">{imageError}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      حداکثر 512 کیلوبایت و 100×100 پیکسل
                    </p>
                  </div>

                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    label="نام"
                  />
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    label="نام خانوادگی"
                  />
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    label="نام کاربری"
                  />
                  <Input
                    type="text"
                    name="job_title"
                    value={formData.job_title || ""}
                    onChange={handleInputChange}
                    label="عنوان شغلی"
                  />
                  <Textarea
                    name="user_bio"
                    value={formData.user_bio}
                    onChange={handleInputChange}
                    placeholder="بایو خود را بنویسید..."
                    label="بایو"
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      color="danger"
                      variant="light"
                      type="button"
                      onPress={onClose}
                    >
                      انصراف
                    </Button>
                    <Button color="primary" type="submit">
                      ذخیره تغییرات
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isCropperOpen}
        onOpenChange={onCropperOpenChange}
        size="xl"
        hideCloseButton
        dir="rtl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                برش تصویر پروفایل
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-gray-600">
                    لطفا قسمت مورد نظر تصویر را انتخاب کنید. تصویر نهایی به
                    اندازه 100×100 پیکسل برش داده خواهد شد.
                  </p>

                  <div className="max-w-full overflow-auto">
                    {originalImage && (
                      <ReactCrop
                        crop={crop}
                        onChange={(c: any) => setCrop(c)}
                        onComplete={handleCropComplete}
                        aspect={1}
                        circularCrop
                      >
                        <img
                          ref={imgRef}
                          src={originalImage || "/placeholder.svg"}
                          alt="تصویر برای برش"
                          style={{ maxHeight: "400px" }}
                        />
                      </ReactCrop>
                    )}
                  </div>

                  <div className="flex justify-center gap-4 w-full mt-4">
                    <Button
                      color="danger"
                      variant="light"
                      startContent={<X size={18} />}
                      onClick={handleCancelCrop}
                    >
                      انصراف
                    </Button>
                    <Button
                      color="primary"
                      startContent={<Check size={18} />}
                      onClick={handleApplyCrop}
                    >
                      تایید برش
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
