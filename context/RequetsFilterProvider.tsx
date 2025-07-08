"use client";

import { SliderValue } from "@heroui/react";
import { createContext, useContext, useState, ReactNode } from "react";



interface RequestFilterType {
  filter: any;
  setFilter: (filter: any) => void;
}

const AppContext = createContext<RequestFilterType | undefined>(undefined);

export const RequestFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<any>();

  return (
    <AppContext.Provider value={{ filter, setFilter}}>
      {children}
    </AppContext.Provider>
  );
};

export const useRequestFilter = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
