"use client";
import type { UserLanguage } from "@/components/types/user.types"
import { perform_patch } from "@/lib/api"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ScrollShadow,
  Checkbox,
  useDisclosure,
  Textarea,
  addToast,
  ModalHeader, // Import ModalHeader
} from "@heroui/react"
import axios from "axios"
import { EditIcon, Plus, Search, Sparkle } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"
import { usePathname } from "next/navigation";

const LanguageSection = ({
  debugger_bio,
  languages,
}: {
  debugger_bio: string
  languages: UserLanguage[]
}) => {
  const [text, setText] = useState<string>(debugger_bio)
  const [rotations, setRotations] = useState<number[]>([])

    const currentPath = usePathname()
    const is_engineer = currentPath.startsWith("/engineers/")
  

useEffect(() => {
  const generated = languages.map(() => Math.floor(Math.random() * 21) - 10)
  setRotations(generated)
}, [languages])



  // Add custom animation styles
  const animationStyles = `
    @keyframes pulse-subtle {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
    .animate-pulse-subtle {
      animation: pulse-subtle 3s infinite ease-in-out;
    }
  `

  return (
    <div className="flex flex-col gap-8">
      <style jsx>{animationStyles}</style>

      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-white"></div>
        <h3 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
          زبان های برنامه نویسی که آشنایی دارم و توضیحات تکمیلی
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-3/4 mx-auto">
        <div className="flex flex-col h-full">
          <Card className="border-2 border-violet-900 h-full">
            <CardHeader className="bg-c_background/50 flex justify-between">
              <Chip color="secondary" variant="light" className="bg-black/40 text-tiny p-4">
                زبان های برنامه نویسی
              </Chip>
              {
                !is_engineer && <EditLanguageModal />
              }
            </CardHeader>
            <CardBody className="box-border p-5 bg-c_background/50 h-full">
              <div className="flex gap-4 flex-col w-full h-full bg-[#140b1b] box-border p-5 rounded-xl">
                <div className="w-full flex gap-4 box-border px-10">
                  <span>علاقه مند به</span>
                  <span>
                    <Sparkle className="stroke-amber-400" />
                  </span>
                </div>
                <div className="relative w-full h-full min-h-[220px]">
                  <div className="flex flex-wrap gap-3 p-2 justify-center">
                    {languages.map((item, index) => {
                      // Generate a unique key using index if id is not available
                      const uniqueKey = item.language_name?.id || `lang-${index}`

                      // Generate random rotation between -10 and 10 degrees
                      const rotation = rotations[index] ?? 0

                      return (
                        <div
                          key={uniqueKey}
                          className="transition-all duration-300 hover:scale-110 hover:z-20 m-2"
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: "center",
                            display: "inline-block",
                          }}
                        >
                          <Chip
                            className="border-b-2 shadow-lg cursor-pointer text-sm md:text-base whitespace-normal max-w-[150px] md:max-w-none animate-pulse-subtle hover:animate-none"
                            color="secondary"
                            variant="solid"
                          >
                            {item.language_name?.name} {item.language_name?.level}
                          </Chip>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col items-start h-full">
          <Card className="border-2 border-violet-900 h-full">
            <CardHeader className="bg-c_background/50 flex justify-between">
              <Chip color="secondary" variant="light" className="bg-black/40 text-tiny p-4">
                درباره من
              </Chip>
              {
                !is_engineer && <EditModal bio={debugger_bio} text={text} setText={setText} />  
              }
            </CardHeader>
            <CardBody className="box-border p-5 bg-c_background/50 h-full">
              <div className="flex gap-4 flex-col w-full h-full bg-[#140b1b] box-border p-5 rounded-xl">
                <p className="text-justify leading-10">{text}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LanguageSection

// Modal component for editing languages
interface EditLanguageModalProps {
  initialSelectedLanguages?: any[]
  onSave?: (languages: any[]) => void
}

const EditLanguageModal = ({ initialSelectedLanguages = [], onSave }: EditLanguageModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>(initialSelectedLanguages)
  const [languages, setLanguages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/programming-languages/")

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        setLanguages(data)
      } catch (err) {
        console.error("Failed to fetch programming languages:", err)
        setError("Failed to load programming languages. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch when modal opens
    if (isOpen) {
      fetchLanguages()
    }
  }, [isOpen])

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => lang.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [languages, searchQuery])

  // Check if a language is already selected
  const isLanguageSelected = (id: string) => {
    return selectedLanguages.some((lang) => lang.id === id)
  }

  // Toggle language selection
  const toggleLanguage = (language: {
    id: string
    name: string
    level: string
  }) => {
    if (isLanguageSelected(language.id)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang.id !== language.id))
    } else {
      setSelectedLanguages([
        ...selectedLanguages,
        {
          id: language.id,
          language_name: {
            id: language.id,
            name: language.name,
            level: language.level,
          },
        },
      ])
    }
  }

  const removeLanguage = (id: string) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang.id !== id))
  }

  const postLanguage = async (item: any, token: any) => {
    return axios.post(
      "http://localhost:8000/api/v1/add_language/",
      {
        language_id: item.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
  }

  const handleSave = async () => {
    const token = Cookies.get("token")

    for (const item of selectedLanguages) {
      try {
        const response = await postLanguage(item, token)
        console.log("Posted:", response.data)
      } catch (error) {
        console.error("Error posting language:", item.id, error)
      }
    }

    if (onSave) {
      onSave(selectedLanguages)
    }
    onOpenChange()
  }

  return (
    <>
      <Button startContent={<Plus size={14} />} variant="solid" color="secondary" onPress={onOpen}>
        ویرایش زبان ها
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside" suppressHydrationWarning>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ویرایش زبان های برنامه نویسی</ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4">
                  {/* Search input */}
                  <Input
                    placeholder="جستجوی زبان برنامه نویسی..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    startContent={<Search size={16} />}
                    onClear={() => setSearchQuery("")}
                  />

                  {/* Selected languages chips */}
                  {selectedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-2 border border-gray-700 rounded-lg bg-[#1a0f24]">
                      {selectedLanguages.map((lang) => (
                        <Chip
                          key={lang.id || `selected-${lang.language_name?.name}`}
                          onClose={() => removeLanguage(lang.id)}
                          variant="flat"
                          color="secondary"
                          className="transition-all hover:scale-105 m-1 text-sm"
                          size="sm"
                        >
                          {lang.language_name?.name} {lang.language_name?.level && `(${lang.language_name.level})`}
                        </Chip>
                      ))}
                    </div>
                  )}

                  {/* Languages list */}
                  <ScrollShadow className="h-[300px]">
                    <div className="flex flex-col gap-2">
                      {isLoading ? (
                        <div className="text-center p-4">در حال بارگذاری...</div>
                      ) : error ? (
                        <div className="text-center p-4 text-red-500">{error}</div>
                      ) : filteredLanguages.length > 0 ? (
                        filteredLanguages.map((language) => (
                          <div
                            key={language.id}
                            className={`
                              flex items-center justify-between p-3 rounded-lg cursor-pointer
                              ${
                                isLanguageSelected(String(language.id))
                                  ? "bg-secondary/20"
                                  : "bg-[#140b1b] hover:bg-[#1a0f24]"
                              }
                              transition-all duration-200
                            `}
                            onClick={() =>
                              toggleLanguage({
                                id: String(language.id),
                                level: language.level,
                                name: language.name,
                              })
                            }
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                isSelected={isLanguageSelected(String(language.id))}
                                color="secondary"
                                onChange={() =>
                                  toggleLanguage({
                                    id: String(language.id),
                                    level: language.level,
                                    name: language.name,
                                  })
                                }
                              />
                              <span>{language.name}</span>
                            </div>
                            <Chip size="sm" variant="flat" color="secondary">
                              {language.level}
                            </Chip>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-4 text-gray-400">زبان برنامه نویسی مورد نظر یافت نشد</div>
                      )}
                    </div>
                  </ScrollShadow>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="secondary" onPress={handleSave}>
                  ذخیره تغییرات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const EditModal = ({
  bio,
  text,
  setText,
}: {
  bio: string
  text: string
  setText: (text: string) => void
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [changeText, setChangeText] = useState<string>(bio)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const editHandler = async () => {
    const respone = await perform_patch(`auths/register/${1}/`, {
      debugger_bio: text,
    })
    console.log(respone)
    if (respone) {
      onClose()
      addToast({
        title: "ویرایش بایو",
        description: "ویرایش بایو با موفقیت انجام شد",
        color: "success",
        variant: "flat",
      })
      setText(changeText)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      addToast({
        title: "ویرایش بایو",
        description: "با خطا موجه شد دوباره اقدام کنید",
        color: "danger",
        variant: "flat",
      })
    }
  }

  return (
    <>
      <Button variant="solid" color="secondary" onPress={onOpen} startContent={<EditIcon size={14} />}>
        ویرایش
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} dir="rtl" suppressHydrationWarning>
        <ModalContent>
          <ModalHeader>ویرایش بایو</ModalHeader>
          <ModalBody>
            <Textarea
              minRows={4}
              maxRows={10}
              onValueChange={(value) => setChangeText(value)}
              defaultValue={changeText}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              color="secondary"
              onPress={editHandler}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              ثبت
            </Button>
            <Button variant="bordered" color="danger" onPress={onClose}>
              لغو
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
