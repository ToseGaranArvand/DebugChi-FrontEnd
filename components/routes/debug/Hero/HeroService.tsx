"use client";
import { motion } from "framer-motion";
import {Link as ScrollLink } from "react-scroll"

import React from "react";

type Props = {
  data:string[]
};



// const scrollToSection = () => {
//   const element = document.getElementById("service");
//   console.log(element)
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// };
const HeroService = (props: Props) => {
  return (
    <div className="w-2/4 absolute -bottom-32 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-sm grid grid-cols-4 gap-2 h-32 box-border p-2 ">
      {props.data.map((item, index) => {
        return (
          <ScrollLink 
          key={index}
          to={"service"}
          smooth={true}
          duration={800}
          offset={-50}
          className="cursor-pointer"
          >
            <motion.div  className="h-full bg-[#181818] flex items-center justify-center cursor-pointer text-[#666666]" key={index}>
              <h3>{item}</h3>
            </motion.div>
           </ScrollLink>
        );
      })}
    </div>
  );
};

export default HeroService;
