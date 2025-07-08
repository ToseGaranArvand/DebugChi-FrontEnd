"use client"

import { setShowRequest, showMoreRequest } from "@/redux/slices/globalSlice"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { formatCurrency } from "@/utils/tools"
import { useState, useEffect } from "react"
import { Clock, ListFilter, Tag, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button, Input } from "@heroui/react"
import { socket } from "@/config/socket-config"

type RequestType = "chat" | "audio" | "video"

interface RequestData {
  type: RequestType
  price: number
  discountCode: string
  moreOptions: boolean
  timestamp: string
}

const PriceBox = ({ price, type }: { price: number; type: RequestType }) => {
  const getTitle = () => {
    switch (type) {
      case "chat":
        return "مشاوره"
      case "audio":
        return "تماس صوتی"
      case "video":
        return "تماس تصویری"
      default:
        return "مشاوره"
    }
  }

  return (
    <div className="w-full h-20 bg-[#2b2839] box-border px-4 rounded-lg flex items-center justify-center">
      <div className="flex-1 flex items-center justify-start h-full gap-2">
        <User size={48} />
        <div className="flex flex-col gap-2">
          <span className="text-sm">{getTitle()}</span>
          <span className="text-foreground-500 text-xs">به صرفه</span>
        </div>
      </div>
      <div className="w-auto h-full flex items-center justify-center">
        <span className="text-white">{formatCurrency(price)}</span>
      </div>
    </div>
  )
}

const OptionRequest = ({
  discountCode,
  setDiscountCode,
  onMoreOptions,
}: {
  discountCode: string
  setDiscountCode: (code: string) => void
  onMoreOptions: () => void
}) => {
  return (
    <div className="w-full h-20 box-border rounded-lg grid grid-cols-2 gap-x-2">
      <div className="flex bg-[#2b2839] items-center justify-center rounded-lg">
        <Button variant="ghost" className="flex gap-2" onClick={onMoreOptions}>
          <ListFilter className="h-4 w-4" />
          گزینه های بیشتر
        </Button>
      </div>
      <div className="flex bg-[#2b2839] box-border px-4 items-center justify-center rounded-lg">
        <Input
          className="border-b border-t-0 border-x-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          startContent={<Tag className="h-4 w-4 mr-2" />}
        />
      </div>
    </div>
  )
}

const SubmitRequest = ({
  requestMode,
  close,
  onSubmit,
}: {
  requestMode: string
  close: () => void
  onSubmit: () => void
}) => {
  return (
    <div className="w-full h-20 gap-4 box-border rounded-lg flex items-center justify-center">
      <Button variant="bordered" size="sm" isIconOnly startContent={
        <Clock className="h-4 w-4" />

      } className="bg-primary text-primary-foreground">
      </Button>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onPress={onSubmit}>
          {requestMode}
        </Button>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onPress={close}>
          لغو
        </Button>
      </div>
    </div>
  )
}

const RequestModal = () => {
  const { showRequest } = useAppSelector((state: RootState) => state.gloabal)
  const dispatch = useAppDispatch()

  // Define prices for each request type
  const prices = {
    chat: 600000,
    audio: 500000,
    video: 400000,
  }

  // State to track all form data
  const [requestData, setRequestData] = useState<RequestData>({
    type: "chat",
    price: prices.chat,
    discountCode: "",
    moreOptions: false,
    timestamp: new Date().toISOString(),
  })

  // Update timestamp whenever form data changes
  useEffect(() => {
    setRequestData((prev) => ({
      ...prev,
      timestamp: new Date().toISOString(),
    }))
  }, [requestData.type, requestData.discountCode, requestData.moreOptions])

  // Log the current state whenever it changes
  useEffect(() => {

    


    console.log("Request Data:", requestData)
  }, [requestData])

  const closeHandler = () => {
    // socket.emit("hello")
    // Replace with a meaningful condition or remove if unnecessary
    if (false) {     
      dispatch(setShowRequest(false))
    }
  }

  const handleTabChange = (value: string) => {
    setRequestData({
      ...requestData,
      type: value as RequestType,
      price: prices[value as RequestType],
    })
  }

  const handleDiscountCodeChange = (code: string) => {
    setRequestData({
      ...requestData,
      discountCode: code,
    })
  }

  const handleMoreOptions = () => {
    dispatch(showMoreRequest(true))
    setRequestData({
      ...requestData,
      moreOptions: true,
    })
  }

  const handleSubmit = () => {
    // Log the final data before submission
    console.log("Submitting request:", requestData)

    // Here you can add API calls or other submission logic

    // Close the modal after submission
    closeHandler()
  }

  const getRequestMode = () => {
    switch (requestData.type) {
      case "chat":
        return "درخواست مشاوره و چت"
      case "audio":
        return "درخواست تماس صوتی"
      case "video":
        return "درخواست تماس تصویری"
      default:
        return "درخواست مشاوره"
    }
  }

  return (
    <div
      dir="rtl"
      className={`${
        showRequest ? "min-h-[340px] w-full bg-[#232035] rounded-tr-lg rounded-tl-lg" : "w-full h-0 opacity-0"
      } absolute bottom-0 z-30 transition-all duration-500`}
    >
      {showRequest && (
        <div className="flex w-2/4 flex-col mx-auto">
          <Tabs defaultValue="chat" className="w-full" onValueChange={handleTabChange} value={requestData.type}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">چت</TabsTrigger>
              <TabsTrigger value="audio">صوتی</TabsTrigger>
              <TabsTrigger value="video">تصویری</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex flex-col gap-4">
              <PriceBox price={prices.chat} type="chat" />
              <OptionRequest
                discountCode={requestData.discountCode}
                setDiscountCode={handleDiscountCodeChange}
                onMoreOptions={handleMoreOptions}
              />
              <SubmitRequest requestMode="درخواست مشاوره و چت" close={closeHandler} onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="audio" className="flex flex-col gap-4">
              <PriceBox price={prices.audio} type="audio" />
              <OptionRequest
                discountCode={requestData.discountCode}
                setDiscountCode={handleDiscountCodeChange}
                onMoreOptions={handleMoreOptions}
              />
              <SubmitRequest requestMode="درخواست تماس صوتی" close={closeHandler} onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="video" className="flex flex-col gap-4">
              <PriceBox price={prices.video} type="video" />
              <OptionRequest
                discountCode={requestData.discountCode}
                setDiscountCode={handleDiscountCodeChange}
                onMoreOptions={handleMoreOptions}
              />
              <SubmitRequest requestMode="درخواست تماس تصویری" close={closeHandler} onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

export default RequestModal
