"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { AICategory, Main } from "@/components/types/AI-question";

interface Chat {
  id: number;
  is_bot: boolean;
  text: string;
  audio: string;
}

interface UserContextType {
  answer: string | null;
  welcome: boolean;
  questions: AICategory[];
  showQuestion: boolean;
  selectedQuestion: AICategory | null;
  completeAnswers: string;
  chat: Chat[];
  selectedAnswer: number;
  questionLength: number;
  selectedQuestionIndex:number;
  showAnalyze:boolean;
  setShowAnalyze:(show:boolean)=>void;
  setSelectedQuestionIndex:(number:number)=>void;
  setQuestionLength: (number: number) => void;
  setSelectedAnswer: (number: number) => void;
  setChat: (chat: Chat[]) => void;
  addChat: (chat: Chat) => void;
  setCompleteAnswers: (data: string) => void;
  setSelectedQuestion: (data: AICategory) => void;
  setShowQuestion: (value: boolean) => void;
  setQuestion: React.Dispatch<React.SetStateAction<AICategory[]>>;
  setWelcome: (value: boolean) => void;
  setAnswer: (data: string) => void;
}

const AppContext = createContext<UserContextType | undefined>(undefined);

export const AnswerProvider = ({
  children,

}: {
  children: ReactNode;

}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<boolean>(false);
  const [questions, setQuestion] = useState<AICategory[]>([]);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<AICategory | null>(
    null
  );
  const [completeAnswers, setCompleteAnswers] = useState<string>("");
  const [chat, setChat] = useState<Chat[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [questionLength, setQuestionLength] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex ] = useState(0)
  const [showAnalyze ,setShowAnalyze] = useState(false)
  const addChat = (newChat: Chat) => {
    setChat((prev) => [...prev, newChat]);
  };

  return (
    <AppContext.Provider
      value={{
        answer,
        welcome,
        questions,
        showQuestion,
        selectedQuestion,
        completeAnswers,
        chat,
        selectedAnswer,
        questionLength,
        selectedQuestionIndex,
        showAnalyze,
        setShowAnalyze,
        setSelectedQuestionIndex,
        setQuestionLength,
        setSelectedAnswer,
        setChat,
        addChat,
        setCompleteAnswers,
        setSelectedQuestion,
        setAnswer,
        setWelcome,
        setQuestion,
        setShowQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAnswer = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAnswer must be used within an AnswerProvider");
  }
  return context;
};
