import { LogoIcon } from "@/components/ui/icons";
import { Button, Chip, Link } from "@heroui/react";
import React from "react";
import { data } from "./data";

// interface {}

type Props = {
  data: any[];
  title: string;
  highlight: string;
  special?: string;
};

type ClassLinksProps = {
  title: string;
  icon: React.ReactNode;
  url: string;
};

const ClassLinks: React.FC<ClassLinksProps> = ({ title, icon, url }) => {
  return (
    <Button
      as={Link}
      href={url}
      startContent={icon}
      className="bg-gray-600/35 shadow-sm shadow-gray-500 h-20"
    >
      {title}
    </Button>
  );
};

const ClassInfo = (props: Props) => {
  return (
    <section className="w-full min-h-[400px]">
      <div className="max-w-7xl h-auto  mt-14 mx-auto grid grid-cols-1 gap-4 bg-teal-950 rounded-2xl box-border p-5">
        <div className="flex items-center justify-center gap-4">
          <LogoIcon />
          <div className="flex gap-4">
            <span className="text-2xl">{props.title}</span>
            <span className="text-2xl text-amber-500">{props.highlight}</span>
          </div>
          {props.special && (
            <Chip variant="solid" color="danger" className="text-xl">
              {props.special}
            </Chip>
          )}
        </div>
        {/* <props.title /> */}
        <div className="grid grid-cols-5 place-content-around gap-4">
          {props.data.map((item, index) => {
            return (
              <ClassLinks
                key={index}
                title={item.title}
                icon={<item.icon />}
                url={item.url}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassInfo;
