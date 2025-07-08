import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const projectSchema = z.object({
  is_private: z.boolean(),
  class_size: z.string().min(1, "حد نصاب کلاس را انتخاب کنید"),
  project_name: z.string().min(1, "نام پروژه الزامی است"),
  description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  syllabus_file: z.any().optional(),
  language: z.array(z.string()).min(1, "حداقل یک زبان برنامه نویسی را انتخاب کنید"),
  expertise: z.array(z.string()),
  project_type: z.string().min(1, "نوع پروژه را انتخاب کنید"),
  price: z.string().min(1, "قیمت را وارد کنید"),
})

export type ProjectFormData = z.infer<typeof projectSchema>

export const useProjectForm = () => {
  const [step, setStep] = useState(1)

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      is_private: false,
      class_size: "",
      project_name: "",
      description: "",
      language: [],
      expertise: [],
      project_type: "comfortable",
      price: "",
    },
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  return { form, step, nextStep, prevStep }
}

