import React, {
  useState,
  DragEvent,
  ChangeEvent,
  FC,
  useEffect,
  useRef,
} from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ICustomUploadBoxPropTypes {
  className?: string;
  imgClassName?: string;
  maxFileSizeMB?: number;
  onFileChange?: (url: string) => void;
  selectedFile?: string; // آدرس فایل بیرونی (مثلاً برای حالت edit)
  children?: React.ReactNode;
  error?: string;
}

const CustomUploadBox: FC<ICustomUploadBoxPropTypes> = ({
  className,
  maxFileSizeMB = 2,
  onFileChange,
  selectedFile,
  children,
  imgClassName,
  error,
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // اگر selectedFile بیرونی تغییر کرد، در state داخلی هم اعمال شود
    if (selectedFile) {
      setFileUrl(selectedFile);
    } else {
      setFileUrl(null);
    }
  }, [selectedFile]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const selected = selectedFiles[0];

    if (selected.size / 1024 / 1024 >= maxFileSizeMB) {
      alert(`فایل انتخابی بیشتر از ${maxFileSizeMB} مگابایت است.`);
      return;
    }

    const url = URL.createObjectURL(selected);
    setFileUrl(url);
    onFileChange?.(url);
  };

  const removeFile = () => {
    setFileUrl(null);
    onFileChange?.("");
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ""; // ریست کردن برای آپلود فایل یکسان
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        className={`relative cursor-pointer ${
          error ? "border border-red-500" : ""
        } ${className}`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onInputChange}
        />

        {fileUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={fileUrl}
              alt="uploaded"
              className={`w-full h-full object-cover rounded ${imgClassName}`}
              width={100}
              height={100}
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
          children ?? (
            <p className="text-sm text-center">
              برای بارگذاری کلیک یا فایل را رها کنید
            </p>
          )
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 mr-2">{error}</p>}
    </div>
  );
};

export { CustomUploadBox };
