"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { addToast, Avatar, Button, cn, Textarea } from "@heroui/react";
import {
  setAnalyze,
  setContinue,
  setAiConversation,
  setDebuggers,
  setDelay,
  setLastQuestion,
  showQuestion,
} from "@/redux/slices/aiSlice";
import React, { useState, useEffect } from "react";
import { perform_get } from "@/lib/api";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { Main } from "@/components/types/user.types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ChatWithAi = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    question_id,
    selected_answers,
    selected_category,
    answers,
    disabled,
    is_last_question,
  } = useAppSelector((state) => state.aiQuestion);
  const [loading, setLoading] = useState(false);
  const [description, SetDescription] = useState<string>("");
  const [answer,setAnswer] = useState('')
  useEffect(() => {
    const checkStarted = Cookies.get("started");
    if (checkStarted === "true") {
      dispatch(
        setAiConversation({
          ai: true,
          message: "مشخصات شما به روز رسانی شده است",
        })
      );
    }
  }, []);

  const handleNextQuestion = () => {
    // setAnswer(answers[answers.length])
    dispatch(
      setAiConversation({
        ai: false,
        message: answers[answers.length - 1],
      })
    );

    if (selected_category) {
      const nextQuestionId = question_id + 1;

      if (nextQuestionId < selected_category.questions.length) {
        const nextQuestion = selected_category.questions[nextQuestionId];

        dispatch(showQuestion(nextQuestionId));
        dispatch(
          setDelay({
            state: true,
            message: nextQuestion.question,
          })
        );

        dispatch(
          setAiConversation({
            ai: true,
            message: nextQuestion.question,
            sound: nextQuestion.sound || "", // اضافه کردن صدا در صورت وجود
          })
        );

        setTimeout(() => {
          dispatch(
            setDelay({
              state: false,
              message: "",
            })
          );
        }, 1500);
      }
    }
  };

  const handleGemminiRequest = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    setLoading(true);
    try {
      await delay(1000);
      const users = await perform_get("auths/register/");

      const prompt = `
        این کلید واژه های من هست طبق این کلید ها ${JSON.stringify(
          answers,
          null,
          2
        )}
        کاربرای زیر رو ${JSON.stringify(
          users,
          null,
          2
        )} انالیز کن بهترین افرادی که میتونن کمک کنن رو پیدا کن و فقط بصورت JSON خروجی بده. فقط json باشه هیچ داد ی دیگه ای نده با اسم ابجکت result برگزدون
      `;

      const requestData = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent?key=AIzaSyAFXCHBmGarSnReCA8Mqu_EFskVcPyWHCc",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      let rawText = response.data.candidates[0].content.parts[0].text;
      rawText = rawText.replace(/```json|```/g, "").trim();
      const parsedDebuggers = JSON.parse(rawText);
      dispatch(setDebuggers(parsedDebuggers));
    } catch (error) {
      console.error("Error fetching debuggers:", error);
    } finally {
      setLoading(false);
    }
  };

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (Cookies.get("started") === "true") {
      setHidden(true);
    }
  }, []);


  if (hidden) return null;

  
  const isLastQuestion =
    selected_category && question_id === selected_category.questions.length - 1;

  if (is_last_question) {
    return null;
  } else {
    return (
      <div className="w-full flex items-center justify-center mx-auto h-20">
        {isLastQuestion ? (
          <Button
          radius="full"
            isDisabled={disabled}
            color="secondary"
            className="w-1/4 h-full"
            onPress={() => {
              handleNextQuestion();
              dispatch(setLastQuestion(!is_last_question));
              dispatch(
                setAnalyze({
                  ai: true,
                  message: "اگر توضیحاتی دارید وارد کنید ؟",
                  analyze: true,
                })
              );
            }}
            disabled={selected_answers.length === 0}
          >
            ادامه دادن
          </Button>
        ) : (
          <Button
          radius="full"
            isDisabled={disabled}
            color="secondary"
            className={`w-1/4 h-full ${selected_answers.length === 0 ? 'hidden' : null}`}
            onPress={() => {
              handleNextQuestion();
              dispatch(setContinue(true));
            }}
            disabled={selected_answers.length === 0}
          >
            ادامه دادن
          </Button>
        )}
      </div>
    );
  }
};

export default ChatWithAi;
