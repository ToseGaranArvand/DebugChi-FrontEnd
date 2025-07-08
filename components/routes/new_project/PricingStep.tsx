import type React from "react"
import { ProjectStepLayout } from "./ProjectStepLayout"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormData } from "@/hooks/useProjectForm"

interface PricingStepProps {
  form: UseFormReturn<ProjectFormData>
  onNext: () => void
  onPrevious: () => void
}

export const PricingStep: React.FC<PricingStepProps> = ({ form, onNext, onPrevious }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <ProjectStepLayout title="قیمت گذاری" onNext={onNext} onPrevious={onPrevious}>
      <Label htmlFor="price">قیمت خود را وارد کنید</Label>
      <Input type="number" id="price" min={400000} {...register("price")} placeholder="400000" className="h-20" />
      {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      <span className="text-sm text-muted-foreground mt-2">دقت کنید به مبلغ فوق 20% برای حق کمیسیون اضافه میگردد</span>
    </ProjectStepLayout>
  )
}

