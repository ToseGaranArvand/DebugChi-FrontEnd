"use client";

import PaperClip from "@/components/chatApp/PaperClip";
import { Button } from "@heroui/react";
import { Paperclip, Pin } from "lucide-react";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { io, type Socket } from "socket.io-client";

interface FileUploadProps {
  session_id: string;
  reciever: string;
  sender: string;
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[];
  socketUrl?: string;
  chunkSize?: number;
  onUploadComplete?: (fileName: string, filePath: string) => void;
  onUploadProgress?: (progress: number) => void;
  onUploadError?: (error: string) => void;
  buttonText?: string;
}

export default function FileUpload({
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ],
  socketUrl = "http://localhost:3001",
  chunkSize = 1024 * 1024, // 1MB chunks
  onUploadComplete,
  onUploadProgress,
  onUploadError,
  buttonText = "Upload File",
  session_id,
  reciever,
  sender,
}: FileUploadProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(reciever, sender);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(socketUrl);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setSocket(socketInstance);
    });

    socketInstance.on("upload-progress", (data) => {
      if (onUploadProgress) {
        onUploadProgress(data.progress);
      }
    });

    socketInstance.on("upload-complete", (data) => {
      if (onUploadComplete) {
        onUploadComplete(data.fileName, data.path);
      }
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
      if (onUploadError) {
        onUploadError("Failed to connect to server");
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [socketUrl, onUploadComplete, onUploadProgress, onUploadError]);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds the maximum limit of ${
          maxFileSize / (1024 * 1024)
        }MB`,
      };
    }

    // Check file type
    const isValidType = allowedFileTypes.some((type) => {
      if (type.includes("*")) {
        const mainType = type.split("/")[0];
        return file.type.startsWith(mainType);
      }
      return file.type === type;
    });

    if (!isValidType) {
      return {
        valid: false,
        error: `File type not allowed. Only images and documents are supported.`,
      };
    }

    return { valid: true };
  };

  const uploadFile = async (file: File) => {
    if (!socket) {
      if (onUploadError) {
        onUploadError("Socket connection not established");
      }
      return;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      if (onUploadError && validation.error) {
        onUploadError(validation.error);
      }
      return;
    }

    try {
      const totalChunks = Math.ceil(file.size / chunkSize);
      const isImage = file.type.startsWith("image/");
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);

        const reader = new FileReader();

        await new Promise<void>((resolve, reject) => {
          reader.onload = (e) => {
            if (e.target?.result) {
              const base64Chunk = (e.target.result as string).split(",")[1];

              socket.emit("upload-chunk", {
                chunk: base64Chunk,
                fileName: file.name,
                offset: start,
                total: file.size,
                session_id: session_id,
                reciever: reciever,
                sender: sender,
                data: {
                  type: isImage ? "picture" : "file",
                  created_at: new Date(),
                  status: "pending",
                },
              });

              resolve();
            } else {
              reject(new Error("Failed to read file chunk"));
            }
          };

          reader.onerror = () => {
            reject(reader.error);
          };

          reader.readAsDataURL(chunk);
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      if (onUploadError) {
        onUploadError("Error uploading file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={allowedFileTypes.join(",")}
      />
      <Button
        radius="full"
        size="md"
        onPress={handleButtonClick}
        isIconOnly
        variant="light"
        startContent={<Paperclip size={16} />}
        className="bg-lime-300 text-black"
      ></Button>
    </>
  );
}
