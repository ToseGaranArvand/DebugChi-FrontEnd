// base
import React, { useRef, useState } from "react";
import { X } from "lucide-react";
// components
// core
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";

interface IUploadedFilePropTypes {
  file: File;
  url: string;
}

const SessionUploader = () => {
  const [files, setFiles] = useState<IUploadedFilePropTypes[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lastUploadedFile, setLastUploadedFile] =
    useState<IUploadedFilePropTypes | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const newFile = fileList[0];
    const url = URL.createObjectURL(newFile);
    const uploaded = { file: newFile, url };

    setFiles((prev) => [...prev, uploaded]);
    setLastUploadedFile(uploaded);
    event.target.value = ""; // اجازه بارگذاری فایل مشابه
  };

  const handleDelete = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    if (lastUploadedFile && lastUploadedFile.url === files[index].url) {
      setLastUploadedFile(null);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + " KB";
  };

  return (
    <div>
      {/* پیش‌نمایش عکس‌ها با اسکرول افقی */}
      <div
        dir="ltr"
        className="flex space-x-2 overflow-x-auto max-w-full p-2 rounded-xl"
      >
        {files.map((f, index) => (
          <div key={index} className="relative w-[68px] h-[68px] shrink-0">
            <Image
              src={f.url}
              onClick={() => setLastUploadedFile(f)}
              alt="uploaded"
              className="w-full h-full object-cover rounded-[9px]"
              width={60}
              height={60}
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute -top-2 right-0 flex justify-center items-center backdrop-blur-sm bg-[#FFFFFF38] text-white rounded-full w-5 h-5 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[9px] mb-4"
      ></div>

      {/* بخش پایین */}
      <div className="h-[50px] pl-3 flex items-center justify-between border border-[#6E6E6E57] rounded-[20px] text-xs text-[#C5C5C5]">
        {/* دکمه بارگذاری */}
        <Button
          onPress={triggerFileUpload}
          className="h-full rounded-[20px] !bg-[#7A51BB] text-[13px]"
        >
          بارگذاری ویدیو یا عکس سرفصل
        </Button>

        {/* حجم فایل */}
        <span className="text-xs font-iranRegular">
          {lastUploadedFile ? formatFileSize(lastUploadedFile.file.size) : "--"}
        </span>

        {/* نام فایل */}
        <span className="text-xs font-iranRegular">
          {lastUploadedFile ? lastUploadedFile.file.name : "فایلی انتخاب نشده"}
        </span>

        {/* input مخفی */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export { SessionUploader };
