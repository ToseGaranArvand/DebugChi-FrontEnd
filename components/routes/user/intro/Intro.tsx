"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import axios from "axios"
import Cookies from "js-cookie"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, ArrowRight, Check, Code2, GraduationCap, Search } from "lucide-react"
import { fetchMultipleRequests } from "@/lib/api"
import { toast } from "sonner"

const Intro = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    is_programmer: false,
    expertise: [] as number[],
    language: [] as number[],
    skill: [] as number[],
    cv_title: "",
    cv_description: "",
    cv_file: null as File | null,
  })
  const [fetchedData, setFetchedData] = useState<any>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [searchQuerySkill, setSearchQuerySkill] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMultipleRequests([
        "http://127.0.0.1:8000/api/v1/programmer-exprertise/",
        "http://127.0.0.1:8000/api/v1/programmer-skills/",
        "http://127.0.0.1:8000/api/v1/programming-languages/",
      ])
      if (result && Array.isArray(result) && result.length === 3) {
        setFetchedData({
          expertise: result[0] || [],
          skills: result[1] || [],
          languages: result[2] || [],
        })
      } else {
        console.error("Invalid data received:", result)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData((prev) => ({ ...prev, cv_file: file }))
  }

  const toggleSelection = (field: "expertise" | "language" | "skill", id: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(id) ? prev[field].filter((itemId: number) => itemId !== id) : [...prev[field], id],
    }))
  }

  const handleUpload = async () => {
    try {
      const formDataToSend = new FormData()

      // اضافه کردن فیلدهای ساده
      formDataToSend.append("programmer", formData.is_programmer ? "programmer" : "student")
      formDataToSend.append("cv_title", formData.cv_title)
      formDataToSend.append("cv_description", formData.cv_description)

      // اضافه کردن آرایه‌ها
      formDataToSend.append("expertise", JSON.stringify(formData.expertise))
      formDataToSend.append("language", JSON.stringify(formData.language))
      formDataToSend.append("skill", JSON.stringify(formData.skill))

      // اضافه کردن فایل اگر وجود داشته باشد
      if (formData.cv_file) {
        formDataToSend.append("cv_file", formData.cv_file)
      }

      console.log("FormData content:")
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value)
      }

      const request = await axios.post("http://127.0.0.1:8000/api/v1/add_resume/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      const response = request.data

      if (response.success){
        toast.success("اطلاعات شما با موفقیت ذخیره شد")
        setTimeout(()=>{
          window.location.href = "/user/dashboard"
        },2000)
      }
      console.log("Response:", response)
    } catch (err) {
      console.error("Error while uploading:", err)
    }
  }

  const steps = [
    // Step 1: Programmer or Student
    <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="w-96 h-96">
        <CardHeader>
          <CardTitle>سوال اول</CardTitle>
          <CardDescription>برنامه نویسی؟</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-4">
          <div
            className={`flex flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border ${formData.is_programmer ? "opacity-100 pointer-events-none scale-110" : "opacity-50"}`}
          >
            <Code2 />
            <span>برنامه نویسم</span>
          </div>
          <Switch
            dir="ltr"
            checked={formData.is_programmer}
            onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, is_programmer: checked }))}
          />
          <div
            className={`flex flex-col shadow-md border rounded-md items-center text-base transition-all duration-500 p-2 box-border ${formData.is_programmer ? "opacity-50" : "opacity-100 pointer-events-none scale-110"}`}
          >
            <GraduationCap />
            <span className="w-full">میخوام یاد بگیرم</span>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button className="rounded-full flex-1" onClick={() => setCurrentStep(2)}>
            <ArrowRight />
            <span>بعدی</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>,

    // Step 2: Expertise
    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="w-[600px] h-[600px]">
        <CardHeader>
          <CardTitle>سوال دوم</CardTitle>
          <CardDescription>حوزه تخصص خود را انتخاب کنید</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-4">
          {fetchedData.expertise?.map((item: any) => (
            <div
              key={item.id}
              onClick={() => toggleSelection("expertise", item.id)}
              className={`flex flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border cursor-pointer ${
                formData.expertise.includes(item.id) ? "bg-blue-200 text-white" : "bg-white"
              }`}
            >
              <span>{item.title}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="rounded-full flex-1" onClick={() => setCurrentStep(3)}>
            <ArrowRight />
            <span>بعدی</span>
          </Button>
          <Button className="rounded-full flex-1" variant="outline" onClick={() => setCurrentStep(1)}>
            <span>بازگشت</span>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>,

    // Step 3: Languages
    <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="w-[600px] h-[600px]">
        <CardHeader>
          <CardTitle>سوال سوم</CardTitle>
          <CardDescription>زبان ها و فریم ورک هایی که مسلط هستید</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 border-t border-b h-full box-border py-2 overflow-y-hidden">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-0" />
            <Input type="text" placeholder="جستجو" onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-4 gap-4 box-border py-2 w-full">
              {fetchedData.languages
                ?.filter(
                  (item: any) => searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection("language", item.id)}
                    className={`flex flex-col shadow-md items-center h-[180px] border rounded-md text-base transition-all duration-500 box-border p-2 cursor-pointer ${
                      formData.language.includes(item.id) ? "bg-blue-200 text-blue-600" : "bg-white"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      width={100}
                      height={100}
                      className="object-fill"
                      alt={`${item.name}_${item.level}`}
                    />
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.level}</span>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex gap-2 mt-4">
          <Button className="rounded-full flex-1" onClick={() => setCurrentStep(4)}>
            <ArrowRight />
            <span>بعدی</span>
          </Button>
          <Button className="rounded-full flex-1" variant="outline" onClick={() => setCurrentStep(2)}>
            <span>بازگشت</span>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>,

    // Step 4: Skills
    <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="w-[600px] h-[600px]">
        <CardHeader>
          <CardTitle>سوال چهارم</CardTitle>
          <CardDescription>مهارت هایی که دارید رو انتخاب کنید</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 border-t border-b h-full box-border py-2 overflow-y-hidden">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-0" />
            <Input type="text" placeholder="جستجو" onChange={(e) => setSearchQuerySkill(e.target.value)} />
          </div>
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-4 gap-4 box-border py-2 w-full">
              {fetchedData.skills
                ?.filter(
                  (item: any) =>
                    searchQuerySkill === "" || item.name.toLowerCase().includes(searchQuerySkill.toLowerCase()),
                )
                .map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection("skill", item.id)}
                    className={`flex flex-col shadow-md items-center h-[180px] justify-between text-center border rounded-md text-base transition-all duration-500 box-border p-2 cursor-pointer ${
                      formData.skill.includes(item.id) ? "bg-blue-200 text-blue-600" : "bg-white"
                    }`}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      width={100}
                      height={100}
                      className="object-fill rounded-xl"
                      alt={`${item.name}_${item.level}`}
                    />
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.level}</span>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex gap-2 mt-4">
          <Button className="rounded-full flex-1" onClick={() => setCurrentStep(5)}>
            <ArrowRight />
            <span>بعدی</span>
          </Button>
          <Button className="rounded-full flex-1" variant="outline" onClick={() => setCurrentStep(3)}>
            <span>بازگشت</span>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>,

    // Step 5: Resume
    <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="w-[400px] h-auto">
        <CardHeader>
          <CardTitle>روزومه</CardTitle>
          <CardDescription>اطلاعات روزومه خود را تکمیل کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cv_title">عنوان رزومه</Label>
                <Input
                  id="cv_title"
                  name="cv_title"
                  placeholder="رزومه"
                  value={formData.cv_title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="cv_description">توضیحات</Label>
                <Textarea
                  className="max-h-[200px] overflow-y-scroll"
                  placeholder="بنویسید..."
                  id="cv_description"
                  name="cv_description"
                  value={formData.cv_description}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">توضیحات کوتاه و مختصر بنویسید.</p>
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {formData.cv_file ? (
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{formData.cv_file.name}</p>
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleUpload}>
            <Check />
            <span>ثبت اطلاعات</span>
          </Button>
          <Button variant="outline" onClick={() => setCurrentStep(4)}>
            <span>بازگشت</span>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>,
  ]

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="flex-1 w-full flex items-center justify-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {steps[currentStep - 1]}
      </motion.div>

      <div className="h-20 w-full flex items-center justify-center" dir="ltr">
        {Array.from({ length: 5 }, (_, index) => (
          <motion.div
            key={index}
            className={`w-10 h-2 rounded-full mx-1 ${index < currentStep ? "bg-blue-600" : "bg-gray-400"}`}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: index < currentStep ? 1 : 0.8, opacity: index < currentStep ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

export default Intro

