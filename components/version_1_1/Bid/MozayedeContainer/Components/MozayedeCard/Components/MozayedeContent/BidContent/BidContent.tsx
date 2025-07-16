// base
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// components
import { SuggestedAmounts } from "./SuggestedAmounts/SuggestedAmounts";
// core
import { Input } from "@/components/ui/input";
import { Bid, CreatedBy } from "@/components/types/tender.type";
import { addToast, Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { showLogin } from "@/redux/slices/globalSlice";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { perform_post, perform_update } from "@/lib/api";

const submitBid = async (
  action: "submit" | "update",
  tender_id: number,
  price: number,
  userData: CreatedBy,
  setBidsList: Dispatch<SetStateAction<Bid[]>>,
  dispatch: Dispatch<any>,
  pathname: string
) => {
  const token = Cookies.get("token");
  if (!token) {
    dispatch(showLogin({ show: true, path: pathname }));
    return;
  }

  const payload = {
    tender: tender_id,
    amount: price.toString(),
  };

  try {
    let response;

    if (action === "submit") {
      response = await perform_post("api/v1/submit_bid/", payload, token);
      if (response.success) {
        const newBid: Bid = {
          user: userData || "",
          id: Date.now(), // شناسه موقت برای UI
          amount: price.toString(),
          created_at: new Date(),
          updated_at: new Date(),
          tender: 0,
          status: false,
        };
        setBidsList((prevBids) => [...prevBids, newBid]);
        addToast({
          title: "درخواست شما ثبت شد",
          description: response.message,
          color: "success",
        });
      } else if (response.status === 400) {
        addToast({
          title: "درخواست شما ثبت نشد",
          description: response.data.message,
          color: "danger",
        });
      }
    }

    if (action === "update") {
      response = await perform_update("api/v1/submit_bid/", payload);
      if (response.success) {
        setBidsList((prevBids) =>
          prevBids.map((item) =>
            item.user.uuid === userData?.uuid
              ? { ...item, amount: price.toString(), updated_at: new Date() }
              : item
          )
        );
        addToast({
          title: "درخواست شما بروزرسانی شد",
          description: response.message,
          color: "success",
        });
      }
    }
  } catch (error) {
    console.error("خطا در ارسال پیشنهاد:", error);
    addToast({
      title: "خطا در ارتباط با سرور",
      description: "لطفاً اتصال اینترنت خود را بررسی کنید",
      color: "danger",
    });
  }
};

const BidContent: FC<{ bids: Bid[]; start_bid: number }> = ({
  bids,
  start_bid,
}) => {
  const suggestedAmounts = [start_bid + 1000000, start_bid + 1500000];
  const [inputVal, setInputVal] = useState<number>(450000);
  const [userData, setUserData] = useState<any>(null);
  const [bidsList, setBidsList] = useState<Bid[]>(bids);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);
  const handleSubmit = () => {
    if (!userData) return;

    // بررسی اینکه آیا کاربر قبلاً پیشنهادی داده
    const isAlreadyBid = bidsList.some(
      (item) => item.user.uuid === userData.uuid
    );
    const action: "submit" | "update" = isAlreadyBid ? "update" : "submit";

    const tenderId = bidsList[0]?.tender; // چون مزایده‌ها برای یک مزایده خاص هستن

    if (tenderId) {
      submitBid(
        action,
        tenderId,
        inputVal,
        userData,
        setBidsList,
        dispatch,
        pathname
      );
    } else {
      addToast({
        title: "خطا",
        description: "مزایده‌ای یافت نشد",
        color: "danger",
      });
    }
  };

  return (
    <div className="relative w-full h-[271px] px-[10px] py-4 pt-[26px]">
      <div className="h-[92px] px-4 py-1 bg-[#151515] border border-[#6E6E6E1F] rounded-2xl text-white">
        <h1 className="text-right text-sm">قیمت</h1>
        <div className="w-full h-[35px] mt-2.5 flex gap-1.5">
          <Button
            onPress={handleSubmit}
            className="w-[95px] h-full !bg-[#4A9909] rounded-xl"
          >
            تایید
          </Button>
          <Input
            onChange={(e) => setInputVal(Number(e.target.value))}
            value={inputVal}
            className="h-full !bg-[#222222] border-none rounded-xl text-center text-sm text-[#fff70089]"
          />
        </div>
      </div>
      <SuggestedAmounts amounts={suggestedAmounts} />
    </div>
  );
};

export { BidContent };
