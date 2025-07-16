"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AddNewMozayedeHeader } from "./Components/AddNewMozayedeHeader/AddNewMozayedeHeader";
import { CustomInput } from "./Components/CustomInput/CustomInput";
import { DatePickerModal } from "./Components/DatePickerModal/DatePickerModal";
import { SessionsSelectModal } from "./Components/SessionsSelectModal/SessionsSelectModal";
import Button from "@/components/version_1_1/ui/button";
import { CustomUploadBox } from "@/components/version_1_1/ui/CustomUploadBox";
import { CustomTextArea } from "@/components/version_1_1/ui/CustomTextArea";
import Image from "next/image";

type FormValues = {
  className: string;
  auctionAmount: string;
  auctionStartDate: string;
  auctionEndDate: string;
  sessionsCount: string;
  classSessions: string;
  classStartDate: string;
  classEndDate: string;
  classDescription: string;
};

const AddNewMozayedeContanier = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      className: "",
      auctionAmount: "",
      auctionStartDate: "",
      auctionEndDate: "",
      sessionsCount: "",
      classSessions: "",
      classStartDate: "",
      classEndDate: "",
      classDescription: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="text-white py-5 h-full overflow-auto">
      <AddNewMozayedeHeader />
      <div className="px-4 pb-6 space-y-[9px] flex-1">
        {/* Upload Area */}
        <CustomUploadBox className="h-[164px] border border-[#6E6E6E] bg-[#1C1C1C80] rounded-[20px] cursor-pointer">
          <div className="rounded-2xl p-8 text-center">
            <div className="max-w-[288px] w-full !h-[43px] mx-auto mb-4 border border-dashed border-[#272727] flex items-center justify-center rounded-xl">
              <Image src="/images/svg/UploadSvg.svg" alt="" width={40} height={40}/>
            </div>
            <p className="mt-[35px] text-[#3D3D3D] text-[10px]">
              یک بنر برای مزایده خود بارگذاری کنید
            </p>
          </div>
        </CustomUploadBox>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-[13px] bg-[#181818E5] rounded-[20px] p-3 pb-4"
        >
          {/* Class Name */}
          <Controller
            control={control}
            name="className"
            rules={{
              required: "اسم کلاس الزامی است",
            }}
            render={({ field }) => (
              <CustomInput
                labelTitle="اسم کلاس"
                field="className"
                value={field.value}
                error={errors.className?.message}
                handleInputChange={(fieldName: any, value: any) =>
                  field.onChange(value)
                }
              />
            )}
          />

          {/* Auction Amount */}
          <Controller
            control={control}
            name="auctionAmount"
            rules={{
              required: "مبلغ الزامی است",
              validate: (value) =>
                !isNaN(Number(value)) || "مبلغ باید عددی باشد",
            }}
            render={({ field }) => (
              <CustomInput
                labelTitle="مبلغ مزایده"
                field="auctionAmount"
                value={field.value}
                error={errors.auctionAmount?.message}
                handleInputChange={(fieldName: any, value: any) =>
                  field.onChange(value)
                }
              />
            )}
          />

          {/* Date Fields Row */}
          <div className="h-[50px] grid grid-cols-2 gap-1">
            <Controller
              control={control}
              name="auctionStartDate"
              render={({ field }) => (
                <DatePickerModal
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="تایم شروع مزایده"
                />
              )}
            />
            <Controller
              control={control}
              name="auctionEndDate"
              render={({ field }) => (
                <DatePickerModal
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="تایم پایان مزایده"
                />
              )}
            />
          </div>

          {/* Sessions Count */}
          <Controller
            control={control}
            name="sessionsCount"
            rules={{
              required: "تعداد جلسات الزامی است",
              validate: (value) =>
                Number(value) > 0 || "حداقل یک جلسه باید داشته باشید",
            }}
            render={({ field }) => (
              <CustomInput
                containerClassName="h-[50px]"
                labelClassName="border-none pr-[26px]"
                labelTitle="تعداد جلسات"
                field="sessionsCount"
                error={errors.sessionsCount?.message}
                value={field.value}
                handleInputChange={(fieldName: any, value: any) =>
                  field.onChange(value)
                }
              />
            )}
          />

          {/* Chapters/Topics */}
          <Controller
            control={control}
            name="classSessions"
            render={({ field }) => <SessionsSelectModal />}
          />

          {/* Class Dates Row */}
          <div className="h-[50px] grid grid-cols-2 gap-1">
            <Button className="h-full pr-4 justify-start !bg-transparent rounded-[20px] border border-[#6E6E6E36] text-sm">
              تایم شروع کلاس
            </Button>
            <Button className="h-full pr-4 justify-start !bg-transparent rounded-[20px] border border-[#6E6E6E36] text-sm">
              تایم پایان کلاس
            </Button>
          </div>

          {/* Class Description */}
          <Controller
            control={control}
            name="classDescription"
            rules={{
              required: "توضیحات کلاس الزامی است",
              minLength: {
                value: 10,
                message: "حداقل ۱۰ کاراکتر وارد کنید",
              },
            }}
            render={({ field }) => (
              <CustomTextArea
                className="!h-[141px] pt-3 pr-[13px] !bg-[#181818E5] text-white placeholder:text-white placeholder:font-iranMedium rounded-[20px] border !border-[#6E6E6E36]"
                placeHolder="توضیحات کلاس"
                field="classDescription"
                value={field.value}
                error={errors.classDescription?.message}
                handleInputChange={(fieldName: any, value: any) =>
                  field.onChange(value)
                }
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-[45px] !mt-4 !bg-[#3344D9] text-white rounded-[15px] text-xl font-iranRegular"
          >
            انتشار
          </Button>
        </form>
      </div>
    </div>
  );
};

export { AddNewMozayedeContanier };
