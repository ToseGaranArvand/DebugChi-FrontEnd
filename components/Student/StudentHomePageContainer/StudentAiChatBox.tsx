"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import React, { FC, useState } from "react";
import { aiResponseType, Message } from "./StudentHomePageContainer";
import { ServiceBookingModal } from "./ServiceBookingModal";

interface IStudentAiChatBox {
  messages: Message[];
  aiResponse: aiResponseType | null;
}

const StudentAiChatBox: FC<IStudentAiChatBox> = ({ messages, aiResponse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isChatFinished = aiResponse?.is_question_phase;

  return (
    <div dir="rtl" className="w-full h-full overflow-scroll">
      <div className="space-y-6 pt-6 max-w-3xl h-fit min-h-[calc(100%-50px)] mx-auto">
        {messages.map((message, idx) => {
          return (
            <div
              key={idx}
              className={`flex ${
                message.isAI ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`relative p-4 flex flex-row-reverse items-center gap-1 bg-transparent rounded-xl ${
                  message.isAI ? " max-w-[90%]" : "max-w-[50%] bg-[#1C1C1CB2]"
                }`}
                style={
                  !message.isAI
                    ? {
                        background: "#1C1C1CB2",
                        backdropFilter: "blur(100px)",
                        borderRadius: "12px",
                      }
                    : {}
                }
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#BABABA" }}
                >
                  {message.text}
                  {/* {message.isTyping && (
                    <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                  )} */}
                </p>

                {message.isAI && (
                  <div>
                    <Image
                      src="/images/svg/ChatStarSvg.svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!isChatFinished && aiResponse && aiResponse.request_info && (
        <div className="w-full flex justify-center">
          <Button
            onPress={() => setIsModalOpen(true)}
            className="w-[200px] h-[40px] rounded-xl !bg-[#3344D9] text-white"
          >
            درخواست خدمات
          </Button>
          <ServiceBookingModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            requestType={aiResponse.request_type}
            requestInfo={aiResponse.request_info}
          />
        </div>
      )}
    </div>
  );
};

export { StudentAiChatBox };
