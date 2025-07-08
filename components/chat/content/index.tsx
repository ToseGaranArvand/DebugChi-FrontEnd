import { Avatar, User } from "@heroui/react";
import React from "react";
import { ScrollArea } from "../../ui/scroll-area";
import { CodeBlock } from "../../ui/ace/code-block";
import { python_code } from "./code";
import { Check, CheckCheck } from "lucide-react";
import AudioContent from "./Audio";
import { FileDownloader } from "./File";
import { useSearchParams } from "next/navigation";

type Props = {
  type: "chat" | "code" | "file" | "voice" | "image";
};


const ChatContent = () => {
  
  const searchParams = useSearchParams()
  const uuid = searchParams.get('uuid')

  return (
    <div className="max-w-4xl mx-auto h-full ">
      <div className="w-full h-auto box-border p-4 flex flex-col gap-2">
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          name="Name"
          size="sm"
        />
        <div className="w-max box-border  min-h-14 rounded-r-full bg-purple-800 px-4 rounded-bl-full flex items-center">
          <span className="text-sm font-lightSans">سلام خوبی</span>
        </div>
      </div>
      <div className="w-full h-auto box-border p-4 flex flex-col gap-2 items-end">
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          name="Name"
          size="sm"
        />
        <div className="w-max box-border  min-h-14 rounded-l-full px-4 bg-cyan-900 rounded-br-full flex gap-4 items-center">
          <span>
            <CheckCheck size={14} color="white" />
          </span>
          <span className="text-xs">22:10</span>
          <span className="text-sm font-lightSans">سلام خوبی</span>
        </div>
      </div>
      <div className="w-full h-auto box-border p-4 flex flex-col gap-2 items-end">
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          name="Name"
          size="sm"
        />
        <CodeBlock filename="main.py" language="python" code={python_code} />
      </div>
      <AudioContent />

      <FileDownloader
        fileUrl="/files/test.pdf"
        fileName="test.pdf"
        buttonText="دانلود فایل ضمیمه"
        key={5}
      />
    </div>
  );
};

export default ChatContent;
