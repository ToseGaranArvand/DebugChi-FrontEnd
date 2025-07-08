"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProjectForm } from "@/hooks/useProjectForm"
import { ProjectNameStep } from "./ProjectNameStep"
import { SkillsStep } from "./SkillStep"
import { ClassTypeStep } from "./ClassTypeStep"
import { PricingStep } from "./PricingStep"
import { ClassDetailsStep } from "./ClassDetailsStep"
import axios from "axios"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type ProjectFormData = {
  projectName: string
  language: string[]
  expertise: string[]
  classType: string
  price: number
  classDetails: string
  syllabus_file?: File
}

const NewProjectTest = () => {
  const { form, step, nextStep, prevStep } = useProjectForm()
  const router = useRouter()

  const handleSubmit = async (e:any) => {

    console.log("first",e)
    // const token = Cookies.get("token")
    // if (!token) {
    //   toast.error("لطفا وارد حساب کاربری خود شوید")
    //   return false
    // }

    // const user: any = jwtDecode(token)

    // const formData = new FormData()
    // Object.entries(data).forEach(([key, value]) => {
    //   if (key === "language" || key === "expertise") {
    //     formData.append(key, JSON.stringify(value))
    //   } else if (key === "syllabus_file" && value instanceof File) {
    //     formData.append(key, value)
    //   } else {
    //     formData.append(key, value as string)
    //   }
    // })
    // formData.append("user", user.user_id)

    // try {
    //   const response = await axios.post(`${process.env.server}/api/v1/new_project/`, formData)
    //   if (response.status === 201) {
    //     toast.success("پروژه با موفقیت ایجاد شد")
    //     setTimeout(() => {
    //       router.push("/project/amoozeshi")
    //     }, 2000)
    //   }
    // } catch (error) {
    //   console.error("Error submitting project:", error)
    //   toast.error("خطا در ایجاد پروژه")
    // }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>

    <div className="w-full min-h-screen flex items-center flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && <ProjectNameStep key="step1" form={form} onNext={nextStep} onPrevious={prevStep} />}
        {step === 2 && <SkillsStep key="step2" form={form} onNext={nextStep} onPrevious={prevStep} />}
        {step === 3 && <ClassTypeStep key="step3" form={form} onNext={nextStep} onPrevious={prevStep} />}
        {step === 4 && <PricingStep key="step4" form={form} onNext={nextStep} onPrevious={prevStep} />}
        {step === 5 && (
          <ClassDetailsStep key="step5" form={form} onNext={form.handleSubmit(handleSubmit)} onPrevious={prevStep} />
        )}
      </AnimatePresence>

      <motion.div
        className="h-20 w-full flex items-center justify-center"
        dir="ltr"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`w-10 h-2 rounded-full mx-1 ${index < step ? "bg-blue-600" : "bg-gray-400"}`}
          ></div>
        ))}
      </motion.div>
    </div>
    </form>

  )
}

export default NewProjectTest

