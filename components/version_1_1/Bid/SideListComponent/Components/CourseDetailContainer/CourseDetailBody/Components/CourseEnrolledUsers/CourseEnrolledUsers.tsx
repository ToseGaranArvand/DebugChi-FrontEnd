import { Project } from "@/components/types/tender.type";
import { NormalAvatarGroup } from "@/components/version_1_1/ui/NormalAvatarGroup";
import { useBidFilter } from "@/context/BidFilterContext";
import { Tooltip } from "@heroui/react";
import Image from "next/image";
import { FC } from "react";

const CourseEnrolledUsers: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => {
  const { windowWidth } = useBidFilter();

  if (selectedItem?.users && selectedItem?.users.length > 0) {
    return (
      <NormalAvatarGroup maxCount={4} size={windowWidth > 640 ? 28 : 42}>
        {selectedItem?.users.map((session, index) => (
          <Tooltip key={index} title={session.advName} placement="top">
            <Image
              src={session.advProfile}
              alt=""
              className="w-full h-full rounded-full object-cover border"
              width={40}
              height={40}
            />
          </Tooltip>
        ))}
      </NormalAvatarGroup>
    );
  } else
    return (
      <div className="h-5 text-white text-[10px]">کاربری ثبت نام نکرده</div>
    );
};
export { CourseEnrolledUsers };
