"use client"
import { Button, Spinner } from "@heroui/react" // Spinner برای لودر اضافه شد
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { formatCurrency } from "@/utils/tools"
import { useRouter } from "next/navigation"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { setShowNewRequest } from "@/redux/slices/globalSlice"
import type {
  Main,
  PendingConsult,
  PendingDebug,
  PendingPrivateClass,
  Consult,
} from "@/components/types/incomingRequest"

type Props = {};

const NewRequestIncoming = (props: Props) => {
  const router = useRouter();
  const { showNewRequest } = useAppSelector(
    (state: RootState) => state.gloabal
  );
  const dispatch = useAppDispatch();
  const [pendingList, setPendingList] = useState<Main>({
    pending_consult: [],
    pending_debug: [],
    pending_private_class: [],
  })
  
  
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const is_online = Cookies.get("is_online");
    if (is_online === "true") {
      dispatch(setShowNewRequest(true));
    }

    const fetchData = async () => {
    
      setIsLoading(true)
      
      const token = Cookies.get("token")
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`${process.env.server}/api/v1/debug/get_pending_session/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()

        const showDebug = Cookies.get("debug") === "true"
        const showConsult = Cookies.get("moshavere") === "true"
        const showPrivateClass = Cookies.get("private_class") === "true"
        
        const filteredDebug = showDebug ? data.pending_debug || [] : []
        const filteredConsult = showConsult ? data.pending_consult || [] : []
        const filteredPrivateClassList = showPrivateClass ? data.pending_private_class || [] : []

        const enhancedData: Main = {
          pending_debug: filteredDebug,
          pending_consult: filteredConsult,
          pending_private_class: filteredPrivateClassList.map((item: PendingPrivateClass) => ({
            ...item,
            session_id: item.id.toString(),
          })),
        }
        
        setPendingList(enhancedData)

      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
       
        setIsLoading(false)
      }
    };

    if (showNewRequest) {
      fetchData() 
      
      const intervalId = setInterval(fetchData, 60000) 
    

      return () => clearInterval(intervalId)
    } else {
      setIsLoading(false)
    }
  }, [showNewRequest, dispatch])

  return (
    <>
      {showNewRequest && (
        <div dir="rtl" className="bg-[#1F1F1F] rounded-2xl">
        
          <RequestCard data={pendingList} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default NewRequestIncoming;


const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-4 w-full box-border p-10 rounded-3xl">
    <Spinner label="در حال بارگذاری درخواست‌ها..." color="primary" labelColor="primary" />
  </div>
)


const RequestCard = ({ data, isLoading }: { data: Main; isLoading: boolean }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()


  if (isLoading) {
    return <Loader />
  }
 

  const isDebug = (item: any): item is PendingDebug => "debuger_applicator" in item && "file" in item
  const isConsult = (item: any): item is PendingConsult => "consult_applicator" in item && "language" in item
  const isPrivateClass = (item: any): item is PendingPrivateClass => "private_class_applicator" in item && "framework" in item

  const pendingList = [
    ...(data.pending_debug || []),
    ...(data.pending_consult || []),
    ...(data.pending_private_class || []),
  ]

  if (pendingList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full box-border p-10 rounded-3xl">
        <span className="text-gray-400 text-base">
          در حال حاضر هیچ درخواستی برای شما وجود ندارد.
        </span>
        <p className="text-gray-500 text-sm">لطفاً از فعال بودن تسک‌های منتخب در بخش تنظیمات اطمینان حاصل کنید.</p>
      </div>
    );
  }

  const handleAccept = async (sessionId: string) => {
    setLoadingId(sessionId);
    await router.push(`/chat/${sessionId}`);
  };

  return pendingList.map((item) => {
    let user: Consult, tag: string

    if (isDebug(item)) {
      user = item.debuger_applicator
      tag = "# دیباگ"
    } else if (isConsult(item)) {
      user = item.consult_applicator
      tag = "# مشاوره"
    } else if (isPrivateClass(item)) {
      user = item.private_class_applicator
      tag = "# کلاس خصوصی"
    } else {
      user = {} as Consult
      tag = ""
    }

    return (
      <div key={item.session_id} className="pt-4">
        <div className="flex flex-col w-3/4 mx-auto mb-4 mt-2 bg-[#181818] rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-3 md:p-4 rounded-t-2xl bg-[linear-gradient(124.51deg,_#0F0F0F_27.72%,_#000A1B_159.39%)] border-2 border-[#1F1F1F]">
            <div className="text-right">
              <div className="text-[#0EE520] text-xs md:text-sm font-bold">{tag}</div>
              {isPrivateClass(item) && item.level && (
                <div className="text-[#FFD700] text-xs mt-1">سطح: {item.level}</div>
              )}
            </div>
            <span className="text-white text-xs md:text-sm font-bold mr-2">{formatCurrency(item.price)}</span>
          </div>
          <div className="p-4 md:p-5 space-y-3">
            <h1 className="text-white text-sm md:text-base font-bold text-right leading-tight">{item.title}</h1>
            <div className="text-gray-300 text-xs md:text-sm leading-relaxed pb-2 text-right">
              <p>{item.description}</p>
            </div>
            {isPrivateClass(item) && (
              <div className="flex flex-wrap gap-2 mt-2 justify-end">
                <div className="bg-[#2A2A2A] px-2 py-1 rounded text-xs">زبان: {item.language}</div>
                {item.framework && <div className="bg-[#2A2A2A] px-2 py-1 rounded text-xs">فریمورک: {item.framework}</div>}
                <div className="bg-[#2A2A2A] px-2 py-1 rounded text-xs">مدت: {item.time} دقیقه</div>
              </div>
            )}
            {isConsult(item) && (
              <div className="flex justify-end">
                <div className="bg-[#2A2A2A] px-2 py-1 rounded text-xs">زبان: {item.language}</div>
              </div>
            )}
            {isDebug(item) && (
              <div className="flex justify-between items-center pt-2">
                <div className="text-gray-400 text-xs">مدت: {item.time} دقیقه</div>
                <div className="text-gray-400 text-xs">حالت: {item.mode === "chat" ? "چت" : "تماس"}</div>
              </div>
            )}
            <div
              className="w-full my-3"
              style={{
                height: "0.10px",
                border: "0.10px solid",
                borderImageSource: "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.27) 53.37%, rgba(255, 255, 255, 0) 100%)",
                borderImageSlice: 1,
              }}
            ></div>
            <div className="flex justify-center">
              <Button
                className="w-3/4 mx-auto bg-[#4A9909] hover:bg-green-600 text-white text-center font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-xs md:text-sm"
                isLoading={loadingId === item.session_id}
                onPress={() => handleAccept(item.session_id)}
              >
                {loadingId === item.session_id
                  ? "درحال برقراری ارتباط"
                  : "بررسی خدمات"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  })
}