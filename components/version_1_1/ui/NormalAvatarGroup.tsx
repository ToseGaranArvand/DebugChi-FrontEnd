// base
import { FC } from "react";
// lib
import { Tooltip } from "antd";
// core
import { INormalAvatarGroupPropTypes } from "@/src/core/types/props/INormalAvatarGroupPropTypes";



const NormalAvatarGroup: FC<INormalAvatarGroupPropTypes> = ({
  children,
  maxCount = 3,
  size = 45,
  className,
}) => {
  const displayedAvatars = children.slice(0, maxCount);
  const remainingCount = children.length - maxCount;

  return (
    <div
      style={{ paddingLeft: `${size / 2}px` }}
      className={`flex items-center ${className}`}
    >
      {displayedAvatars.map((child, index) => (
        <div
          key={index}
          className={`bg-[#e4e4e4] rounded-full overflow-hidden relative`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            marginLeft: `-${size / 2}px`,
            zIndex: children.length + index,
          }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <Tooltip title={`+${remainingCount} more`}>
          <div
            className={`rounded-full border text-white bg-[#2c2c2c] flex items-center justify-center text-sm`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `-${size / 2}px`,
              zIndex: children.length + 14,
              background:
                "linear-gradient(75deg, #0f0f0f 20%, #2c2c2c 70%, #0f0f0f 100%)",
            }}
          >
            +{remainingCount}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export { NormalAvatarGroup };
