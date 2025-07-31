import React from "react";
import { StudentHomePageContainer } from "@/components/Student/StudentHomePageContainer/StudentHomePageContainer";

const GuestHomePage = () => {
  return (
    <div className="w-full max-w-[893px] h-full overflow-hidden mx-auto pb-8 flex flex-col">
      <StudentHomePageContainer />
    </div>
  );
};

export default GuestHomePage;
