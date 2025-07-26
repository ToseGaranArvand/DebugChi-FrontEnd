"use client";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "./CustomInput/CustomInput";
import { CustomUploadBox } from "../../ui/CustomUploadBox";
import {
  ArrowLeft,
  ChevronLeft,
  CircleX,
  Pencil,
  Search,
  UserPen,
  X,
} from "lucide-react";

import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import Image from "next/image";
import { CustomTextArea } from "../../ui/CustomTextArea";
import { FullDatePicker } from "../../ui/FullDatePicker";
import { CustomMultiUploadBox } from "../../ui/CustomMultiUploadBox";
import Link from "next/link";

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
const languages = [
  { key: "انگلیسی", label: "انگلیسی" },
  { key: "چینی ماندارین", label: "چینی ماندارین" },
  { key: "هندی", label: "هندی" },
  { key: "اسپانیایی", label: "اسپانیایی" },
  { key: "فرانسوی", label: "فرانسوی" },
  { key: "عربی", label: "عربی" },
  { key: "بنگالی", label: "بنگالی" },
  { key: "روسی", label: "روسی" },
  { key: "پرتغالی", label: "پرتغالی" },
  { key: "اردو", label: "اردو" },
  { key: "اندونزیایی", label: "اندونزیایی" },
  { key: "آلمانی", label: "آلمانی" },
  { key: "ژاپنی", label: "ژاپنی" },
  { key: "کره‌ای", label: "کره‌ای" },
  { key: "ترکی استانبولی", label: "ترکی استانبولی" },
  { key: "ایتالیایی", label: "ایتالیایی" },
  { key: "ویتنامی", label: "ویتنامی" },
  { key: "فارسی", label: "فارسی" },
  { key: "سواحیلی", label: "سواحیلی" },
  { key: "تایلندی", label: "تایلندی" },
];

type userCurrentJobsType = {
  companyName: string;
  expertise: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};
type userResumeTypes = {
  resumeName: string;
  resumeImg: string[];
};
type userLangsTypes = {
  langName: string;
  rate: 1 | 2 | 3 | 4 | null;
};

type FormValues = {
  profile: string;
  name: string;
  username: string;
  teachingConcept: string;
  userBiography: string;
  userSkillsDescription: string;
  userCurrentJobs: userCurrentJobsType[];
  userResume: userResumeTypes[];
  userLangs: userLangsTypes[];
  userSkills: string[];
};

const UserDashboardEdit = () => {
  const [showContent, setShowContent] = useState<
    "form" | "bio" | "jobs" | "skills" | "langs" | "resumes"
  >("form");

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      profile: "",
      name: "",
      username: "",
      teachingConcept: "",
      userBiography: "",
      userSkillsDescription: "",
      userCurrentJobs: [],
      userResume: [],
      userLangs: [],
      userSkills: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <div className="p-0.5 w-[892px] h-full bg-gradient-to-r rounded-[28px] from-[#242424] to-[#010A19]">
      <div className="relative w-full h-full overflow-y-auto bg-[#181818] rounded-[28px]">
        <div className="py-[50px] w-[600px] mx-auto">
          <h1 className="text-xl">ویرایش اطلاعات</h1>
          {showContent === "form" && (
            <EditForm
              control={control}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
              setShowContent={setShowContent}
            />
          )}
          {showContent === "bio" && (
            <BioItemForm
              setShowContent={setShowContent}
              onBioUpdate={(bio) => setValue("userBiography", bio)}
              initialBio={getValues("userBiography")}
            />
          )}
          {showContent === "jobs" && (
            <JobItemForm
              onJobListUpdate={(jobList) =>
                setValue("userCurrentJobs", jobList)
              }
              initialJobs={getValues("userCurrentJobs")}
            />
          )}
          {showContent === "skills" && (
            <SkillDesItemForm
              setShowContent={setShowContent}
              onSkillDesUpdate={(skillDes) =>
                setValue("userSkillsDescription", skillDes)
              }
              initialSkillDes={getValues("userSkillsDescription")}
            />
          )}
          {showContent === "langs" && (
            <LangItemForm
              onLangListUpdate={(LangList) => setValue("userLangs", LangList)}
              initialLangs={getValues("userLangs")}
            />
          )}
          {showContent === "resumes" && (
            <ResumeItemForm
              onResumeListUpdate={(ResumeList) =>
                setValue("userResume", ResumeList)
              }
              initialResumes={getValues("userResume")}
            />
          )}
        </div>
        {showContent === "form" ? (
          <Button
            as={Link}
            href="/user/dashboard"
            className="absolute left-5 top-[18px] !min-w-7 w-7 h-7 rounded-full bg-[#0F0F0F]"
            isIconOnly
            startContent={
              <ArrowLeft className="w-[18px] h-[18px] text-[#6E6E6E]" />
            }
          />
        ) : (
          <Button
            className="absolute left-5 top-[18px] !min-w-7 w-7 h-7 rounded-full bg-[#0F0F0F]"
            onPress={() => setShowContent("form")}
            isIconOnly
            startContent={
              <ArrowLeft className="w-[18px] h-[18px] text-[#6E6E6E]" />
            }
          />
        )}
      </div>
    </div>
  );
};
export default UserDashboardEdit;

