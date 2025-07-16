import React from "react";
import { ActiveClassesHeader } from "./Components/ActiveClassesHeader/ActiveClassesHeader";
import { ActiveClassCard } from "./Components/ActiveClassCard/ActiveClassCard";

const ActiveClassesContainer = () => {
  return (
    <div className="min-h-screen text-white">
      {/* <ActiveClassesHeader /> */}
      <div className="px-1 space-y-[13px]">
        <ActiveClassCard />
        <ActiveClassCard />
      </div>
    </div>
  );
};

export { ActiveClassesContainer };
