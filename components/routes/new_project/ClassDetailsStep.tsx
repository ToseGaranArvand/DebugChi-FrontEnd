import type React from "react"
import { ProjectStepLayout } from "./ProjectStepLayout"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormData } from "@/hooks/useProjectForm"

interface ClassDetailsStepProps {
  form: UseFormReturn<ProjectFormData>
  onNext: () => void
  onPrevious: () => void
}

export const ClassDetailsStep: React.FC<ClassDetailsStepProps> = ({ form, onNext, onPrevious }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = form

  return (
    <ProjectStepLayout title="جزئیات کلاس" onNext={onNext} onPrevious={onPrevious}>
      <span>حد نصاب برای برگذاری کلاس</span>
      <Select onValueChange={(value: string) => setValue("class_size", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="5" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.class_size && <span className="text-red-500">{errors.class_size.message}</span>}
      <div className="mt-5">
        <span>توضیحات خود را بنویسید</span>
        <Textarea {...register("description")} placeholder="توضیحات خود را بنویسید" className="h-40" />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>
    </ProjectStepLayout>
  )
}

