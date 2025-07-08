"use client"

import type { UserPortfolio } from "@/components/types/user.types"
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Textarea,
  addToast,
} from "@heroui/react"
import { ChevronLeft, ChevronRight, FilePlus2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef, type TouchEvent } from "react"
import PorfolioImageUploader from "./PortfolioImageUploader"
import axios from "axios"
import { perform_post } from "@/lib/api"

const ProjectPortofolio = ({
  data,
  user_id,
}: {
  data: UserPortfolio[]
  user_id: number
}) => {
  const [portfolio, setPortfolio] = useState<UserPortfolio[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    setPortfolio(data)
  }, [data])

  // Handle touch start event
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  // Handle touch move event
  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  // Handle touch end event
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && !isAnimating) {
      nextSlide()
    }

    if (isRightSwipe && !isAnimating) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    if (portfolio.length === 0) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex >= portfolio.length ? 0 : prevIndex + 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match transition duration
  }

  const prevSlide = () => {
    if (portfolio.length === 0) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? portfolio.length : prevIndex - 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match transition duration
  }

  const goToSlide = (index: number) => {
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Calculate visible items based on screen size
  const getVisibleItems = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const visibleItems = getVisibleItems()

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && portfolio.length > 0) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [portfolio.length, isAnimating])

  if (portfolio.length === 0) {
    return (
      <div className="w-full h-full py-8 border border-dashed border-slate-700 flex flex-col items-center justify-center gap-3 rounded-3xl box-border">
        <AddNewPortfolio user_id={user_id} portfolio={portfolio} setPortfolio={setPortfolio} />
        <span>نمونه کار جدید</span>
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {/* Slider container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${currentIndex * (100 / visibleItems) * -1}%)`,
            width: `${(portfolio.length + 1) * (100 / visibleItems)}%`,
          }}
        >
          {/* Portfolio items */}
          {portfolio.map((item, index) => (
            <div
              key={item.id}
              className="min-h-[400px] relative overflow-hidden px-1"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="h-full rounded-3xl overflow-hidden">
                <Image src={item.images[0].image || "/placeholder.svg"} alt="image" fill className="object-cover" />
                <div className="w-full flex justify-between items-center box-border px-4 absolute bottom-0 h-20 bg-black bg-opacity-70">
                  <ShowPortfolioDetails data={item} />
                  <span className="text-white">{item.name}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add new portfolio item */}
          <div className="px-1" style={{ width: `${100 / visibleItems}%` }}>
            <div className="w-full h-full min-h-[400px] rounded-3xl border border-dashed border-default-100 flex flex-col items-center justify-center gap-4">
              <AddNewPortfolio user_id={user_id} portfolio={portfolio} setPortfolio={setPortfolio} />
              <span>نمونه کار جدید</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition-all"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition-all"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 gap-2">
        {portfolio.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-secondary" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
        <button
          onClick={() => goToSlide(portfolio.length)}
          className={`w-3 h-3 rounded-full transition-all ${
            currentIndex === portfolio.length ? "bg-secondary" : "bg-gray-300"
          }`}
          aria-label="Go to add new slide"
          disabled={isAnimating}
        />
      </div>
    </div>
  )
}

export default ProjectPortofolio

export const ShowPortfolioDetails = ({ data }: { data: UserPortfolio }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button variant="light" color="secondary" onPress={onOpen}>
        مشاهده
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="full">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">{data.name}</DrawerHeader>
              <DrawerBody>
                <div className="flex w-full h-full gap-4 relative">
                  <div className="flex-1 flex flex-col box-border gap-4 overflow-y-auto rounded-3xl scrollbar-left">
                    {data.images.map((image) => {
                      return (
                        <div key={image.id} className="relative w-full min-h-[900px] rounded-lg">
                          <Image src={image.image || "/placeholder.svg"} alt={data.name} fill objectFit="cover" />
                        </div>
                      )
                    })}
                  </div>
                  <div className="w-[500px]">
                    <p className="text-right whitespace-pre-line">{data.description}</p>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const AddNewPortfolio = ({
  user_id,
  portfolio,
  setPortfolio,
}: {
  user_id: number
  portfolio: UserPortfolio[]
  setPortfolio: (portfolio: UserPortfolio[]) => void
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [images, setImages] = useState<any[]>([])
  const [data, setData] = useState<any>({
    name: "",
    description: "",
  })

  const createImageProject = async (id: number) => {
    console.log(id)
    try {
      const promises = images.map((data) =>
        axios.post(
          `${process.env.server}/api/v1/user_portfolio_image/`,
          {
            image: data.file,
            user_portfolio: id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        ),
      )

      const results = await Promise.all(promises)

      results.forEach((res, index) => {
        console.log(`Success [${index}]:`, res.data)
      })
      return results
    } catch (error) {
      console.error("One or more requests failed:", error)
    }
  }

  const createPortfolio = async () => {
    const response = await perform_post("api/v1/user_portfolio/", {
      ...data,
      owner: user_id,
    })

    if (response && response.id) {
      await createImageProject(response.id)

      // Get the complete portfolio item after images are uploaded
      const fullData = await axios.get(`${process.env.server}/api/v1/user_portfolio/${response.id}/`)

      if (fullData.data) {
        addToast({
          title: "success",
          description: "added successfully",
          color: "success",
        })

        // Update state with the new portfolio item
        setPortfolio([...portfolio, fullData.data])
        onClose()
      }
    } else if (response?.status === 400) {
      console.log(response.data)
    }
  }

  return (
    <>
      <Button
        variant="flat"
        isIconOnly
        radius="full"
        startContent={<FilePlus2 />}
        size="lg"
        onPress={onOpen}
        color="secondary"
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">نمونه کار جدید</ModalHeader>
              <ModalBody className="flex flex-col">
                <PorfolioImageUploader setImages={setImages} />
                <Input
                  type="text"
                  onValueChange={(value) => {
                    setData({ ...data, name: value })
                  }}
                />

                <Textarea
                  onValueChange={(value) => {
                    setData({ ...data, description: value })
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="primary" onPress={createPortfolio}>
                  اضافه کردن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
