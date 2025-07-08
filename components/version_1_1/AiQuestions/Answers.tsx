"use client";

import SendDescription from "@/components/chat/content_ai/SendDescription";
import { useAnswer } from "@/context/AiContextAnswer";
import { setAiConversation } from "@/redux/slices/aiSlice";
import { setFindUser, showLogin } from "@/redux/slices/globalSlice";
import { useAppDispatch } from "@/redux/store/store";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Tooltip,
} from "@heroui/react";
import { ArrowUp, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
type Props = {};

const Answers = (props: Props) => {
  const {
    selectedQuestion,
    showQuestion,
    chat,
    questions,
    questionLength,
    selectedAnswer,
    setWelcome,
    showAnalyze,
    addChat,
    setSelectedAnswer,
    setSelectedQuestion,
    setShowQuestion,
  } = useAnswer();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [customAnswer, setCustomAnswerList] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [answerItem, setAnswerItem] = useState<string>("");

  const [description, SetDescription] = useState<string>("");
  const dispatch = useAppDispatch();
  const token = Cookies.get("token");
  const router = useRouter();

  const analyzeHandler = () => {
    if (token) {
      dispatch(
        setAiConversation({
          ai: false,
          message: description,
        })
      );
      dispatch(setFindUser(true));
    } else dispatch(showLogin({ show: true, path: "" }));
  };

  // Toggle selection/deselection of an answer
  const toggleAnswerSelection = (answer: string) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(answer)) {
        // If already selected, remove it (deselect)
        return prev.filter((item) => item !== answer);
      } else {
        // If not selected, add it
        return [...prev, answer];
      }
    });
  };

  // Remove a custom answer
  const removeCustomAnswer = (
    answerToRemove: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent button click event from triggering
    setCustomAnswerList((prev) =>
      prev.filter((item) => item !== answerToRemove)
    );
    setSelectedAnswers((prev) =>
      prev.filter((item) => item !== answerToRemove)
    );
  };

  if (showQuestion) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
        {showAnalyze ? (
          <div className="flex flex-col w-2/4 mx-auto" dir="rtl">
            <Textarea
              onValueChange={(value) => {
                SetDescription(value);
              }}
              variant="bordered"
              className="w-full"
              classNames={{
                input: "bg-[#232035] border-none outline-none rounded-bl-none",
                innerWrapper:
                  "bg-[#232035] border-none outline-none rounded-bl-none",
                inputWrapper:
                  "bg-[#232035] border-none outline-none rounded-bl-none rounded-br-none",
              }}
              minRows={2}
              maxRows={3}
              placeholder="توضیحات..."
            />
            <div className="flex bg-[#232035] rounded-b-xl box-border p-2">
              <Button
                className="bg-lime-300 text-black"
                startContent={<ArrowUp />}
                onPress={analyzeHandler}
              >
                انالیز
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-full flex flex-wrap gap-4 items-center justify-center">
              {selectedQuestion?.ai_answer
                .filter((item) => {
                  if (filter === "all") return true;
                  return item.language_type === filter;
                })
                .map((item) => {
                  return (
                    <Tooltip
                      key={item.id}
                      color={item.description ? "warning" : "default"}
                      isDisabled={item.description.length <= 0 ? true : false }
                      content={
                        item.description ? (
                          <div className="px-1 py-2 w-44 h-auto text-right">
                            <div className="text-md font-lightSans">
                              {item.description}
                            </div>
                          </div>
                        ) : null
                      }
                    >
                      <Button
                        variant={"solid"}
                        className={` ${
                          selectedAnswers.includes(item.answer)
                            ? "bg-[#22418f]"
                            : " bg-[#1f2c4d]"
                        } h-12 rounded-3xl`}
                        onPress={() => {
                          toggleAnswerSelection(item.answer);
                          setAnswerItem(item.answer);
                        }}
                      >
                        {item.answer}
                      </Button>
                    </Tooltip>
                  );
                })}
              {customAnswer.map((item, index) => {
                return (
                  <Button
                    startContent={
                      <div
                        className="w-auto h-auto p-1 rounded-full bg-blue-300"
                        onClick={(e) => removeCustomAnswer(item, e)}
                      >
                        <X size={10} color="blue" />
                      </div>
                    }
                    key={index}
                    variant={"solid"}
                    className={` ${
                      selectedAnswers.includes(item)
                        ? "bg-[#22418f]"
                        : " bg-[#1f2c4d]"
                    } h-12 rounded-3xl`}
                    onPress={() => {
                      toggleAnswerSelection(item);
                      if (answerItem === "هوش مصنوعی و یادگیری ماشین") {
                        setFilter("ai");
                      }
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
              <Popover placement="top-end">
                <PopoverTrigger>
                  <Button
                    radius="full"
                    variant="faded"
                    endContent={<Plus />}
                    className={"h-12 text-[#4c74d7]"}
                  >
                    افزودن
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <Input
                      type="text"
                      label="کلید واژه"
                      maxLength={30}
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      endContent={
                        <Button
                          variant="solid"
                          color="primary"
                          size="md"
                          onPress={() => {
                            if (newAnswer.trim()) {
                              setCustomAnswerList((prev) => [
                                ...prev,
                                newAnswer,
                              ]);
                              setSelectedAnswers((prev) => [
                                ...prev,
                                newAnswer,
                              ]);
                              setNewAnswer(""); // Clear input after adding
                            }
                          }}
                        >
                          تایید
                        </Button>
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <>
              {selectedAnswers.length > 0 ? (
                <div className="flex w-full h-full items-center justify-center">
                  <Button
                    variant="solid"
                    className="bg-pink-500 w-1/4"
                    radius="full"
                    onPress={() => {
                      const userAnswer = selectedAnswers.join(",");
                      addChat({
                        id: chat.length + 1,
                        is_bot: false,
                        text: userAnswer,
                        audio: "",
                      });

                      setSelectedAnswer(selectedAnswer + 1);
                      setWelcome(false);
                      setCustomAnswerList([]);
                      setSelectedAnswers([]);
                      3;
                    }}
                  >
                    ادامه دادن
                  </Button>
                  {/* <Button onPress={() => console.log(filter)}>press</Button> */}
                </div>
              ) : (
                <div className="flex w-full h-full items-center justify-center">
                  <Button
                    variant="solid"
                    className="bg-pink-500 w-1/4"
                    radius="full"
                    isDisabled
                  >
                    ادامه دادن
                  </Button>
                </div>
              )}
            </>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default Answers;
