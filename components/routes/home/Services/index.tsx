import React from "react";
import { service } from "./data";
import { Button } from "@heroui/react";
import Link from "next/link";
type Props = {
  data: any;
  title:string;
  title_placement: "justify-center" | "justify-end" | "justify-start"
};

const Services = (props: Props) => {
  return (
    <section className="w-full mt-20">
      <div className={`max-w-7xl mx-auto flex ${props.title_placement} items-center`}>
        <h2 className="text-4xl text-[#CC9A06] font-mediumSans">{props.title}</h2>
      </div>

      <div className="max-w-7xl mx-auto mt-5 rounded-3xl h-[480px] shadow-sm shadow-yellow-700 grid grid-cols-5 place-content-center place-items-center gap-4">
        {props.data.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="w-48 h-48 bg-[#161616] border border-[#242424] shadow-md shadow-[#4747475d] rounded-[30px] flex flex-col items-center justify-center gap-2"
            >
              <Link
                href={item.url || "/home"}
                className="flex flex-col items-center justify-center gap-2 font-lightSans"
              >
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt={item.name} />
                ) : (
                  item.icon
                )}
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
