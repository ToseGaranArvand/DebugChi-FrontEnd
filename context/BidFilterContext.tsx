"use client";

import { Result } from "@/components/types/tender.type";
import { GetWindowWidth } from "@/hooks/GetWindowWidth";
import { SliderValue } from "@heroui/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface FilterBid {
  type?: "tender" | "auction" | "all";
  search_text?: string;
}

interface BidFilterType {
  filter: FilterBid;
  priceValue: SliderValue;
  show: boolean;
  setShow: (show: boolean) => void;
  setValue: (value: SliderValue) => void;
  setFilter: (filter: FilterBid) => void;
  setSidePanelContent: Dispatch<
    SetStateAction<"pendingClasses" | "notification" | { id: number } | null>
  >;
  sidePanelContent: "pendingClasses" | "notification" | { id: number } | null;
  windowWidth: number;
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  data: Result[] | null;
  setData: Dispatch<SetStateAction<Result[] | null>>;
}

const AppContext = createContext<BidFilterType | undefined>(undefined);

export const BidFilterProvider = ({ children }: { children: ReactNode }) => {
  const windowWidth = GetWindowWidth();
  const [filter, setFilter] = useState<FilterBid>({
    type: "all",
  });
  const [priceValue, setValue] = useState<SliderValue>([0, 50000000]);
  const [show, setShow] = useState<boolean>(false);
  const [sidePanelContent, setSidePanelContent] = useState<
    "pendingClasses" | "notification" | { id: number } | null
  >(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<Result[] | null>(null);

  useEffect(() => {
    const showDrawer: () => void = () => setOpenDrawer(true);
    if (sidePanelContent !== null && windowWidth < 1536) showDrawer();
  }, [sidePanelContent]);
  useEffect(() => {
    if (windowWidth !== null && windowWidth > 1536) {
      setSidePanelContent("notification");
    }
  }, [windowWidth]);

  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        filter,
        setFilter,
        priceValue,
        setValue,
        setSidePanelContent,
        sidePanelContent,
        windowWidth,
        openDrawer,
        setOpenDrawer,
        data,
        setData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useBidFilter = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
