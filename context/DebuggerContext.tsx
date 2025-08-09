"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DebuggerContextType = {
  // chat
  chatRoomId: string;
  setChatRoomId: (value: string) => void;
  userId?: number;
  setUserId: (value?: number) => void;
};

const DebuggerContext = createContext<DebuggerContextType | undefined>(
  undefined
);

export const useDebuggerContext = () => {
  const context = useContext(DebuggerContext);
  if (!context) {
    throw new Error(
      "useDebuggerContext must be used within a DebuggerProvider"
    );
  }
  return context;
};

export const DebuggerProvider = ({ children }: { children: ReactNode }) => {
  // chat
  const [chatRoomId, setChatRoomId] = useState<string>("");
  const [userId, setUserId] = useState<number>();

  return (
    <DebuggerContext.Provider
      value={{ chatRoomId, setChatRoomId, userId, setUserId }}
    >
      {children}
    </DebuggerContext.Provider>
  );
};
