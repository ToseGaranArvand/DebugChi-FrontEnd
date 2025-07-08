"use client"

import { useState, useRef } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
  Input,
  Textarea,
} from "@heroui/react"
import { Plus } from "lucide-react"

export default function UploadResume() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const targetRef = useRef(null)
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen })

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    cv_file: null,
    user: null,
  })

  // File input refs
  const imageInputRef = useRef(null)
  const cvInputRef = useRef(null)

  // File names
  const [imageName, setImageName] = useState("")
  const [cvFileName, setCvFileName] = useState("")

  // Loading state
  const [isLoading, setIsLoading] = useState(false)

  // Handle text input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file input changes
  const handleFileChange = (e: any) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))

      if (name === "image") {
        setImageName(files[0].name)
      } else if (name === "cv_file") {
        setCvFileName(files[0].name)
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (onClose: any) => {
    setIsLoading(true)

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("description", formData.description)

      if (formData.image) {
        data.append("image", formData.image)
      }
      if (formData.cv_file) {
        data.append("cv_file", formData.cv_file)
      }
      if (formData.user) {
        data.append("user", formData.user)
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      if (response.ok) {
        // Reset form and close modal
        setFormData({
          title: "",
          description: "",
          image: null,
          cv_file: null,
          user: null,
        })
        setImageName("")
        setCvFileName("")
        onClose()
      } else {
        console.error("Upload failed")
      }
    } catch (error) {
      console.error("Error uploading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        radius="full"
        className="w-16 h-16"
        size="lg"
        variant="bordered"
        color="warning"
        isIconOnly
        onPress={onOpen}
        startContent={<Plus color="orange" />}
      ></Button>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 text-right">
                آپلود اطلاعات
              </ModalHeader>
              <ModalBody className="text-right">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">عنوان</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="عنوان را وارد کنید"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">توضیحات</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="توضیحات را وارد کنید"
                      className="w-full"
                      rows={4}
                    />
                  </div>

                  {/* انتخاب تصویر */}
                  <div>
                    <label className="block text-sm font-medium mb-1">تصویر</label>
                    <div className="relative">
                      <input
                        type="file"
                        ref={imageInputRef}
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full rounded-md border border-dashed border-gray-400 p-3 cursor-pointer hover:bg-gray-100 text-gray-600"
                      >
                        {imageName ? `فایل انتخاب شده: ${imageName}` : "عکس خود را انتخاب کنید"}
                      </label>
                    </div>
                  </div>

                  {/* انتخاب فایل رزومه */}
                  <div>
                    <label className="block text-sm font-medium mb-1">فایل رزومه</label>
                    <div className="relative">
                      <input
                        type="file"
                        ref={cvInputRef}
                        name="cv_file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center w-full rounded-md border border-dashed border-gray-400 p-3 cursor-pointer hover:bg-gray-100 text-gray-600"
                      >
                        {cvFileName ? `فایل انتخاب شده: ${cvFileName}` : "فایل رزومه خود را انتخاب کنید"}
                      </label>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} disabled={isLoading}>
                  انصراف
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSubmit(onClose)}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "در حال آپلود..." : "ارسال"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
