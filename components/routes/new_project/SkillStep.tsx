import type React from "react"
import { useState } from "react"
import { ProjectStepLayout } from "./ProjectStepLayout"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { ProjectFormData } from "@/hooks/useProjectForm"


interface SkillsStepProps {
  form: UseFormReturn<ProjectFormData>
  onNext: () => void
  onPrevious: () => void
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ form, onNext, onPrevious }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form
  const selectedSkills = watch("language")

  const initialSkills = [
    { value: "python", label: "Python" },
    { value: "php", label: "PHP" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
  ]

  const [skills, setSkills] = useState(initialSkills)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSkillSelect = (value: string) => {
    const selectedSkill = skills.find((skill) => skill.value === value)
    if (selectedSkill && !selectedSkills.includes(selectedSkill.label)) {
      setValue("language", [...selectedSkills, selectedSkill.label])
    }
  }

  const removeSkill = (skill: string) => {
    setValue(
      "language",
      selectedSkills.filter((s) => s !== skill),
    )
  }

  const filteredSkills = skills.filter((skill) => skill.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const addNewSkill = () => {
    if (searchTerm && !skills.some((skill) => skill.label.toLowerCase() === searchTerm.toLowerCase())) {
      const newSkill = { value: searchTerm.toLowerCase(), label: searchTerm }
      setSkills([...skills, newSkill])
      handleSkillSelect(newSkill.value)
      setSearchTerm("")
    }
  }

  return (
    <ProjectStepLayout
      title="مهارت ها"
      description="حوزه و مهارت هایی که در این پروژه مورد استفاده قرار گرفته است را انتخاب کنید"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={selectedSkills.length === 0}
    >
      <div className="w-full">
        <Label htmlFor="language" className="mb-2 block">
          زبان برنامه نویسی
        </Label>
        <Select dir="ltr" onValueChange={handleSkillSelect}>
          <SelectTrigger className="w-full" id="language">
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent className="text-right">
            <SelectGroup className="text-right">
              <SelectLabel>زبان برنامه نویسی</SelectLabel>
              <div className="flex items-center px-2 sticky top-0 bg-white">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  placeholder="جستجو..."
                  className="h-8 w-full bg-transparent focus:outline-none focus:ring-0 focus:border-0"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <Button variant="ghost" size="sm" onClick={addNewSkill} className="ml-2">
                  افزودن
                </Button>
              </div>
              <ScrollArea className="h-[200px]">
                {filteredSkills.map((skill) => (
                  <SelectItem key={skill.value} value={skill.value}>
                    {skill.label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {selectedSkills.map((skill: string) => (
          <Badge key={skill} variant="secondary" className="text-sm py-1 px-2">
            {skill}
            <Button variant="ghost" size="sm" className="h-auto p-0 mr-1" onClick={() => removeSkill(skill)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      {errors.language && <span className="text-red-500">{errors.language.message}</span>}
    </ProjectStepLayout>
  )
}

