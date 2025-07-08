"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context
interface ModalContextType {
  show: boolean | null;
  content: string | null;
  setShow: (show: boolean) => void;
  setContent:(content:string)=>void;
}

// Create the context with default values
const AppContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean | null>(false);
  const [content,setContent] = useState<string | null>(null)
  return (
    <AppContext.Provider value={{ show, setShow ,setContent,content}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useModalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
