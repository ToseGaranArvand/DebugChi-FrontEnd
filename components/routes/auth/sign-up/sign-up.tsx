"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import SignUpForm from "./sign-up-form"
import * as motion from "motion/react-client"
import { useEffect } from "react"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { showLogin, showSignUp } from "@/redux/slices/globalSlice"
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global"
import Button from "@/components/version_1_1/ui/button"

export default function SignUp() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { sign_up } = useAppSelector((state: RootState) => state.gloabal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sign_up) {
      onOpen()
    }
  }, [sign_up])

  const closeHandler = () => {
    onClose()
    dispatch(showLogin({ show: true, path: "" }))
  }

  return (
    <Drawer
      dir="rtl"
      hideCloseButton
      size="full"
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            dur: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            dur: 0.3,
          },
        },
      }}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="relative overflow-hidden">
        {(onClose) => (
          <>
            <BackgroundGlobalGradient />
            <DrawerHeader className="flex gap-1 items-center relative mt-2 sm:mt-5 px-4 sm:px-6">
              <Button
                endContent={<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
                variant="light"
                color="default"
                isIconOnly
                onPress={() => {
                  dispatch(showSignUp({ show: false, path: "" }))
                  onClose()
                }}
                className="absolute left-2 sm:left-5 w-8 h-8 sm:w-10 sm:h-10"
              />
            </DrawerHeader>
            <DrawerBody className="flex items-center justify-center px-4 sm:px-6 py-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className="w-full max-w-[500px] min-h-[400px] sm:min-h-[600px] rounded-lg border border-default-100 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <SignUpForm switchToLogin={closeHandler} />
              </motion.div>
            </DrawerBody>
            <DrawerFooter className="px-4 sm:px-6" />
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
