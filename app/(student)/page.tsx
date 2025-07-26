import React, { FC } from "react";
import { Button, Input, Textarea } from "@heroui/react";
import {
  AudioWaveformIcon,
  Paperclip,
  PaperclipIcon,
  SendHorizontal,
} from "lucide-react";
import { Main } from "@/components/types/user.types";
import { ErrorSection } from "@/components/Student/HomePage/ErrorSection";
import { OptionButtons } from "@/components/Student/HomePage/OptionButtons";
interface IStudentHomePage {
  userData?: Main;
}
const StudentHomePage: FC<IStudentHomePage> = async ({ userData }) => {
  const userRole = userData?.user_roles;
  return (
    <div className="w-full max-w-[893px] h-full mx-auto pb-8 flex flex-col">
      <OptionButtons userRole={userRole} />
    </div>
  );
};

export default StudentHomePage;
