import { Debug ,ConsultElement} from "@/components/types/activity";
import { PinContainer } from "@/components/ui/ace/3d-pin";
import { AnimatedTooltip } from "@/components/ui/ace/animated-tooltip";
import { formatCurrency } from "@/utils/tools";
import { Button, Chip, User } from "@heroui/react";
import { MessageCircleCode, Phone } from "lucide-react";
import { span } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];
type Props = {
  data: Debug | ConsultElement;
};

const isDebug = (data: Debug | ConsultElement): data is Debug => {
  return "file" in data; // چون فقط Debug فیلد file داره
};

const HistoryCard = (props: Props) => {
  const user = isDebug(props.data) ? props.data.debuger : props.data.consult;
  const people = [
    {
      id: 1,
      name: `${user.first_name} ${user.last_name}`,
      designation: user.job_title || "",
      image: user.image_profile || "",
    },
  ];
  return (
    <div className="h-96 bg-c_background/50 rounded-2xl flex flex-col">
      <div className="h-48 box-border px-4 flex items-center justify-center  overflow-hidden rounded-tr-2xl rounded-tl-2xl ">
        {/* <AnimatedTooltip items={people} /> */}
      </div>
      <div className="flex flex-col box-border px-4 gap-4 ">
        {props.data.mode === "chat" && (
          <Chip
            startContent={<MessageCircleCode size={14} />}
            variant="flat"
            color="secondary"
          >
            چت
          </Chip>
        )}
        <div
          className="flex flex-col rounded-lg bg-c_background gap-2 text-xs p-4"
          dir="ltr"
        >
          <div className=" flex items-center justify-between">
            <div className="flex flex-col items-center justify-end gap-2">
              <h3>
                {props.data.status == "close" && (
                  <Chip variant="flat" color="danger">
                    پایان یافته
                  </Chip>
                )}
                {props.data.status == "open" && (
                  <span>
                    {new Date(props.data.created_at).toLocaleDateString(
                      "fa-IR",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}
                {props.data.status == "pending" && (
                  <Chip variant="flat" color="warning">
                    در حال بررسی
                  </Chip>
                )}
              </h3>
              <Chip>{formatCurrency(props.data.price)}</Chip>
            </div>
            <h3 className="text-lime-300">
              {props.data.title || "نوع درخواست"}
            </h3>
          </div>
          <div className="w-full border-b border-slate-500/50"></div>
          <p className="text-right">{props.data.description}</p>
        </div>
        <Button color="primary" variant="flat" className="mb-2" as={Link} href={`/chat/${props.data.session_id}`}>
          دیدن اطلاعات
        </Button>
      </div>
    </div>
  );
};

export default HistoryCard;
