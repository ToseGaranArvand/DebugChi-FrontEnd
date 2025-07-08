"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState, useCallback } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Code2, GraduationCap, Play, PlayCircle, Search, X } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { fetchMultipleRequests } from "@/lib/api";
import { get } from "http";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Cookies from "js-cookie";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { FileInput, Kbd } from "flowbite-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { jwtDecode } from "jwt-decode";
import { Blob } from "buffer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface FormDataState {
  is_private: boolean;
  class_size: number;
  project_name: string;
  description: string;
  syllabus_file?: File; // فایل ممکن است موجود نباشد
  language: number[];
  expertise: number[];
}
const NewProject = () => {
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
      
  const [checked, setChecked] = React.useState(false);
  const [project_name, setProject_name] = useState("");
  const [question_id, setQuestion_id] = React.useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [skills, setSkills] = useState(initialSkills)
  const [selectedValue, setSelectedValue] = useState("comfortable");
  const [formData, setFormData] = useState({
    project_name: "",
    project_type: "comfortable",
    skills: [],
    is_private: false,
    syllabus_file: "",
    price: "",
    class_size: "",
    description: ""
  });

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setFormData(prev => ({ ...prev, project_type: value }));
  };

  const handleSkillSelect = (value: string) => {
    const selectedSkill = skills.find(skill => skill.value === value)
    if (selectedSkill && !selectedSkills.includes(selectedSkill.label)) {
      setSelectedSkills([...selectedSkills, selectedSkill.label])
      setFormData((prev:any) => ({...prev, skills: [...selectedSkills, selectedSkill.label]}))
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
    setFormData((prev:any) => ({...prev, skills: selectedSkills.filter(s => s !== skill)}))
  }

  const filteredSkills = skills.filter(skill => 
    skill.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addNewSkill = () => {
    if (searchTerm && !skills.some(skill => skill.label.toLowerCase() === searchTerm.toLowerCase())) {
      const newSkill = { value: searchTerm.toLowerCase(), label: searchTerm }
      setSkills([...skills, newSkill])
      handleSkillSelect(newSkill.value)
      setSearchTerm("")
    }
  }
  const handleUpload = async () => {
    console.log('Form Data:', formData);
    await handleSubmit();
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // گرفتن اولین فایل آپلود شده
    if (file) {
      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // نوع‌های مجاز
      if (allowedTypes.includes(file.type)) {
        setFileName(file.name); // ذخیره نام فایل
        setFormData((prev:any) => ({ ...prev, syllabus_file: file }));
      } else {
        alert("فقط فایل‌های PDF یا DOCX مجاز هستند");
        event.target.value = ""; // پاک کردن فایل انتخاب شده
      }
    }
  };
  const router = useRouter()
  const handleSubmit = async () => {
    const token = Cookies.get("token")
    if (!token){


      return false
    }

    let user:any = jwtDecode(token || "")
    console.log(formData)

    const data = {
      type_class: formData.is_private ? "خصوصی" : "عمومی",
      class_session: formData.class_size,
      educational_heading: formData.project_name,
      discount:0,
      description: formData.description,
      educational_heading_file: formData.syllabus_file,
      language: [1,2,3],
      expertise: [1,2,3],
      user:user.user_id
    }

    const newFormData = new FormData()

    newFormData.append("type_class",formData.is_private ? "private" : "public")
    newFormData.append("class_session",formData.class_size)
    newFormData.append("educational_heading",formData.project_name)
    newFormData.append("price",formData.price)
    newFormData.append("discount","0")
    newFormData.append("description",formData.description)
    newFormData.append("educational_heading_file",formData.syllabus_file)
    newFormData.append("language",JSON.stringify([1,2,3]));
    newFormData.append("expertise",JSON.stringify([1,2]));
    newFormData.append("user",user.user_id)


    try {
      const response = await axios.post(`${process.env.server}/api/v1/new_project/`, newFormData);
      console.log('Project submitted successfully:',response);
      if (response.status == 201) {
      toast.success("پروژه با موفقیت ایجاد شد")

        setTimeout(() => {
          router.push('/project/amoozeshi')
        },2000)
      }
      // Handle successful submission (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Error submitting project:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const [fileName, setFileName] = useState("");

  return (
    <div className="w-full h-screen flex items-center flex-col justify-center">
      <div className="flex flex-1 w-full items-center justify-center relative">
        <div className={`flex flex-col w-[600px] gap-4 ${
              question_id !== 1 ? "hidden" : "flex"
            } flex-col justify-between`} >
          <div className="w-full h-44 flex items-center justify-center border rounded-lg">
            <PlayCircle />
          </div>
          
          <Card
            className={`w-full h-auto`}
          >
            <CardHeader>
              <CardTitle>ایجاد پروژه</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="project_name">نام پروژه</Label>
                <Input
                  type="text"
                  id="project_name"
                  placeholder="آموزش مقدماتی سطح پایتون"
                  onChange={(e) => {
                    setProject_name(e.target.value);
                    setFormData(prev => ({ ...prev, project_name: e.target.value }));
                  }}
                />
                <span className="text-sm mr-3 text-muted-foreground">نام پروژه رو با دقت بنویسید که برای کاربران قابل درک و در جستجو بهتر نمایش داده شود</span>
              </div>
              <RadioGroup
      defaultValue="comfortable"
      onValueChange={handleChange}
      className="grid grid-cols-2"
    >
      {[
        { value: "default", label: "پروژه آموزشی", id: "r1" },
        { value: "comfortable", label: "دیباگ", id: "r2" },
        { value: "compact", label: "وبینار", id: "r3" },
        { value: "coach", label: "کوچ", id: "r4" },
      ].map((item) => (
        <div
          key={item.id}
          className={`flex items-center space-x-2 border rounded-md w-64 h-14 flex-row-reverse px-4 box-border gap-4 mt-4 ${
            selectedValue === item.value ? "bg-blue-50  border-blue-600 text-foreground" : ""
          }`}
        >
          <RadioGroupItem value={item.value} id={item.id} />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
            </CardContent>

            <CardFooter className="flex">
              <Button
                className="rounded-full flex-1"
                onClick={() => setQuestion_id(2)}
                disabled={project_name.length < 1}
              >
                <ArrowRight />
                <span>بعدی</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card
      className={`w-[600px] h-[600px] ${
        question_id !== 2 ? "hidden" : "flex"
      } flex-col justify-between`}
    >
      <CardHeader>
        <CardTitle>مهارت ها</CardTitle>
        <CardDescription>حوزه و مهارت هایی که در این پروژه مورد استفاده قرار گرفته است را انتخاب کنید</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col justify-center items-center py-2 box-border gap-4 h-full">
        <div className="w-full">
          <Label htmlFor="language" className="mb-2 block">زبان برنامه نویسی</Label>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addNewSkill}
                    className="ml-2"
                  >
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
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm py-1 px-2">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 mr-1"
                onClick={() => removeSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          className="rounded-full flex-1"
          onClick={() => setQuestion_id(3)}
        >
          <ArrowRight />
          <span>بعدی</span>
        </Button>
        <Button
          className="rounded-full flex-1"
          variant="outline"
          onClick={() => setQuestion_id(1)}
        >
          <span>بازگشت</span>
          <ArrowLeft />
        </Button>
      </CardFooter>
    </Card>




        <Card
          className={`w-[600px] h-[600px] ${
            question_id !== 3 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader className="flex">
            <CardTitle>نحوه برگزاری کلاس</CardTitle>
         
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col justify-start items-start py-4 box-border gap-4 h-full">
          <div className="flex justify-center items-center w-full gap-4">
          <div
              className={`flex w-full flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border ${
                checked
                  ? "opacity-100 pointer-events-none scale-110 "
                  : "opacity-50"
              }`}
            >
              <Code2 />
              <span>خصوصی</span>
            </div>

            <div className="flex items-center space-x-2 ">
              <Switch
                dir="ltr"
                onCheckedChange={(checked: boolean) => {
                  setChecked(checked);
                  setFormData(prev => ({...prev, is_private: checked}))
                }}
              />
            </div>

            <div
              className={`flex w-full flex-col shadow-md border rounded-md  items-center text-base transition-all duration-500 p-2 box-border ${
                checked
                  ? "opacity-50"
                  : "opacity-100 pointer-events-none scale-110"
              }`}
            >
              <GraduationCap />
              <span>عمومی</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-center ">

      <Label
        htmlFor="dropzone-file"
        className="flex  h-auto w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
        <div className="flex flex-col  items-center justify-center py-5 gap-5">
          <span>سرفصل های خود را ارسال کنید</span>
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
      {fileName && <p className="mt-4 text-sm text-gray-500">فایل آپلود شده: {fileName}</p>}
              {!fileName && <>
              
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX (MAX. 800x400px)</p>
              </>}
         
      <span>حداکثر حجم 15 مگابایت</span>

        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </Label>

    </div>
          </CardContent>

          <CardFooter className="flex gap-2 mt-4">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(4)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(2)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[600px] h-[600px] ${
            question_id !== 4 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader>
            <CardTitle>قیمت گذاری</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-4 border-t border-b h-full box-border py-2">
{/*    
            <div>
            
            </div> */}
            <Label htmlFor="قیمت خود را وارد کنید"></Label>
              <Input
                type="number"
                min={400000}
                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                placeholder="400000"
                className="h-20"
              />
              <span>دقت کنید به مبلغ فوق 20% برای حق کمیسیون اضافه میگردد</span>

           
             
          </CardContent>

          <CardFooter className="flex gap-2 mt-4">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(5)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(3)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[600px] h-auto ${
            question_id !== 5 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader>
            <CardTitle>جزئیات کلاس</CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col justify-center">
            <span>حد نصاب برای برگذاری کلاس</span>
          <Select onValueChange={(value: string) => setFormData(prev => ({ ...prev, class_size: value }))}>
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
          <div className="mt-5">
            <span>توضیحات خود را بنویسید</span>
            <Textarea onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} placeholder="توضیحات خود را بنویسید" className="h-40"/>
          </div>

          
          </CardContent>
          <CardFooter className="flex justify-between gap-4">

            <Button
              className="rounded-full flex-1"
              onClick={handleSubmit}
            >
              <Check />
              <span>ثبت پروژه</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(4)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="h-20 w-full flex items-center justify-center" dir="ltr">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`w-10 h-2 rounded-full ${
              index <= question_id - 1 ? "bg-blue-600 mx-1" : "bg-gray-400 mx-1"
            }`}
          ></div>
        ))}
      </div>

      {/* <Button onClick={handleUpload}>show data</Button> */}
    </div>
  );
};

export default NewProject;

