// base
import React, {
  useRef,
  useState,
  ChangeEvent,
  DragEvent,
  FC,
  useEffect,
} from "react";
import { X } from "lucide-react";
// core
import Image from "next/image";

interface IUploadedFile {
  file: File;
  url: string;
}

interface ICustomMultiUploadBoxPropTypes {
  className?: string;
  imgClassName?: string;
  maxFileSizeMB?: number;
  onFilesChange?: (urls: string[]) => void;
  selectedFiles?: string[];
  children?: React.ReactNode;
  error?: string;
}
const CustomMultiUploadBox: FC<ICustomMultiUploadBoxPropTypes> = (
  {
    className,
    maxFileSizeMB = 2,
    onFilesChange,
    selectedFiles,
    children,
    imgClassName,
    error,
  },
  ref
) => {
  const [files, setFiles] = useState<IUploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    const initialFiles = selectedFiles.map((url) => ({
      file: null as any,
      url,
    }));
    setFiles(initialFiles);
  }, [selectedFiles]);

  const handleFiles = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;

    const validFiles: IUploadedFile[] = [];

    Array.from(selected).forEach((file) => {
      if (file.size / 1024 / 1024 >= maxFileSizeMB) {
        alert(`فایل "${file.name}" بیشتر از ${maxFileSizeMB} مگابایت است.`);
        return;
      }
      validFiles.push({ file, url: URL.createObjectURL(file) });
    });

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.map((f) => f.url));
  };

  const handleDelete = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    onFilesChange?.(updated.map((f) => f.url));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ""; // allow same file selection again
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Dropzone */}
      <div
        className={`${
          error ? "border-red-500" : ""
        } relative cursor-pointer ${className}`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        {children ?? (
          <p className="text-sm text-center">
            برای بارگذاری کلیک یا فایل را رها کنید
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={onInputChange}
        />
      </div>

      {/* پیش‌نمایش فایل‌ها */}
      {files.length > 0 && (
        <div
          dir="ltr"
          className="flex mt-3 space-x-2 overflow-x-auto max-w-full p-2 rounded-xl"
        >
          {files.map((f, index) => (
            <div
              key={index}
              className="relative w-[68px] h-[68px] shrink-0 rounded"
            >
              <Image
                src={f.url}
                alt="uploaded"
                className={`h-full w-auto object-cover rounded ${imgClassName}`}
                width={68}
                height={68}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="absolute -top-2 right-0 flex justify-center items-center backdrop-blur-sm bg-[#FFFFFF38] text-white rounded-full w-5 h-5 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};
CustomMultiUploadBox.displayName = "CustomMultiUploadBox";
export { CustomMultiUploadBox };
