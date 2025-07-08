import { Avatar, User } from "@heroui/react";
import React from "react";

type Props = {};

const TopChat = (props: Props) => {
  return (
    <div>
      <User
        avatarProps={{
          isBordered: true,
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
        description="آنلاین"
        name="علیرضا یوسف نژادیان"
      />
    </div>
  );
};

export default TopChat;
