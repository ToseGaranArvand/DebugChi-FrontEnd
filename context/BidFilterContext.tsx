"use client";

import { SliderValue } from "@heroui/react";
import { createContext, useContext, useState, ReactNode } from "react";

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
}

const AppContext = createContext<BidFilterType | undefined>(undefined);

export const BidFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterBid>({
    type: "all"
  });
  const [priceValue, setValue] = useState<SliderValue>([0, 50000000]);
  const [show, setShow] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ show, setShow, filter, setFilter, priceValue, setValue }}>
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
