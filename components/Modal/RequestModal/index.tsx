"use client"
import { setShowRequest, showMoreRequest } from "@/redux/slices/globalSlice"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { formatCurrency } from "@/utils/tools"
import { useState, useEffect } from "react"
import { Clock, ListFilter, Tag, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button, Input } from "@heroui/react"

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
          <span className="text-sm text-white">{getTitle()}</span>
          <span className="text-gray-400 text-xs">به صرفه</span>
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
        <Button variant="ghost" className="flex gap-2 text-white" onClick={onMoreOptions}>
          <ListFilter className="h-4 w-4" />
          گزینه های بیشتر
        </Button>
      </div>
      <div className="flex bg-[#2b2839] box-border px-4 items-center justify-center rounded-lg">
        <Input
          className="border-b border-t-0 border-x-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
          placeholder="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          startContent={<Tag className="h-4 w-4 mr-2 text-gray-400" />}
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
      <Button
        variant="bordered"
        size="sm"
        isIconOnly
        startContent={<Clock className="h-4 w-4" />}
        className="bg-blue-500 text-white border-blue-500"
      ></Button>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onPress={onSubmit}>
          {requestMode}
        </Button>
        <Button className="bg-red-500 text-white hover:bg-red-600" onPress={close}>
          لغو
        </Button>
      </div>
    </div>
  )
}

const RequestModal = () => {
  const { showRequest } = useAppSelector((state: RootState) => state.gloabal)
  const dispatch = useAppDispatch()

  const prices = {
    chat: 600000,
    audio: 500000,
    video: 400000,
  }

  const [requestData, setRequestData] = useState<RequestData>({
    type: "chat",
    price: prices.chat,
    discountCode: "",
    moreOptions: false,
    timestamp: new Date().toISOString(),
  })

  useEffect(() => {
    setRequestData((prev) => ({
      ...prev,
      timestamp: new Date().toISOString(),
    }))
  }, [requestData.type, requestData.discountCode, requestData.moreOptions])

  useEffect(() => {
    console.log("Request Data:", requestData)
  }, [requestData])

  const closeHandler = () => {
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
    console.log("Submitting request:", requestData)
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
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger value="chat" className="text-white data-[state=active]:bg-blue-500">
                چت
              </TabsTrigger>
              <TabsTrigger value="audio" className="text-white data-[state=active]:bg-blue-500">
                صوتی
              </TabsTrigger>
              <TabsTrigger value="video" className="text-white data-[state=active]:bg-blue-500">
                تصویری
              </TabsTrigger>
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
