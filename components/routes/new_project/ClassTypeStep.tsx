import type React from "react"
import { ProjectStepLayout } from "./ProjectStepLayout"
import { Switch } from "@/components/ui/switch"
import { Code2, GraduationCap } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormData } from "@/hooks/useProjectForm"
import { toast } from "sonner"

interface ClassTypeStepProps {
  form: UseFormReturn<ProjectFormData>
  onNext: () => void
  onPrevious: () => void
}

export const ClassTypeStep: React.FC<ClassTypeStepProps> = ({ form, onNext, onPrevious }) => {
  const { register, setValue, watch } = form
  const isPrivate = watch("is_private")

  const fileName = watch("syllabus_file")?.name

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        setValue("syllabus_file", file)
      } else {
        toast.error("فقط فایل‌های PDF یا DOCX مجاز هستند")
        event.target.value = ""
      }
    }
  }

  return (
    <ProjectStepLayout title="نحوه برگزاری کلاس" onNext={onNext} onPrevious={onPrevious}>
      <div className="flex justify-center items-center w-full gap-4">
        <div
          className={`flex w-full flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border ${
            isPrivate ? "opacity-100 pointer-events-none scale-110 " : "opacity-50"
          }`}
        >
          <Code2 />
          <span>خصوصی</span>
        </div>

        <div className="flex items-center space-x-2 ">
          <Switch dir="ltr" {...register("is_private")} />
        </div>

        <div
          className={`flex w-full flex-col shadow-md border rounded-md  items-center text-base transition-all duration-500 p-2 box-border ${
            isPrivate ? "opacity-50" : "opacity-100 pointer-events-none scale-110"
          }`}
        >
          <GraduationCap />
          <span>عمومی</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center mt-4">
        <Label
          htmlFor="dropzone-file"
          className="flex h-auto w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center py-5 gap-5">
            <span>{fileName || "انتخاب فایل"}</span>
            {/* SVG and file upload UI */}
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
          </div>
        </Label>
      </div>
    </ProjectStepLayout>
  )
}

