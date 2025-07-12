"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { perform_get, perform_post } from "@/lib/api"
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global"

interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer?: number 
}


interface UserAnswer {
  question_id: number
  selected_option: number
}


interface DebuggerExamProps {
  token: string
}

export default function DebuggerExam({ token }: DebuggerExamProps) {
 
  const [examStarted, setExamStarted] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(40)
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [loading, setLoading] = useState(false)
  const [examResult, setExamResult] = useState<boolean | null>(null)
  const [isCheckingResult, setIsCheckingResult] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentQuestion = questions[currentQuestionIndex]

 
  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await perform_get("auths/debugger-exam/questions/", token)

      
      if (Array.isArray(response)) {
       
        setQuestions(response)
      } else if (response && response.questions && Array.isArray(response.questions)) {
    
        setQuestions(response.questions)
      } else {
        console.error("خطا در دریافت سوالات:", response)
      }
    } catch (error) {
      console.error("خطا در دریافت سوالات:", error)
    } finally {
      setLoading(false)
    }
  }


  const submitAnswers = async () => {
    try {
      setIsCheckingResult(true)

   
      const answersToSubmit = userAnswers.filter((answer) => answer.selected_option !== null)

      const submitData = {
        answers: answersToSubmit,
      }

      
      const submitResponse = await perform_post("auths/debugger-exam/submit/", submitData, token)
      console.log("پاسخ ارسال:", submitResponse)

      
      const userInfoResponse = await perform_get("auths/user_info/", token)

      if (userInfoResponse && userInfoResponse.verifications) {
        const isVerified = userInfoResponse.verifications.score_verified
        setExamResult(isVerified)
        setExamFinished(true)
      }
    } catch (error) {
      console.error("خطا در ارسال پاسخ‌ها:", error)
    } finally {
      setIsCheckingResult(false)
    }
  }

 
  useEffect(() => {
    if (examStarted && !examFinished && questions.length > 0) {
      
      setTimeLeft(40)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
        
            handleTimeOut()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [examStarted, examFinished, currentQuestionIndex, questions.length])


  const startExam = async () => {
    await fetchQuestions()
    setExamStarted(true)
    setExamFinished(false)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setExamResult(null)
  }


  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

 
  const handleTimeOut = () => {
 
    moveToNextQuestion()
  }

 
  const handleSubmit = () => {
    if (selectedOption !== null) {
     
      const newAnswer: UserAnswer = {
        question_id: currentQuestion.id,
        selected_option: selectedOption,
      }

      setUserAnswers((prev) => [...prev, newAnswer])
    }

    moveToNextQuestion()
  }

 
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
     
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      submitAnswers()
    }
  }


  const restartExam = () => {
    setExamStarted(false)
    setExamFinished(false)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setUserAnswers([])
    setQuestions([])
    setExamResult(null)
  }

  
  const LoadingSkeleton = () => (
    <div
      className="w-full max-w-md bg-[#1a1d2d] rounded-2xl p-8 py-12 flex flex-col items-center justify-center space-y-6 opacity-100 transition-opacity duration-500 overflow-hidden"
      dir="rtl"
    >
      <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
      <div className="space-y-2 w-full">
        <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6 animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6 animate-pulse"></div>
      </div>
      <p className="text-gray-400 text-sm text-center">در حال بررسی نتایج آزمون...</p>
    </div>
  )

  return (
     <main
    className="flex min-h-screen flex-col items-center justify-center text-white p-4 overflow-hidden relative"
    dir="rtl"
  >
    <BackgroundGlobalGradient />
      {!examStarted ? (
<div 
  className="fixed top-[5vh] left-[5vw] right-[5vw] bottom-[5vh] bg-[#17151CF7] rounded-2xl flex flex-col items-center py-16 opacity-100 transition-opacity duration-500"
  style={{ 
    backdropFilter: 'blur(49.7px)',
    WebkitBackdropFilter: 'blur(49.7px)',
    backgroundColor: 'rgba(23, 21, 28, 0.965)'
  }}
>
          <div className="flex flex-col items-center space-y-8 flex-grow justify-center">
    <div className="w-40 h-40 relative">
      <Image src="/svg/certificate.svg" alt="گواهینامه" width={400} height={400} priority className="object-contain" />
    </div>

      <div className="z-30 w-90 h-90 absolute -bottom-40 left-0 opacity-[.02] ">
      <Image src="/svg/certificate.svg" alt="گواهینامه" width={600} height={600} priority className="object-contain" />
    </div>

       <div className="z-30 w-90 h-90 absolute -bottom-80 right-0 opacity-[.02] scale-x-[-1]">
      <Image src="/svg/certificate.svg" alt="گواهینامه" width={600} height={600} priority className="object-contain" />
    </div>

    <h1 className="text-xl font-bold text-center mt-4">آزمون تأیید صلاحیت ویژه متخصصین</h1>

    <p className="text-center text-gray-300 max-w-lg text-sm leading-relaxed">
      خوش آمدید! برای شروع ارائه خدمات و کسب درآمد در دیباگچی، یک تست کوچک تأیید صلاحیت داریم تا مطمئن شویم
      می‌توانید بهترین تجربه را برای کاربران رقم بزنید.
    </p>
  </div>

          <div className="mt-auto pt-8 flex flex-col items-center space-y-4">
    <p className="text-gray-400 text-xs">آیا آماده‌ای شروع کنی؟</p>
    <Button
      onClick={startExam}
      disabled={loading}
      className="z-40 bg-[#2e3784] hover:bg-[#3a45a0] text-white rounded-md py-6 px-36 rounded-3xl text-lg font-medium transition-colors disabled:opacity-50"
    >
      {loading ? "در حال بارگذاری..." : "شروع"}
    </Button>
  </div>
        </div>
      ) : 
      isCheckingResult ? (
        <LoadingSkeleton />
      ) :
      examFinished ? (
        <div
          className="w-full max-w-md bg-[#1a1d2d] rounded-2xl p-8 py-12 flex flex-col items-center justify-start space-y-6 opacity-100 transition-opacity duration-500 overflow-hidden"
          style={{ minHeight: "80vh", aspectRatio: "1 / 1.414" }}
          dir="rtl"
        >
          {examResult ? (
          
            <>
              <div className="w-16 h-16 relative mb-2">
                <Image
                  src="/svg/certificate.svg"
                  alt="گواهینامه"
                  width={64}
                  height={64}
                  priority
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-center text-yellow-400">تبریک! شما پذیرفته شدید</h1>
              <h2 className="text-lg font-bold text-center text-white">شما با موفقیت آزمون را پشت سر گذاشتید!</h2>
              <p className="text-center text-gray-300 text-xs leading-relaxed">
              
              </p>
              <div className="space-y-3 text-right w-full">
                <h3 className="text-sm font-medium text-white">برای شروع فعالیت، مراحل زیر را دنبال کنید:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 text-xs pr-2">
                  <li>تکمیل اطلاعات حساب کاربری: به صفحه پروفایل خود بروید و اطلاعات شخصی و تخصصی 
     (شامل تجربه کاری، مهارت‌ها و نمونه کارها) را تکمیل کنید.</li>
                  <li>ایجاد اولین خدمت: بخش "ایجاد خدمت جدید" را انتخاب کنید و اولین سرویس برنامه‌نویسی خود را تعریف کنید.</li>
                  <li> به‌روزرسانی وضعیت آنلاین: وضعیت خود را به "آنلاین" تغییر دهید تا مشتریان بتوانند شما را پیدا کنند.</li>
                </ol>
              </div>
              <div className="flex-grow"></div>
              <p className="text-gray-400 text-xs text-center mt-4">
                با سوالات بیشتر با پشتیبانی تماس بگیرید
                <br />
                ایمیل پشتیبانی: support@debugchi.ir
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#2e3784] hover:bg-[#3a45a0] text-white rounded-md py-2 px-12 text-sm font-medium transition-colors w-full"
              >
                ورود به پنل
              </Button>
            </>
          ) : (
          
            <>
              <div className="w-16 h-16 relative flex items-center justify-center mb-2">
                <Image src="/x.svg" alt="رد شده" width={64} height={64} priority className="object-contain" />
              </div>
              <h1 className="text-xl font-bold text-center text-red-500">متاسفانه شما پذیرفته نشدید</h1>
              <h2 className="text-lg font-bold text-center text-white">نتیجه آزمون شما</h2>
              <p className="text-center text-gray-300 text-xs leading-relaxed">
                متاسفانه شما نتوانستید حداقل امتیاز لازم برای قبولی در آزمون را کسب کنید. برای ارائه خدمات در پلتفرم،
                نیاز است که در آزمون تأیید صلاحیت موفق شوید. شما می‌توانید پس از مطالعه بیشتر، مجدداً در آزمون شرکت کنید.
              </p>
              <div className="space-y-3 text-right w-full">
                <h3 className="text-sm font-medium text-white">برای آمادگی بهتر در آزمون بعدی:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 text-xs pr-2">
                  {/* <li>از منابع آموزشی موجود در بخش "منابع مطالعاتی" استفاده کنید</li> */}
                  {/* <li>در دوره‌های آموزشی آنلاین مرتبط با حوزه تخصصی خود شرکت کنید</li> */}
                  {/* <li>از تجربیات متخصصین موفق در پلتفرم استفاده کنید و با آنها مشورت کنید</li> */}
                </ol>
              </div>
              <div className="flex-grow"></div>
              <Button
                onClick={restartExam}
                className="bg-[#2e3784] hover:bg-[#3a45a0] text-white rounded-md py-2 px-12 text-sm font-medium transition-colors w-full"
              >
                تلاش مجدد
              </Button>
            </>
          )}
        </div>
      ) : 
      questions.length > 0 ? (
        <div className="w-[90vw] h-[90vh] bg-[#17151CF7] rounded-2xl mx-auto px-6 py-8 opacity-100 transition-opacity duration-500 overflow-hidden flex items-center justify-center">
        
        <div className="w-[55vw]">
            <div className="flex justify-between items-center mb-8">
             <div className="text-white text-lg font-medium">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <button className="text-gray-400 text-sm hover:text-white transition-colors">
              بازگشت
            </button>
           
          </div>

       
          <div className="relative z-10 flex justify-center" style={{ marginBottom: "-48px" }}>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0">
                <Image src="/svg/timer-bg.svg" alt="Timer Background" width={96} height={96} className="w-full h-full" />
              </div>

              <div
                className="absolute inset-0 transition-transform duration-1000 ease-linear"
                style={{
                  transform: `rotate(${((40 - timeLeft) / 40) * 360}deg)`,
                  transformOrigin: "center",
                }}
              >
                <Image
                  src="/svg/timer-progress.svg"
                  alt="Timer Progress"
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{timeLeft}</span>
              </div>
            </div>
          </div>

         
          <div
            className="w-full rounded-3xl p-8 pt-16 mb-12 text-right relative z-0"
            style={{
              background: "#1B1921F7",
              backdropFilter: "blur(50px)",
            }}
            dir="rtl"
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                borderRadius: "inherit",
                padding: "1px",
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 53.37%, rgba(255, 255, 255, 0) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
              }}
            />
            <p className="text-[#BBBBBB] text-lg leading-relaxed relative z-10">{currentQuestion.question}</p>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" dir="rtl">
            {currentQuestion.options.map((option, index) => (
<div
  key={index}
  onClick={() => handleOptionSelect(index)}
  className={`relative flex items-center p-6 cursor-pointer rounded-[22px] overflow-hidden transition-opacity ${
    selectedOption !== null && selectedOption !== index ? "opacity-40" : ""
  }`}
  style={{
    background: "#1B1921",
    isolation: "isolate",
  }}
>

  <div
    className="absolute inset-0 rounded-[22px] pointer-events-none"
    style={{
      background: 
        "linear-gradient(90deg, rgba(50, 50, 50, 0.2) 0%, #3A3A3A 51.92%, rgba(50, 50, 50, 0.2) 100%)",
      mask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
      WebkitMask: 
        "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
      maskComposite: "exclude",
      WebkitMaskComposite: "xor",
      padding: "1.2px",
      borderRadius: "inherit",
      zIndex: 1,
    }}
  />

 
  <div className="flex items-center w-full relative z-10">
   
    <span className="text-[#BBBBBB] text-base text-right flex-1">
      {option}
    </span>
    
   
    <div
      className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center flex-shrink-0 ${
        selectedOption === index 
          ? "bg-[#00BF1D]" 
          : "border-2 border-gray-600"
      }`}
    />
  </div>
</div>
            ))}
          </div>

         
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`py-5 px-36 rounded-3xl text-white font-medium text-lg transition-all hover:scale-105 hover:-translate-y-1 ${
                selectedOption !== null
                  ? "bg-[#2e3784] hover:bg-[#3a45a0]"
                  : "bg-[#2e3784] opacity-50 cursor-not-allowed"
              }`}
            >
              ثبت پاسخ
            </button>
          </div>

        
          <p className="text-gray-400 text-sm text-center">شما {timeLeft} ثانیه وقت دارید. لطفا با دقت ثبت نمایید</p>
        </div>
        </div>
      ) : (
      
        <div className="text-white text-center" dir="rtl">
          <div className="animate-pulse">
            <p>در حال بارگذاری سوالات...</p>
          </div>
        </div>
      )}
    </main>
  )
}
