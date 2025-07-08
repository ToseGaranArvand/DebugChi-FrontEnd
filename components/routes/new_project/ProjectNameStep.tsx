import type React from "react"
import { ProjectStepLayout } from "./ProjectStepLayout"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormData } from "@/hooks/useProjectForm"

interface ProjectNameStepProps {
  form: UseFormReturn<ProjectFormData>
  onNext: () => void
  onPrevious: () => void
}

import { useEffect } from "react"

export const ProjectNameStep: React.FC<ProjectNameStepProps> = ({ form, onNext, onPrevious }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form

  const projectType = watch("project_type")
  const projectName = watch("project_name")

  useEffect(() => {
    // اجرای اعتبارسنجی اولیه هنگام بارگذاری
    trigger(["project_name", "project_type"])

    // مقداردهی اولیه برای جلوگیری از `undefined`
    setValue("project_type", projectType || "default", { shouldValidate: true })
  }, [trigger, setValue, projectType])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("project_name", e.target.value, { shouldValidate: true })
  }

  return (
    <ProjectStepLayout
      title="ایجاد پروژه"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!!errors.project_name || !!errors.project_type}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="project_name">نام پروژه</Label>
        <Input
          type="text"
          id="project_name"
          placeholder="آموزش مقدماتی سطح پایتون"
          {...register("project_name")}
          onChange={handleInputChange}
        />
        {errors.project_name && <span className="text-red-500">{errors.project_name.message}</span>}
      </div>
      <RadioGroup
        value={projectType || "default"} // مقدار پیش‌فرض تنظیم شود
        onValueChange={(value) => setValue("project_type", value, { shouldValidate: true })}
        className="w-full grid grid-cols-1 mt-4"
      >
        {[
          { value: "default", label: "پروژه آموزشی", id: "r1" },
          { value: "debug", label: "دیباگ", id: "r2" },
          { value: "webinar", label: "وبینار", id: "r3" },
          { value: "coach", label: "کوچ", id: "r4" },
        ].map((item) => (
          <div key={item.id} className="flex w-full items-center space-x-2 border rounded-md h-14 flex-row-reverse px-4 box-border gap-4 mt-4">
            <RadioGroupItem value={item.value} id={item.id} />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {errors.project_type && <span className="text-red-500">{errors.project_type.message}</span>}
    </ProjectStepLayout>
  )
}
