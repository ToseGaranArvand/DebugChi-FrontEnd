"use client";
import type { Main } from "@/redux/slices/courseList";
import { Button, User } from "@heroui/react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

const VideoList = ({ data }: { data: Main[] }) => {
  const chunkArray = (array: Main[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedData = chunkArray(data, 5);

  return (
    <section className="w-full grid grid-cols-1 gap-8 h-auto p-4 box-border  px-20">
      {chunkedData.map((chunk, chunkIndex) => {
        if (chunk.length < 1) return null;
        return (
          <div
            key={`chunk-${chunkIndex}`}
            className="grid grid-cols-2 gap-4 min-h-[512px] "
            dir={chunkIndex % 2 === 1 ? "rtl" : "ltr"}
          >
            <div className="relative  overflow-hidden rounded-xl shadow-sm shadow-white/50">
              <div
                className={`bg-gradient-to-b rounded-xl from-black to-transparent absolute w-full h-2/4 z-10 `}
              ></div>
              <Image
                fill
                alt={chunk[0].title}
                className="object-cover rounded-2xl "
                src={chunk[0].thumbnail || "/user.jpg"}
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-between">
                <div
                  className={`w-full h-20 flex items-center px-5 ${
                    chunkIndex % 2 === 1 ? "justify-end" : "justify-start"
                  }`}
                >
                  <User
                    dir={"ltr"}
                    classNames={{
                      description: "text-foreground text-2xl",
                    }}
                    name={`${chunk[0].user.first_name} ${chunk[0].user.last_name}`}
                    description={chunk[0].title}
                    avatarProps={{
                      size: "lg",
                      src: chunk[0].user.image_profile || "/user.jpg",
                    }}
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-[999]">
                <VideoPlayer data={chunk[0]}/>
                
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
              {chunk.slice(1, 5).map((item, index) => (
                <div
                  key={`item-${chunkIndex}-${index}`}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/40  to-transparent "
                >
                  {/* <div className="bg-gradient-to-b from-black/60 to-transparent absolute w-full h-2/4 z-10 "></div> */}

                  <Image
                    fill
                    alt={item.title}
                    className="object-cover rounded-2xl p-[2px]"
                    src={item.thumbnail || "/user.jpg"}
                  />

                  <div className="absolute inset-0 z-20 flex flex-col justify-between">
                    <div className="absolute bottom-0 box-border p-[2px] w-full bg-gradient-to-r from-white/40 to-black/40 rounded-2xl ">
                      <div
                        className={`w-full flex items-center p-3  rounded-2xl  bg-gradient-to-r from-community to-black 
                        ${
                          chunkIndex % 2 === 1 ? "justify-end" : "justify-start"
                        }
                        `}
                      >
                        <User
                          dir={"ltr"}
                          classNames={{
                            description: "text-foreground text-sm",
                            name: "text-sm",
                          }}
                          name={`${item.user.first_name} ${item.user.last_name}`}
                          description={item.title}
                          avatarProps={{
                            size: "sm",
                            src: item.user.image_profile || "/user.jpg",
                          }}
                        />
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-[999]">
                    <VideoPlayer data={item}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default VideoList;

const PlayIcon = ({ className = "" }) => {
  return (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
        fill="#ffffff"
      />
    </svg>
  );
};



