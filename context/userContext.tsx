"use client";

import { Main } from "@/components/types/user.types";
import { createContext, useContext, useState, ReactNode } from "react";

// Type for deposit state
interface DepositState {
  card_bank?: string;
  amount?: number;
}

// Define the shape of our context
interface UserContextType {
  deposit: DepositState;
  setDeposit: (data: DepositState) => void;
  user: Main | null;
  setUserData: (user: Main) => void;
}

// Create the context with default values
const AppContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserData] = useState<Main | null>(null);
  const [deposit, _setDeposit] = useState<DepositState>({
    card_bank: "",
    amount: 0,
  });

  const setDeposit = (data: DepositState) => {
    _setDeposit(data);
  };

  return (
    <AppContext.Provider value={{ user, setUserData, deposit, setDeposit }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserInfoProvider");
  }
  return context;
};
