// base
import React, { useState, DragEvent, ChangeEvent, FC } from "react";
import { X } from "lucide-react";
// core
import Image from "next/image";

interface ICustomUploadBoxPropTypes {
  className?: string;
  maxFileSizeMB?: number;
  onFilesChange?: (files: File[]) => void;
  children: React.ReactNode;
}

const CustomUploadBox: FC<ICustomUploadBoxPropTypes> = ({
  className,
  maxFileSizeMB = 2,
  onFilesChange,
  children,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const selected = selectedFiles[0];

    if (selected.size / 1024 / 1024 >= maxFileSizeMB) {
      alert(`فایل انتخابی بیشتر از ${maxFileSizeMB} مگابایت است.`);
      return;
    }

    setFile(selected);
    onFilesChange?.([selected]);
  };

  const removeFile = () => {
    setFile(null);
    onFilesChange?.([]);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ""; // ریست کردن ورودی
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      {file ? (
        <div className="relative w-full h-full">
          <Image
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-full object-cover rounded"
            width={20}
            height={20}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className="absolute top-1 right-1 flex justify-center items-center backdrop-blur-sm bg-[#0000007d] text-white rounded-full w-5 h-5 text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export { CustomUploadBox };
