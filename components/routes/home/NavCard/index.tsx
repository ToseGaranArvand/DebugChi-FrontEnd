import React from "react";
import { navCard } from "./data";
import * as motion from "motion/react-client";
import Link from "next/link";

type Props = {};

const NavCard = (props: Props) => {
  return (
    <section className="w-full grid grid-cols-4 gap-4 mt-44 max-w-screen-lg">
      {navCard.map((item) => {
        return (
          <Link href={item.link} key={item.id}>
            <motion.div
              className={`bg-stone-50 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-700
            border text-foreground  h-20 flex box-border px-5 items-center justify-between rounded-lg transition-all duration-500`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <span>{item.name}</span>
              <div
                className={`w-10 h-10 rounded-lg ${item.bg} ${item.text} flex items-center justify-center`}
              >
                <item.icon className={`stroke-slate-50`} />
              </div>
            </motion.div>
          </Link>
        );
      })}
    </section>
  );
};

export default NavCard;
