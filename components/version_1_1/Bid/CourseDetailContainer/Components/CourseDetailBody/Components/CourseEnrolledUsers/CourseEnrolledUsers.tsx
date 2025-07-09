import { NormalAvatarGroup } from "@/components/version_1_1/ui/NormalAvatarGroup";
import { Tooltip } from "antd";
import Image from "next/image";

const CourseEnrolledUsers = ({ sessions }: { sessions: any[] }) => (
  <NormalAvatarGroup maxCount={4} size={42}>
    {sessions.map((session, index) => (
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
export { CourseEnrolledUsers };
