"use client";

import type { Main, Question, Answer } from "@/components/types/intorduction";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { skip } from "node:test";
import { useState, useEffect } from "react";

type Props = {
  data: Main;
};

// Define the structure for collected answers
interface CollectedAnswer {
  questionId: number;
  questionText: string;
  questionType: string;
  answers?: {
    id: number;
    text: string;
  }[];
  answerText?: string;
  textInput?: string;
  agreementAccepted: boolean;
}

const Introduction = ({ data }: Props) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [additionalTextInputs, setAdditionalTextInputs] = useState<
    Record<number, string>
  >({});
  const [buttonAnswers, setButtonAnswers] = useState<Record<number, Answer[]>>(
    {}
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<number, boolean>
  >({});
  const [agreementsAccepted, setAgreementsAccepted] = useState<
    Record<number, boolean>
  >({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [collectedData, setCollectedData] = useState<CollectedAnswer[]>([]);
  const [welcom, setWelcom] = useState(true);
  // Get current section and question
  const currentSection = data.sections[activeSection];
  const currentQuestion = currentSection?.questions[activeQuestionIndex];


  const [skip,setSkip] = useState<boolean>(false)

  // Auto-mark text questions as answered when they're displayed
  useEffect(() => {
    if (currentQuestion?.question_type === "text") {
      markAsAnswered(currentQuestion);
    }
  }, [activeQuestionIndex, activeSection]);

  // Calculate progress
  const totalQuestions = currentSection?.questions.length || 0;
  const answeredCount =
    currentSection?.questions.filter((q) => answeredQuestions[q.id]).length ||
    0;
  const progress =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // Check if all questions in the section are answered
  const allQuestionsAnswered =
    totalQuestions > 0 && answeredCount === totalQuestions;

  // Check if current question has been answered and agreement accepted
  const isCurrentQuestionCompleted =
    answeredQuestions[currentQuestion?.id] &&
    agreementsAccepted[currentQuestion?.id];

  // Check if an answer is selected
  const isAnswerSelected = (questionId: number, answerId: number): boolean => {
    if (!buttonAnswers[questionId]) return false;
    return buttonAnswers[questionId].some((answer) => answer.id === answerId);
  };

  // Handle text input changes for main text answers
  const handleTextChange = (questionId: number, value: string) => {
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle additional text input changes for all question types
  const handleAdditionalTextChange = (questionId: number, value: string) => {
    setAdditionalTextInputs((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle agreement checkbox
  const handleAgreementChange = (questionId: number, accepted: boolean) => {
    setAgreementsAccepted((prev) => ({
      ...prev,
      [questionId]: accepted,
    }));
  };

  // Mark a question as answered
  const markAsAnswered = (question: Question) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [question.id]: true,
    }));
  };

  // Handle button answer click - now toggles answers in/out of array
  const skipHandler = ()=>{
    setSkip(true)
    setTimeout(()=>{
      window.location.href = "/"
      setSkip(false)
    },1500)
  }
  const handleButtonAnswer = (questionId: number, answer: Answer) => {
    setButtonAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];

      // Check if this answer is already selected
      const isAlreadySelected = currentAnswers.some((a) => a.id === answer.id);

      let newAnswers;
      if (isAlreadySelected) {
        // Remove the answer if already selected
        newAnswers = currentAnswers.filter((a) => a.id !== answer.id);
      } else {
        // Add the answer if not already selected
        newAnswers = [...currentAnswers, answer];
      }

      // Mark as answered if at least one answer is selected
      if (newAnswers.length > 0) {
        markAsAnswered(currentQuestion);
      }

      return {
        ...prev,
        [questionId]: newAnswers,
      };
    });
  };

  // Go to next section
  const goToNextSection = () => {
    if (activeSection < data.sections.length - 1) {
      setActiveSection((prev) => prev + 1);
      setActiveQuestionIndex(0);
    } else if (allQuestionsAnswered) {
      // If this is the last section and all questions are answered, show results
      collectAllData();
      setShowResults(true);
    }
  };

  // Go to previous section
  const goToPreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection((prev) => prev - 1);
      setActiveQuestionIndex(0);
    }
  };

  // Go to next question
  const goToNextQuestion = () => {
    if (activeQuestionIndex < totalQuestions - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else if (allQuestionsAnswered) {
      goToNextSection();
    }
  };

  // Go to previous question
  const goToPreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    } else {
      goToPreviousSection();
    }
  };

  // Collect all data from answers
  const collectAllData = () => {
    const allData: CollectedAnswer[] = [];

    data.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (
          (question.question_type === "button" ||
            question.question_type === "emoji") &&
          buttonAnswers[question.id] &&
          buttonAnswers[question.id].length > 0
        ) {
          // For button and emoji questions with answers
          allData.push({
            questionId: question.id,
            questionText: question.text,
            questionType: question.question_type,
            answers: buttonAnswers[question.id].map((answer) => ({
              id: answer.id,
              text: answer.text,
            })),
            textInput: additionalTextInputs[question.id] || "",
            agreementAccepted: agreementsAccepted[question.id] || false,
          });
        } else if (question.question_type === "text") {
          // For text questions
          allData.push({
            questionId: question.id,
            questionText: question.text,
            questionType: question.question_type,
            answerText: textAnswers[question.id] || "",
            textInput: additionalTextInputs[question.id] || "",
            agreementAccepted: agreementsAccepted[question.id] || false,
          });
        }
      });
    });

    setCollectedData(allData);
  };

  // Reset the form
  const resetForm = () => {
    setActiveSection(0);
    setActiveQuestionIndex(0);
    setTextAnswers({});
    setAdditionalTextInputs({});
    setButtonAnswers({});
    setAnsweredQuestions({});
    setAgreementsAccepted({});
    setShowResults(false);
  };

  if (welcom) {
    return (
      <div className="w-full max-w-xl flex h-screen box-border p-5 flex-col items-center justify-center gap-4">
       
         <Image
          src={"/images/handshake.svg"}
          width={300}
          height={300}
          alt="خوش آمدید"
        />
        <div className="max-w96 min-h-96 bg-slate-100 dark:bg-slate-900 text-foreground rounded-2xl shadow-md flex flex-col items-start justify-around box-border p-4">
          <span className="font-blackSans text-2xl w-full text-center">به دیباگچی خوش آمدید</span>
          <div className="flex flex-col gap-2 mb- ">

          <p className="text-foreground-500 text-right w-full">
            قبل از شروع کسب درآمد ، باید بدونیم تخصصت چیه.
          </p>
          <p className="text-foreground-500 text-right w-full flex-wrap text-wrap">
            چندتا سوال ساده میپرسیم تا بدونیم کجا میتونی <br /> بهترین خدمات رو
            ارائه بدی.
          </p>
          </div>
          <p className="w-full  text-right">آماده ای شروع کنیم ؟</p>
          <Button
          size="lg"
          
          onPress={() => setWelcom(false)}
          variant="solid"
          color="secondary"
          
        >
          شروع 
        </Button>
        </div> 
        <div className="flex-1">

        </div> 
      </div>
    );
  }

  // If showing results, display the JSON data
  if (showResults) {
    return (
      <div className="w-full mx-auto flex items-center justify-start  rounded-lg shadow-lg">
         <div className="w-80 h-[400px] mx-auto shadow-md rounded-2xl flex flex-col items-center overflow-hidden border dark:border-slate-900 gap-4 box-border p-4 relative">
          <div className="absolute -top-56 h-[400px] rounded-full w-[400px] bg-slate-300/30 dark:bg-slate-300/10  "></div>
          <Image
            src={"/images/success.png"}
            width={100}
            height={100}
            className="z-10"
            alt="تایید"
          />
          <div className="flex-1 flex flex-col  items-center justify-end gap-4">
            <span className="text-green-600">تبریک میگم!</span>
            <span className="text-foreground-500">
              اطلاعات شما با موفقیت ذخیره شد
            </span>
            <Button className="w-3/4 my-5" variant="flat" color="success" as={Link} href="/user/dashboard/">ادامه</Button>
          </div>
        </div>
  
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl border dark:border-none dark:bg-slate-900 text-foreground rounded-lg shadow-xl overflow-hidden">

        <div className="p-6">
        
          {currentQuestion && (
            <div className=" p-6 rounded-lg shadow-sm mb-6 text-foreground">
              <h3 className="text-xl font-medium mb-4 text-foreground">
                {currentQuestion.text}
              </h3>
              {currentQuestion.description && (
                <p className="mb-6 ">{currentQuestion.description}</p>
              )}

          
              {currentQuestion.sound && (
                <div className="mb-6 text-foreground">
                  <audio controls className="w-full">
                    <source
                      src={currentQuestion.sound || ""}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Answers based on question type */}
              <div className="space-y-4 text-foreground">
                {currentQuestion.question_type === "button" && (
                  <div className="grid grid-cols-2 gap-3 text-foreground">
                    {currentQuestion.answers.map((answer) => (
                      <label
                        key={answer.id}
                        className="flex text-foreground items-center space-x-3 space-x-reverse rtl cursor-pointer"
                      >
                        <input
                          type="radio"
                          checked={isAnswerSelected(
                            currentQuestion.id,
                            answer.id
                          )}
                          onChange={() =>
                            handleButtonAnswer(currentQuestion.id, answer)
                          }
                          className="form-radio h-5 w-5 text-foreground border-gray-300 focus:ring-[#1a2e4c]"
                        />
                        <span className="text-foreground">{answer.text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.question_type === "emoji" && (
                  <div className="grid grid-cols-3 gap-4">
                    {currentQuestion.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="flex flex-col items-center"
                      >
                        <Button
                          size="lg"
                          variant={
                            isAnswerSelected(currentQuestion.id, answer.id)
                              ? "solid"
                              : "flat"
                          }
                          color={
                            isAnswerSelected(currentQuestion.id, answer.id)
                              ? "primary"
                              : "default"
                          }
                          title={answer.description}
                          onPress={() =>
                            handleButtonAnswer(currentQuestion.id, answer)
                          }
                        >
                          {answer.text}
                        </Button>
                        <p className="text-sm text-foreground mt-1">
                          {answer.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {currentQuestion.question_type === "text" && (
                  <div>
                    <input
                      type="text"
                      value={textAnswers[currentQuestion.id] || ""}
                      onChange={(e) =>
                        handleTextChange(currentQuestion.id, e.target.value)
                      }
                      className="w-full p-3  rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2e4c]"
                      placeholder="پاسخ خود را وارد کنید..."
                      dir="rtl"
                    />
                  </div>
                )}

                {/* Additional text input for all question types */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2 text-right">
                    آیا نظر یا پیشنهادی دارید؟
                  </label>
                  <textarea
                    value={additionalTextInputs[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAdditionalTextChange(
                        currentQuestion.id,
                        e.target.value
                      )
                    }
                    className="w-full mt-4 p-3 bg-slate-100 dark:bg-slate-950 text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2e4c] min-h-[80px]"
                    placeholder="نظرات خود را اینجا بنویسید..."
                    dir="rtl"
                  />
                </div>

                {/* Agreement Section */}
                <div className="mt-6 text-sm text-gray-500 text-right">
                  <p>
                    اطلاعاتی که ارائه می‌دهید به ما کمک می‌کند تا پلتفرم خود را
                    بهبود دهیم.
                  </p>
                  <label className="flex items-center justify-end mt-2 cursor-pointer">
                    <span className="mr-2">من با شرایط موافق هستم</span>
                    <input
                      type="checkbox"
                      checked={agreementsAccepted[currentQuestion.id] || false}
                      onChange={(e) =>
                        handleAgreementChange(
                          currentQuestion.id,
                          e.target.checked
                        )
                      }
                      className="form-checkbox h-4 w-4 text-foreground rounded focus:ring-[#1a2e4c]"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

     
          <div className="flex gap-4 mt-6 rtl">
            
            <Button
              onPress={goToNextQuestion}
              disabled={!isCurrentQuestionCompleted}
              className={`px-6 py-2 rounded-md ${
                !isCurrentQuestionCompleted
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#1a2e4c] text-white hover:bg-[#2a3e5c]"
              }`}
            >
              {activeQuestionIndex < totalQuestions - 1 ? "بعدی" : "ارسال"}
            </Button>

            <Button
              onPress={goToPreviousQuestion}
              disabled={activeSection === 0 && activeQuestionIndex === 0}
              className={`px-6 py-2 rounded-md ${
                activeSection === 0 && activeQuestionIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              قبلی
            </Button>
            <div className="flex-1 flex items-center justify-end">
              <Button variant="flat" color="secondary" startContent={<ArrowRight />} isDisabled={skip} isLoading={skip} onPress={skipHandler}>رد کردن</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