interface EditFormProps {
  control: Control<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  setShowContent: Dispatch<
    SetStateAction<"form" | "bio" | "jobs" | "skills" | "langs" | "resumes">
  >;
}
const EditForm: FC<EditFormProps> = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  setShowContent,
}) => {
  return (
    <>
      {/* Upload Area */}
      <Controller
        name="profile"
        control={control}
        render={({ field, fieldState }) => (
          <CustomUploadBox
            imgClassName="rounded-full"
            className="w-[100px] h-[100px] mx-auto mt-[49px] mb-[13px] flex justify-center items-center rounded-full border-4 border-[#6E6E6E4D] cursor-pointer"
            selectedFile={field.value || ""}
            onFileChange={(url) => field.onChange(url)}
          >
            <UserPen className="text-[#545454] w-[50px] h-[50px]" />
          </CustomUploadBox>
        )}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-[13px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-[13px]">
          <Controller
            control={control}
            name="name"
            rules={{
              required: "نام و نام خانوادگی الزامی است",
            }}
            render={({ field }) => (
              <CustomInput
                labelTitle="نام و نام خانوادگی"
                field="name"
                value={field.value}
                error={errors.name?.message}
                handleInputChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            rules={{
              required: "اسم کاربری الزامی است",
            }}
            render={({ field }) => (
              <CustomInput
                labelTitle="اسم کاربری"
                field="username"
                value={field.value}
                error={errors.username?.message}
                handleInputChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="teachingConcept"
            rules={{
              required: "حوزه ی مدرس الزامی است",
            }}
            render={({ field }) => (
              <CustomInput
                labelTitle="مدرس ..."
                field="teachingConcept"
                value={field.value}
                error={errors.teachingConcept?.message}
                handleInputChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="userBiography"
            rules={{
              required: "درباره ی من الزامی است",
            }}
            render={({ fieldState }) => (
              <div>
                <CustomBtn
                  text="درباره من"
                  onPress={() => setShowContent("bio")}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="userCurrentJobs"
            rules={{
              required: "سوابق شغلی من الزامی است",
            }}
            render={({ fieldState }) => (
              <div>
                <CustomBtn
                  text="سوابق شغلی من"
                  onPress={() => setShowContent("jobs")}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="userSkillsDescription"
            rules={{
              required: "درباره تخصص هام الزامی است",
            }}
            render={({ fieldState }) => (
              <div>
                <CustomBtn
                  text="درباره تخصص هام"
                  onPress={() => setShowContent("skills")}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="userLangs"
            rules={{
              required: "تسلط بر زبان ها الزامی است",
            }}
            render={({ fieldState }) => (
              <div>
                <CustomBtn
                  text="تسلط بر زبان ها"
                  onPress={() => setShowContent("langs")}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="userResume"
            rules={{
              required: "نمونه کار الزامی است",
            }}
            render={({ fieldState }) => (
              <div>
                <CustomBtn
                  text="نمونه کار"
                  onPress={() => setShowContent("resumes")}
                  error={fieldState.error?.message}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <Controller
          name="userSkills"
          control={control}
          rules={{ required: "انتخاب تخصص ها الزامی است" }}
          render={({ field, fieldState }) => (
            <div>
              <CustomSelectOption
                {...field}
                error={fieldState.error?.message}
              />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
        <Button
          type="submit"
          className="w-full !mt-10 bg-[#1B1B1B] rounded-[14px] h-[45px] border border-[#BABABA38] text-xl font-iranRegular"
        >
          انتشار
        </Button>
      </form>
    </>
  );
};

interface CustomBtnProps {
  text: string;
  onPress: () => void;
  error?: string;
}
const CustomBtn: FC<CustomBtnProps> = ({ text, onPress, error }) => {
  return (
    <Button
      onPress={onPress}
      className={`w-full h-[50px] pl-2 justify-between bg-transparent text-[#797979] !text-sm rounded-[14px] border ${
        error ? "border-red-500" : "border-[#6E6E6E57]"
      }`}
    >
      {text}
      <ChevronLeft />
    </Button>
  );
};

type BioInputFormProps = {
  bioData: string;
  onConfirm: (bio: string) => void;
};
const BioInputForm: FC<BioInputFormProps> = ({ bioData, onConfirm }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ bio: string }>({
    defaultValues: { bio: bioData },
  });

  useEffect(() => {
    reset({ bio: bioData });
  }, [bioData, reset]);

  const onSubmit = (data: { bio: string }) => {
    onConfirm(data.bio);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="bio"
        control={control}
        rules={{
          required: "بیوگرافی الزامی است",
          minLength: { value: 10, message: "حداقل ۱۰ کاراکتر وارد کنید" },
        }}
        render={({ field, fieldState }) => (
          <CustomTextArea
            className="!h-[356px] mt-[50px] pt-[14px] pr-[25px] !bg-[#181818E5] !text-sm text-[#797979] placeholder:text-[#797979] !rounded-[14px] border !border-[#6E6E6E36]"
            value={field.value}
            field="bio"
            placeHolder="درباره من"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <button
        type="submit"
        className="w-full !mt-[19px] bg-[#1B1B1B] rounded-[14px] h-[45px] border border-[#BABABA38] text-xl font-iranRegular"
      >
        تایید
      </button>
    </form>
  );
};
const BioItemForm = ({
  onBioUpdate,
  initialBio = "",
  setShowContent,
}: {
  onBioUpdate: (bio: string) => void;
  initialBio?: string;
  setShowContent: Dispatch<
    SetStateAction<"form" | "bio" | "jobs" | "skills" | "langs" | "resumes">
  >;
}) => {
  const [currentBio, setCurrentBio] = useState<string>(initialBio);

  const handleConfirm = (newBio: string) => {
    setCurrentBio(newBio);
    onBioUpdate(newBio);
    setShowContent("form");
  };

  return (
    <div className="mt-[50px]">
      <BioInputForm bioData={currentBio} onConfirm={handleConfirm} />
    </div>
  );
};

type SkillDesInputFormProps = {
  skillDesData: string;
  onConfirm: (skillDes: string) => void;
};
const SkillDesInputForm: FC<SkillDesInputFormProps> = ({
  skillDesData,
  onConfirm,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ skillDes: string }>({
    defaultValues: { skillDes: skillDesData },
  });

  useEffect(() => {
    reset({ skillDes: skillDesData });
  }, [skillDesData, reset]);

  const onSubmit = (data: { skillDes: string }) => {
    onConfirm(data.skillDes);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="skillDes"
        control={control}
        rules={{
          required: "درباره تخصص هام الزامی است",
          minLength: { value: 10, message: "حداقل ۱۰ کاراکتر وارد کنید" },
        }}
        render={({ field, fieldState }) => (
          <CustomTextArea
            className="!h-[356px] mt-[50px] pt-[14px] pr-[25px] !bg-[#181818E5] !text-sm text-[#797979] placeholder:text-[#797979] !rounded-[14px] border !border-[#6E6E6E36]"
            value={field.value}
            field="skillDes"
            placeHolder="درباره تخصص هام"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <button
        type="submit"
        className="w-full !mt-[19px] bg-[#1B1B1B] rounded-[14px] h-[45px] border border-[#BABABA38] text-xl font-iranRegular"
      >
        تایید
      </button>
    </form>
  );
};
const SkillDesItemForm = ({
  onSkillDesUpdate,
  initialSkillDes = "",
  setShowContent,
}: {
  onSkillDesUpdate: (skillDes: string) => void;
  initialSkillDes?: string;
  setShowContent: Dispatch<
    SetStateAction<"form" | "bio" | "jobs" | "skills" | "langs" | "resumes">
  >;
}) => {
  const [currentSkillDes, setCurrentSkillDes] =
    useState<string>(initialSkillDes);

  const handleConfirm = (newSkillDes: string) => {
    setCurrentSkillDes(newSkillDes);
    onSkillDesUpdate(newSkillDes);
    setShowContent("form");
  };

  return (
    <div className="mt-[50px]">
      <SkillDesInputForm
        skillDesData={currentSkillDes}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

type CustomSelectOptionTypes = {
  value: string[];
  onChange: (val: string[]) => void;
  error?: string;
};

const CustomSelectOption: FC<CustomSelectOptionTypes> = ({
  value,
  onChange,
  error,
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(value));

  useEffect(() => {
    setSelected(new Set(value));
  }, [value]);

  const handleChange = (keys: "all" | Set<React.Key>) => {
    if (keys === "all") return;
    const stringKeys = Array.from(keys).filter(
      (key): key is string => typeof key === "string"
    );
    setSelected(new Set(stringKeys));
    onChange(stringKeys); // send string[] to form
  };

  return (
    <div className="space-y-2">
      <Select
        classNames={{
          base: "w-full",
          trigger: `!h-[50px] rounded-[14px] py-2 border-[1px] ${
            error ? "border-red-500" : "border-[#6E6E6E57]"
          }`,
        }}
        isMultiline={true}
        items={animals}
        labelPlacement="outside"
        placeholder="Select a user"
        selectedKeys={selected}
        onSelectionChange={handleChange}
        selectorIcon={
          <Image src="/images/svg/ThickSvg.svg" alt="" width={14} height={15} />
        }
        renderValue={(items) => {
          return <></>;
        }}
        selectionMode="multiple"
        variant="bordered"
      >
        {(user) => (
          <SelectItem key={user.key} textValue={user.label}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{user.label}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <div className="w-full px-4 flex flex-wrap gap-2">
        {Array.from(selected).map((key, idx) => {
          const selectedAnimal = animals.find((a) => a.key === key);
          return (
            <div
              key={idx}
              className="p-[1px] h-[28px] bg-gradient-to-l from-[#666666] to-[#2b2b2b] rounded-[10px]"
            >
              <div className="h-full px-2 pr-3 flex items-center justify-between gap-5 bg-[#181818E5] rounded-[10px] text-sm text-[#BBBBBB]">
                {selectedAnimal?.label}
                <div
                  onClick={() => {
                    const newSet = new Set(selected);
                    newSet.delete(key);
                    setSelected(newSet);
                    onChange(Array.from(newSet));
                  }}
                >
                  <X className="w-[14px] h-[14px] cursor-pointer text-[#BBBBBB]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type JobInputFormProps = {
  jobData: userCurrentJobsType;
  onConfirm: (job: userCurrentJobsType) => void;
  isEditing: boolean;
};
const JobInputForm: FC<JobInputFormProps> = ({
  jobData,
  onConfirm,
  isEditing,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userCurrentJobsType>({
    defaultValues: jobData,
  });

  useEffect(() => {
    reset(jobData);
  }, [jobData, reset]);

  const onSubmit = (data: userCurrentJobsType) => {
    onConfirm(data);
    reset({
      companyName: "",
      expertise: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="companyName"
        control={control}
        rules={{ required: "نام شرکت الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomInput
            value={field.value}
            field="companyName"
            labelTitle="نام شرکت"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <Controller
        name="expertise"
        control={control}
        rules={{ required: "نوع تخصص الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomInput
            value={field.value}
            field="expertise"
            labelTitle="نوع تخصص"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <Controller
        name="position"
        control={control}
        rules={{ required: "جایگاه شغلی الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomInput
            value={field.value}
            field="position"
            labelTitle="جایگاه شغلی"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "تاریخ شروع الزامی است" }}
          render={({ field, fieldState }) => (
            <div
              className={`userDashboardEditDatePicker ${
                fieldState.error && "errorUserDashboardEditDatePicker"
              }`}
            >
              <FullDatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="تاریخ شروع همکاری"
              />
              {fieldState.error && (
                <span className="text-red-500 text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="endDate"
          control={control}
          rules={{ required: "تاریخ پایان الزامی است" }}
          render={({ field, fieldState }) => (
            <div
              className={`userDashboardEditDatePicker ${
                fieldState.error && "errorUserDashboardEditDatePicker"
              }`}
            >
              <FullDatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="تاریخ پایان همکاری"
              />
              {fieldState.error && (
                <span className="text-red-500 text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <Controller
        name="description"
        control={control}
        rules={{ required: "توضیحات الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomTextArea
            className="h-[100px] pt-3 px-6 bg-[#181818] border-[#6E6E6E57] !rounded-[14px] text-[#797979] placeholder:text-[#797979] !text-sm"
            value={field.value}
            field="description"
            placeHolder="توضیحات"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <button
        type="submit"
        className="w-full h-[45px] bg-[#1B1B1B] border border-[#BABABA38] rounded-[14px] text-white text-xl !font-iranRegular"
      >
        {isEditing ? "بروزرسانی" : "تایید سابقه"}
      </button>
    </form>
  );
};
const JobItemForm = ({
  onJobListUpdate,
  initialJobs = [],
}: {
  onJobListUpdate: (jobs: userCurrentJobsType[]) => void;
  initialJobs?: userCurrentJobsType[];
}) => {
  const emptyJob: userCurrentJobsType = {
    companyName: "",
    expertise: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [jobs, setJobs] = useState<userCurrentJobsType[]>([]);
  const [currentJob, setCurrentJob] = useState(emptyJob);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const characterLimit = 100;

  useEffect(() => {
    if (initialJobs.length) setJobs(initialJobs);
  }, [initialJobs]);

  const handleConfirm = useCallback(
    (newJob: userCurrentJobsType) => {
      const updated =
        editIndex !== null
          ? jobs.map((job, i) => (i === editIndex ? newJob : job))
          : [...jobs, newJob];

      setJobs(updated);
      onJobListUpdate(updated);
      setCurrentJob(emptyJob);
      setEditIndex(null);
    },
    [jobs, editIndex, onJobListUpdate]
  );

  const handleEdit = (index: number) => {
    setCurrentJob(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
    onJobListUpdate(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentJob(emptyJob);
    }
  };

  return (
    <div className="mt-[50px]">
      <JobInputForm
        jobData={currentJob}
        onConfirm={handleConfirm}
        isEditing={editIndex !== null}
      />
      <div className="mt-[33px] space-y-[14px]">
        {jobs.map((job, idx) => {
          const isExpanded = expandedIndex === idx;
          const isLongText = job.description.length > characterLimit;

          const displayedText =
            isExpanded || !isLongText
              ? job.description
              : job.description.slice(0, characterLimit);

          return (
            <div
              key={idx}
              className="relative h-[209px] flex justify-between items-center text-[#BBBBBB] w-full px-7 rounded-[19px] border border-[#212121] bg-gradient-to-tr from-[#191929] via-[#000000] to-transparent"
            >
              <div className="relative w-[205px] h-[140px]">
                <div className="w-full h-7 flex items-center justify-center rounded-xl border border-[#FFFFFF80] text-sm">
                  {job.companyName}
                </div>
                <div className="absolute top-[18px] right-0 h-full w-[2px] bg-gradient-to-b from-[#ffffff3c] to-transparent" />
                <div className="p-[15px] flex flex-col justify-center gap-[11px] font-iranNumRegular text-xs">
                  <span>{job.expertise}</span>
                  <span>
                    {job.startDate} | {job.endDate}
                  </span>
                  <span>{job.position}</span>
                </div>
              </div>

              <div className="mb-[21px]">
                <span className="mr-4 text-xs">توضیح</span>
                <p
                  className={`w-[294px] max-h-[110px] min-h-[70px] mt-[4px] px-3 py-[14px] overflow-y-auto bg-[#1A1A1A] rounded-lg text-[10px] font-iranRegular text-justify ${
                    isLongText && isExpanded
                      ? "leading-[18px]"
                      : "leading-[2px]"
                  }`}
                >
                  {displayedText}
                  {isLongText && (
                    <Button
                      className="!min-w-0 mr-2 !p-0 bg-transparent text-[10px] text-[#898989]"
                      onPress={() => setExpandedIndex(isExpanded ? null : idx)}
                    >
                      {isExpanded ? "کمتر" : "بیشتر .."}
                    </Button>
                  )}
                </p>
              </div>
              <div className="absolute left-3 top-2 flex gap-2">
                <Button
                  className="!bg-transparent !py-1 min-w-0 min-h-0 h-fit w-fit"
                  isIconOnly
                  startContent={<Pencil className="w-3 h-3" />}
                  onPress={() => handleEdit(idx)}
                />
                <Button
                  className="!bg-transparent !py-1 min-w-0 min-h-0 h-fit w-fit"
                  isIconOnly
                  startContent={<CircleX className="w-3 h-3 text-[#FF2B2E]" />}
                  onPress={() => handleDelete(idx)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type ResumeInputFormProps = {
  resumeData: userResumeTypes;
  onConfirm: (resume: userResumeTypes) => void;
  isEditing: boolean;
};
const ResumeInputForm: FC<ResumeInputFormProps> = ({
  resumeData,
  onConfirm,
  isEditing,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userResumeTypes>({
    defaultValues: resumeData,
  });

  useEffect(() => {
    reset(resumeData);
  }, [resumeData, reset]);

  const onSubmit = (data: userResumeTypes) => {
    onConfirm(data);
    reset({
      resumeName: "",
      resumeImg: [],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="resumeName"
        control={control}
        rules={{ required: "نام نمونه کار الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomInput
            value={field.value}
            field="resumeName"
            labelTitle="نام نمونه کار"
            error={fieldState.error?.message}
            handleInputChange={field.onChange}
          />
        )}
      />

      <Controller
        name="resumeImg"
        control={control}
        rules={{ required: "بارگذاری حداقل یک تصویر الزامی است" }}
        render={({ field, fieldState }) => (
          <CustomMultiUploadBox
            className="h-[185px] mt-[37px] border border-[#6E6E6E] bg-[#1C1C1C80] rounded-[20px] cursor-pointer"
            selectedFiles={field.value || []}
            onFilesChange={(urls) => field.onChange(urls)}
            error={fieldState.error?.message}
          >
            <div className="rounded-2xl p-8 text-center">
              <div className="max-w-[410px] w-full !h-[43px] mx-auto mb-4 border border-dashed border-[#272727] flex items-center justify-center rounded-xl">
                <Image
                  src="/images/svg/UploadSvg.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <p className="mt-[35px] text-[#3D3D3D] text-[10px]">
                تصاویر نمونه کار (می‌توانید چند تصویر انتخاب کنید)
              </p>
            </div>
          </CustomMultiUploadBox>
        )}
      />

      <button
        type="submit"
        className="w-full h-[45px] mt-[26px] bg-[#1B1B1B] border border-[#BABABA38] rounded-[14px] text-white text-xl !font-iranRegular"
      >
        {isEditing ? "بروزرسانی" : "آپلود نمونه کار"}
      </button>
    </form>
  );
};
const ResumeItemForm = ({
  onResumeListUpdate,
  initialResumes = [],
}: {
  onResumeListUpdate: (jobs: userResumeTypes[]) => void;
  initialResumes?: userResumeTypes[];
}) => {
  const emptyResume: userResumeTypes = {
    resumeName: "",
    resumeImg: [],
  };

  const [resumes, setResumes] = useState<userResumeTypes[]>([]);
  const [currentResume, setCurrentResume] = useState(emptyResume);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const classes = [
    "h-[90%] self-start rounded-b-[10px]",
    "h-full",
    "h-[90%] self-end rounded-t-[10px]",
  ];

  useEffect(() => {
    if (initialResumes.length) setResumes(initialResumes);
  }, [initialResumes]);

  const handleConfirm = useCallback(
    (newResume: userResumeTypes) => {
      const updated =
        editIndex !== null
          ? resumes.map((resume, i) => (i === editIndex ? newResume : resume))
          : [...resumes, newResume];

      setResumes(updated);
      onResumeListUpdate(updated);
      setCurrentResume(emptyResume);
      setEditIndex(null);
    },
    [resumes, editIndex, onResumeListUpdate]
  );

  const handleEdit = (index: number) => {
    setCurrentResume(resumes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = resumes.filter((_, i) => i !== index);
    setResumes(updated);
    onResumeListUpdate(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentResume(emptyResume);
    }
  };

  return (
    <div className="mt-[50px]">
      <ResumeInputForm
        resumeData={currentResume}
        onConfirm={handleConfirm}
        isEditing={editIndex !== null}
      />
      <div className="mt-[29px] space-y-[14px]">
        {resumes.map((resume, idx) => {
          return (
            <div key={idx} className="w-full mx-auto mb-6">
              <div
                dir="ltr"
                className="h-[196px] w-full rounded-t-[11px] overflow-x-auto"
              >
                <div className="h-full min-w-full w-fit px-10 flex items-center gap-[15px] bg-[#ffdcff]">
                  {resume.resumeImg.map((src, idx) => (
                    <div
                      key={idx}
                      className={`w-[125px] overflow-hidden ${
                        classes[idx % 3]
                      }`}
                    >
                      <Image
                        className="h-full w-auto object-cover"
                        src={src}
                        alt=""
                        width={300}
                        height={300}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* عنوان پروژه */}
              <div className="w-full flex items-center justify-between pr-6 pl-3 h-[63px] bg-[#212121] rounded-b-[11px]">
                <h1 className="text-[#BBBBBB]">{resume.resumeName}</h1>
                <div className="flex gap-2">
                  <Button
                    className="!bg-transparent !py-1 min-w-0 min-h-0 h-fit w-fit"
                    isIconOnly
                    startContent={<Pencil className="w-3 h-3" />}
                    onPress={() => handleEdit(idx)}
                  />
                  <Button
                    className="!bg-transparent !py-1 min-w-0 min-h-0 h-fit w-fit"
                    isIconOnly
                    startContent={
                      <CircleX className="w-3 h-3 text-[#FF2B2E]" />
                    }
                    onPress={() => handleDelete(idx)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type LangInputFormProps = {
  resumeData: userLangsTypes;
  onConfirm: (resume: userLangsTypes) => void;
};
const LangInputForm: FC<LangInputFormProps> = ({ resumeData, onConfirm }) => {
  const levels = ["مبتدی", "متوسط", "مسلط", "پیشرفته"];
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userLangsTypes>({
    defaultValues: resumeData,
  });

  useEffect(() => {
    reset(resumeData);
  }, [resumeData, reset]);

  const onSubmit = (data: userLangsTypes) => {
    onConfirm(data);
    reset({
      langName: "",
      rate: null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10 items-center">
        <Controller
          name="langName"
          control={control}
          rules={{ required: "نوشتن زبان الزامی است" }}
          render={({ field, fieldState }) => (
            <div>
              <CustomAutoComplete {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="rate"
          control={control}
          rules={{ required: "امتیاز زبان الزامی است" }}
          render={({ field, fieldState }) => (
            <div className="mb-[78px]">
              <p className="mb-2.5 mr-2 text-sm text-[#797979]">سطح تسلط</p>

              <div className="flex gap-1">
                {levels.map((label, index) => {
                  const levelValue = index + 1;
                  const isSelected = field.value && field.value >= levelValue;

                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() =>
                        field.onChange(
                          field.value === levelValue ? 0 : levelValue
                        )
                      }
                      className={`w-10 h-10 rounded-[14px] border border-[#6E6E6E57] text-[#E9E9E9] text-[8px] ${
                        isSelected ? "bg-[#4278FFA6]" : "bg-transparent"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full h-[45px] mt-[52px] bg-[#1B1B1B] border border-[#BABABA38] rounded-[14px] text-white text-xl !font-iranRegular"
      >
        تایید
      </button>
    </form>
  );
};
const LangItemForm = ({
  onLangListUpdate,
  initialLangs = [],
}: {
  onLangListUpdate: (jobs: userLangsTypes[]) => void;
  initialLangs?: userLangsTypes[];
}) => {
  const emptyLang: userLangsTypes = {
    langName: "",
    rate: null,
  };

  const [langs, setLangs] = useState<userLangsTypes[]>([]);
  const [currentLang, setCurrentLang] = useState(emptyLang);

  useEffect(() => {
    if (initialLangs.length) setLangs(initialLangs);
  }, [initialLangs]);

  const handleConfirm = useCallback(
    (newLang: userLangsTypes) => {
      const updated = [...langs, newLang];

      setLangs(updated);
      onLangListUpdate(updated);
      setCurrentLang(emptyLang);
    },
    [langs, onLangListUpdate]
  );

  const handleDelete = (index: number) => {
    const updated = langs.filter((_, i) => i !== index);
    setLangs(updated);
    onLangListUpdate(updated);
  };

  return (
    <div className="mt-[25px]">
      <LangInputForm resumeData={currentLang} onConfirm={handleConfirm} />
      <div className="mt-[29px] flex gap-3">
        {langs.map((resume, idx) => {
          return (
            <div
              key={idx}
              className="w-[219px] h-[34px] pl-2 pr-3 flex items-center justify-between rounded-[14px] border border-[#6E6E6E57] text-sm text-[#797979]"
            >
              <div>{resume.langName}</div>
              <div className="flex items-center gap-3">
                <div className="flex flex-row-reverse gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        resume.rate && i < resume.rate
                          ? "bg-[#4278FF]"
                          : "bg-[#FFFFFF4D]"
                      }`}
                    ></div>
                  ))}
                </div>
                <Button
                  className="!bg-transparent !py-1 min-w-0 min-h-0 h-fit w-fit"
                  isIconOnly
                  startContent={
                    <X className="w-[14px] h-[14px] text-[#797979]" />
                  }
                  onPress={() => handleDelete(idx)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
type CustomAutoCompleteProps = {
  value: string;
  onChange: (val: string) => void;
};
const CustomAutoComplete: FC<CustomAutoCompleteProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-fit h-fit p-[1px] rounded-t-[14px] bg-gradient-to-b from-[#BABABA] to-[#181818]">
      <div className="h-[346px] w-[375px] p-4 rounded-t-[14px] bg-gradient-to-b from-[#000000] to-[#181818]">
        <Autocomplete
          classNames={{
            base: "!w-full",
            selectorButton: "!hidden",
            popoverContent: "!bg-transparent !shadow-none",
          }}
          inputProps={{
            value,
            onChange: (e) => onChange(e.target.value),
            classNames: {
              input: "!text-xs !font-iranLight !text-[#BBBBBB]",
              inputWrapper:
                "!h-[33px] !min-h-0 !pl-0 !bg-[#1C1C1CB2] !rounded-[20px] !border !border-[#252525]",
            },
          }}
          placeholder="جستجو زبان"
          startContent={<Search />}
        >
          {languages.map((language) => (
            <AutocompleteItem
              key={language.key}
              onPress={() => onChange(language.label)}
              textValue={language.label}
            >
              <div className="text-xs text-right text-[#797979]">
                {language.label}
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    </div>
  );
};
