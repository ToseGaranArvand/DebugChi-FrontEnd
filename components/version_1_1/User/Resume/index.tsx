"use client";
import React from "react";
import LanguageSection from "./LanguageSection";
import { Main } from "@/components/types/user.types";
import ProjectPortofolio from "./ProjectPortofolio";
import EducationSection from "./EducationSection";
import ForigenLanguageSection from "./ForigenLanguageSection";
import Testimonials from "./TestimonialSection";
import InteractiveDiagram from "./JobHistory/intreactive-digram";
import JobHistory from "./JobHistory";
import { Divider } from "@heroui/react";

type Props = {};

const UserResume = ({ data }: { data: Main }) => {
  return (
    <div className="w-full flex flex-col gap-10 items-center h-auto box-border p-5">
      <LanguageSection
        debugger_bio={data.debugger_bio}
        languages={data.user_language}
      />
      <Divider className="w-3/4" />
      <JobHistory data={data.user_job_history} user_id={data.id} />
      <Divider className="w-3/4" />
      <ProjectPortofolio data={data.user_portfolios} user_id={data.id} />
      <Divider className="w-3/4" />
      <EducationSection degree={data.user_degree} user_id={data.id} />
      <Divider className="w-3/4" />
      <ForigenLanguageSection data={data.user_foreign_language} user_id={data.id}/>
      <Divider className="w-3/4" />

      <Testimonials comments={data.user_main_comment} />
    </div>
  );
};

export default UserResume;
