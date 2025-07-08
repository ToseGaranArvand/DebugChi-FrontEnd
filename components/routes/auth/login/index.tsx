"use client"
import { perform_post } from "@/lib/api"
import {
  Drawer,
  DrawerContent,
  useDisclosure,
  Form,
  Divider,
  Card,
  DrawerBody,
  Button,
  CardBody,
  Tabs,
  Tab,
  Link as HeroLink,
  Alert,
} from "@heroui/react"

import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { usePathname } from "next/navigation"
import { type FormEvent, useEffect, useState } from "react"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { showLogin, showSignUp } from "@/redux/slices/globalSlice"
import { ArrowLeft, CircleUserRound, Headset, Lock, Phone, UserCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Input from "@/components/version_1_1/ui/input"
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global"

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { login } = useAppSelector((state: RootState) => state.gloabal)
  const path = usePathname()

  // const query = useSearchParams();
  // const [selected, setSelected] = useState<string>("specialist")
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState({
    username: "",
    password: "",
    server: "",
  })

  const [showPasswordCustomer, setShowPasswordCustomer] = useState(false)
  const [showPasswordSpecialist, setShowPasswordSpecialist] = useState(false)
  

  useEffect(() => {
    if (login) {
      onOpen()
    }
  }, [login])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(new FormData(e.currentTarget))
    // console.log(selected, data)
    e.preventDefault()
    setIsLoading(true)

    Cookies.remove("token")
     const token = Cookies.get('token');
    const response = await perform_post("auths/login/", { ...data}
    );

    console.log(response)
    if (response.success && response.user) {
      Cookies.set("token", response.access)
      localStorage.setItem("user_data", JSON.stringify(response.user))
      window.location.href = path
      dispatch(showLogin({ show: false, path: "" }))
    } else {
      setError({
        ...error,
        server: response.error || "نام کاربری یا کلمه عبور نادرست است",
      })
      setIsLoading(false)
    }
  }

  return (
    <Drawer
      dir="rtl"
      hideCloseButton
      size="full"
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: { opacity: 1, x: 0, dur: 1 },
          exit: { x: 100, opacity: 0, dur: 1 },
        },
      }}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="relative overflow-hidden">
        {(onClose) => (
          <>
            <BackgroundGlobalGradient />
            <Button
              endContent={<ArrowLeft size={28} />}
              variant="light"
              isIconOnly
              size="lg"
              onPress={() => {
                dispatch(showLogin({ show: false, path: "" }))
                onClose()
              }}
              className="absolute left-4 top-2"
            ></Button>
            <DrawerBody className="h-screen">
              <div className="flex flex-col items-center justify-center h-full w-full ">
                <Card className="min-w-[500px] max-w-[600px] h-3/4 border border-default-100 bg-bg_card">
                  <CardBody className="overflow-hidden">
                  
                      <motion.div className="rounded-2xl w-full h-full flex items-center justify-center">
                          <Form
                            className="w-full flex flex-col min-h-[500px] items-center justify-center  px-5 rounded-lg"
                            onSubmit={handleSubmit}
                          >
                            <Input
                              startContent={<UserCircle color="gray" />}
                              isRequired
                              errorMessage={"اطلاعات وارد شده صحیح نمی باشد"}
                              label="نام کاربری"
                              labelPlacement="outside"
                              name="username"
                              size="lg"
                              placeholder="نام کاربری ، ایمیل یا شماره تلفن"
                              type="text"
                              variant="faded"
                              autoComplete="username"
                            />

                           
                            <div className="relative w-full">
                              <Input
                                startContent={<Lock color="gray" />}
                                isRequired
                                label="کلمه عبور"
                                labelPlacement="outside"
                                placeholder="کلمه عبور را وارد نمایید"
                                name="password"
                                size="lg"
                                type={showPasswordCustomer ? "text" : "password"}
                                autoComplete="current-password"
                                validate={(value) => {
                                  if (value.length < 8) {
                                    return "حداقل 8 کاراکتر باید وارد کنید"
                                  }
                                }}
                              />

                             
                              <button
                                type="button"
                                onClick={() => setShowPasswordCustomer(!showPasswordCustomer)}
                                className="absolute left-3 top-[38px] focus:outline-none"
                               style={{
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        zIndex: 10,
                                        top: "2.5rem", 
                                        left: "1rem",
                                      }}
                                aria-label={showPasswordCustomer ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                              >
                                {showPasswordCustomer ? (
                                  <EyeOff size={20} className="text-gray-400" />
                                ) : (
                                  <Eye size={20} className="text-gray-400" />
                                )}
                              </button>
                            </div>

                            <div className="w-full flex items-center justify-start my-2">
                              <Button
                                as={Link}
                                variant="light"
                                href={"/auth/forget-password/"}
                                className="text-tiny text-blue-500 underline"
                                onPress={() => {
                                  dispatch(showLogin({ show: false, path: "" }))
                                  onClose()
                                }}
                              >
                                بازیابی کلمه عبور؟
                              </Button>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                              <br />
                              <Button
                                isLoading={isLoading}
                                variant="solid"
                                className="bg-btn_primary"
                                type="submit"
                                size="lg"
                              >
                                ورود
                              </Button>

                              <div className="flex items-center justify-center w-full gap-4">
                                <Divider className="w-1/4" />
                                <span>یا</span>
                                <Divider className="w-1/4" />
                              </div>

                              <Button
                                as={HeroLink}
                                isDisabled={isLoading}
                                variant="faded"
                                size="lg"
                                onPress={() => {
                                  onClose()
                                  dispatch(showSignUp({ show: true, path: "" }))
                                }}
                              >
                                ثبت نام
                              </Button>
                            </div>
                            <div className="w-full">
                              {error.server && (
                                <Alert className="text-right" variant="flat" color="danger" title={error.server} />
                              )}
                            </div>
                          </Form>
                        </motion.div>
                  </CardBody>
                </Card>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
