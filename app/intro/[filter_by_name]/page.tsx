import Introduction from "@/components/version_1_1/Introduction";
import { ThemeSwitcher } from "@/components/version_1_1/ui/ThemeSwitcher";
import { perform_get } from "@/lib/api";
import React from "react";

const page = async ({ params }: any) => {
  const param = await params;
  const response = await perform_get(
    `api/v1/category/filter_by_name/?name=${param.filter_by_name}`
  );

  return (
    <main className="flex items-center justify-center h-screen relative dark:bg-slate-950" dir="rtl">
      <div className="absolute left-4 top-4">
        <ThemeSwitcher />
      </div>
      <Introduction data={response} />
    </main>
  );
};

export default page;
