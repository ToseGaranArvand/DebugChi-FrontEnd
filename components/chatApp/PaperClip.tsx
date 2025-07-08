import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CloudUpload, Code, Paperclip } from "lucide-react";
import React from "react";

type Props = {
  disabled:boolean;
};

const PaperClip = (props: Props) => {
  console.log(props.disabled)
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disabled={props.disabled}
          isIconOnly
          size="sm"
          variant="light"
          startContent={<Paperclip />}
        ></Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions" dir="ltr">
        <DropdownItem key="home" endContent={<CloudUpload />}>
          آپلود فایل
        </DropdownItem>
        <DropdownItem key="about" endContent={<Code />}>
          ارسال کد
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PaperClip;
