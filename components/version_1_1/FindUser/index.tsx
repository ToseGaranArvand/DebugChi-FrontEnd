"use client"
import { Ripple } from "@/components/ui/magicUI/Ripple"
import { useAppDispatch, useAppSelector } from "@/redux/store/store"
import { Avatar, Button, Spinner } from "@heroui/react"
import { useState, useRef, useEffect } from "react"
import coffee_1 from "@/public/lottie/coffee_1.json"
import coffee_2 from "@/public/lottie/coffee_2.json"
import { motion, AnimatePresence } from "framer-motion"
import { setFindUser } from "@/redux/slices/globalSlice"
import { setClearAi } from "@/redux/slices/aiSlice"
import { perform_get } from "@/lib/api"
import dynamic from "next/dynamic"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
type Props = {}
type LottieAnimation = Record<string, any>

// لیست کاربران فیک
const fakeUsers = [
  { image_profile: "https://i.pravatar.cc/150?u=a042581f4e29026024d", username: "AliDev" },
  { image_profile: "https://i.pravatar.cc/150?u=a04258a2462d826712d", username: "SaraCoder" },
  { image_profile: "https://i.pravatar.cc/150?u=a04258a2462d826704d", username: "RezaTech" },
  { image_profile: "https://i.pravatar.cc/150?u=a04258a2462d826705d", username: "NiloofarUI" },
  { image_profile: "https://i.pravatar.cc/150?u=a04258a2462d826707d", username: "MohammadJS" },
]

const FindUser = (props: Props) => {
  const { find_user } = useAppSelector((state) => state.gloabal)
  const dispatch = useAppDispatch()
  const [currentAnimation, setCurrentAnimation] = useState<LottieAnimation>(coffee_2)
  const [visibleUsers, setVisibleUsers] = useState<Array<(typeof fakeUsers)[0] & { id: number }>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [userCounter, setUserCounter] = useState(0)
  const [user,setUser] = useState<any>()
  useEffect(() => {
    if (find_user) {
      // Add new users every 1.5 seconds
      const interval = setInterval(() => {
        const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)]
        setVisibleUsers((prev) => [...prev, { ...randomUser, id: userCounter }])
        setUserCounter((prev) => prev + 1)

        // Keep only the last 5 users to avoid too many elements
        if (visibleUsers.length > 5) {
          setVisibleUsers((prev) => prev.slice(1))
        }
      }, 1500)

      const get = async ()=>{
        const response = await perform_get('auths/register/')
        setUser(response[0])
        console.log()
        setInterval(()=>{
          window.location.href = `/chat/${response[0].uuid}`
        },1500)
      }
      get()
      return () => clearInterval(interval)
    }
  }, [find_user, userCounter])

  const handleLottieClick = () => {
    setCurrentAnimation(currentAnimation === coffee_2 ? coffee_1 : coffee_2)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((err) => console.error("Audio playback failed:", err))
    }
  }

  // Get random horizontal position only
  const getRandomHorizontalPosition = () => {
    return Math.floor(Math.random() * 80) + 10 // between 10% and 90%
  }

  return (
    <>
      <div
        className={`${
          find_user ? "h-full p-4" : "max-h-0 h-0 overflow-hidden p-0"
        } absolute bottom-0 z-50 w-full bg-transparent box-border transition-all duration-500`}
      >
        <div className="w-full h-full rounded-xl bg-foreground-100 relative overflow-hidden">
          <div className="w-full h-3/5 absolute bottom-0 z-50 flex items-center justify-center box-border p-5">
            <div className="rounded-xl bg-foreground-100 flex flex-col items-center justify-start gap-4 w-full h-full box-border py-5">
              <div className="text-center font-mediumSans text-2xl">
                <span>{user && user.uuid ? 'در حال پیدا کردن برنامه نویس' : 'یک نفر برای شما پیدا شد' }</span>
                <span className="flex items-center justify-center gap-2 mt-2">{user && user.uuid ? 'درحال برقراری ارتباط' : 'برای شما هستیم'} </span>
                <Spinner variant="wave" color="primary" />
              </div>
              <motion.div
                className="w-52 h-52 mt-5 cursor-pointer"
                onClick={handleLottieClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnimation === coffee_1 ? "coffee1" : "coffee2"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Lottie animationData={currentAnimation} loop={true} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <Button
                variant="flat"
                color="danger"
                onPress={() => {
                  dispatch(setClearAi())
                  window.location.href = "/"
                  dispatch(setFindUser(false))
                }}
              >
                لغو
              </Button>
            </div>
          </div>

          {/* نمایش کاربران با انیمیشن از پایین به بالا */}
          <div className="absolute w-full h-full">
            <AnimatePresence>
              {visibleUsers.map((user) => {
                const leftPosition = getRandomHorizontalPosition()
                return (
                  <motion.div
                    key={user.id}
                    className="absolute flex items-center gap-2 p-2 backdrop-blur-lg z-[10]  shadow-md rounded-lg"
                    initial={{
                      bottom: "-10%",
                      left: `${leftPosition}%`,
                      opacity: 0,
                    }}
                    animate={{
                      bottom: ["0%", "20%", "40%", "60%", "80%", "100%"],
                      opacity: [1, 1, 1, 1, 0.7, 0],
                    }}
                    exit={{
                      bottom: "110%",
                      opacity: 0,
                    }}
                    transition={{
                      duration: 6,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      ease: "easeOut",
                    }}
                  >
                    <Avatar src={user.image_profile} name={user.username} />
                    <span className="text-sm font-medium">{user.username}</span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <Ripple animate={"true"} mainSize={100} top="50%" bg_color="bg-gray-500" />
        </div>
      </div>
    </>
  )
}

export default FindUser

