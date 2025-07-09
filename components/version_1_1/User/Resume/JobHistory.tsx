"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Cross, Plus, Trash2, X } from "lucide-react"
import { UserJobHistory } from "@/components/types/user.types"
import { perform_delete, perform_post } from "@/lib/api"
import { addToast, Button, Input, Textarea } from "@heroui/react"
import { usePathname } from "next/navigation"

interface JobEntry {
  id: string
  companyName: string
  jobTitle: string
  description: string
  startDate: string
  endDate: string
  responsibilities: string
}

// HeroButton
const HeroButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "outline" | "dashed"
  className?: string
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700",
    dashed:
      "border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// HeroCard
const HeroCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

// HeroCardContent
const HeroCardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

// HeroDialog
const HeroDialog = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  )
}

// HeroDialogHeader
const HeroDialogHeader = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{children}</h2>
    </div>
  )
}

// HeroDialogFooter
const HeroDialogFooter = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
      {children}
    </div>
  )
}

// HeroInput
const HeroInput = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  as = "input",
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  as?: "input" | "textarea"
}) => {
  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputClasses} min-h-[100px]`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
    </div>
  )
}

// Main Component
const JobHistory = ({data,user_id}:{data:UserJobHistory[],user_id:number}) => {
  const [jobs, setJobs] = useState<UserJobHistory[]>([])

  const [newJob, setNewJob] = useState<Omit<JobEntry, "id">>({
    companyName: "",
    jobTitle: "",
    description: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  })
useEffect(()=>{
  setJobs(data)
},[])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const currentPath = usePathname()
  const is_engineer = currentPath.startsWith("/engineers/")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addNewJob = async () => {

    const response = await perform_post('api/v1/job_history/',{...newJob,user:user_id})
    console.log(user_id);
    

    if (response.status == 400){
      console.log(response)
      addToast({
        title:"error",
        description:"با خطا مواجه شد",
        color:"danger"
      })
    }
    else{
      setJobs((prev) => [...prev, response ])
      addToast({
        title:"ارسال اطلاعات",
        description:"با موفقیت ثبت شد",
        color:"success"
      })
    }

    setNewJob({
      companyName: "",
      jobTitle: "",
      description: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    })

    setIsDialogOpen(false)
  }


  const deleteObject = async (id:number)=>{
     const response = await perform_delete(`api/v1/job_history/${id}/`)
     if (response?.success){
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id))
      addToast({
        title:"حذف اطلاعات",
        description:"با موفقیت حذف شد",
        color:"success"
      })
     }else{
      addToast({
        title:"حذف اطلاعات",
        description:"با خطا مواجه شد دوباره اقدام کنید",
        color:"danger"
      })
     }
  }
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center mb-36 relative">
      <div className="flex items-center gap-3 ">
        <div className="w-5 h-5 rounded-full bg-white"></div>
        <h1 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
          سوابق شغلی من
        </h1>
      </div>

      {
        jobs.length != 4 && !is_engineer &&
        <Button variant="flat" color="secondary" onPress={() => setIsDialogOpen(true)} className="absolute left-2 top-2">
          <Plus className="mr-2 h-4 w-4" /> سابقه شغلی
        </Button>
      }
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col items-center relative">
            {
              !is_engineer &&
            <Button onPress={()=>deleteObject(job.id)} size="sm" isIconOnly startContent={<Trash2 size={14} />}  variant="shadow" className="bg-c_secondary absolute -left-2 -top-2"></Button>
            }
            <HeroCard className="w-full mb-2 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-800">
              <HeroCardContent className="text-center">
                <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300">
                  {job.companyName}
                </h3>
              </HeroCardContent>
            </HeroCard>

            <div className="h-4 w-0.5 bg-gradient-to-b from-purple-400 to-indigo-500"></div>

            <HeroCard className="w-full mb-2">
              <HeroCardContent className="text-center">
                <div className="font-medium text-gray-800 dark:text-gray-200">{job.jobTitle}</div>
              </HeroCardContent>
            </HeroCard>

            <div className="h-4 w-0.5 bg-gradient-to-b from-purple-400 to-indigo-500"></div>

            <HeroCard className="w-full mb-2">
              <HeroCardContent className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(job.startDate).toLocaleDateString('fa-IR',{
                    year:"numeric",
                    month:"numeric",
                    day:"numeric"
                  })} - {new Date(job.endDate).toLocaleDateString('fa-IR',{
                    year:"numeric",
                    month:"numeric",
                    day:"numeric"
                  })}
                </div>
              </HeroCardContent>
            </HeroCard>

            <div className="h-4 w-0.5 bg-gradient-to-b from-purple-400 to-indigo-500"></div>

            <HeroCard className="w-full mb-2">
              <HeroCardContent>
                <div className="text-sm text-gray-700 dark:text-gray-300">{job.description}</div>
              </HeroCardContent>
            </HeroCard>

            <div className="h-4 w-0.5 bg-gradient-to-b from-purple-400 to-indigo-500"></div>

            <HeroCard className="w-full">
              <HeroCardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.responsibilities}</p>
              </HeroCardContent>
            </HeroCard>
          </div>
        ))}
      </div>
 
      <HeroDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <HeroDialogHeader>اضافه کردن شغل جدید</HeroDialogHeader>
        <div className="p-4 flex flex-col gap-5">
          <Input label="Company" id="companyName" name="companyName" defaultValue={newJob.companyName} onChange={handleInputChange} />
          <Input label="Job Title" id="jobTitle" name="jobTitle" defaultValue={newJob.jobTitle} onChange={handleInputChange} />
          <Textarea label="Description" id="description" name="description" defaultValue={newJob.description} onChange={handleInputChange} />
          <HeroInput label="startDate" id="startDate" name="startDate" type="date" value={newJob.startDate} onChange={handleInputChange} />
          <HeroInput label="endDate" id="endDate" name="endDate" type="date" value={newJob.endDate} onChange={handleInputChange} />
          <Textarea label="Responsibilities" id="responsibilities" name="responsibilities" defaultValue={newJob.responsibilities} onChange={handleInputChange} />
        </div>
        <HeroDialogFooter >
          <HeroButton variant="outline" onClick={() => setIsDialogOpen(false)}>لغو</HeroButton>
          <span></span>
          <HeroButton onClick={addNewJob}>ذخیره</HeroButton>
        </HeroDialogFooter>
      </HeroDialog>
    </div>
  )
}

export default JobHistory
