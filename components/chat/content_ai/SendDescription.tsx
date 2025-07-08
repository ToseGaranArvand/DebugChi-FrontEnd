"use client";
import { perform_get } from "@/lib/api";
import { setAnalyze, setAiConversation } from "@/redux/slices/aiSlice";
import { setFindUser, showLogin } from "@/redux/slices/globalSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { addToast, Avatar, Button, cn, Textarea } from "@heroui/react";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
type Props = {};

const SendDescription = () => {
  const { is_last_question } = useAppSelector(
    (state: RootState) => state.aiQuestion
  );
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
    } else dispatch(showLogin({show:true,path:""}));
  };

  const requestHandler = async () => {
    const users = await perform_get("auths/register/");
    // const formattedUsers = users.map((user: Main) => ({
    //   title: `${user.first_name} ${user.last_name}`,
    //   description: user.user_expertise.join(", "),
    //   src: user.image_profile,
    //   ctaText: "مشاهده پروفایل",
    //   ctaLink: `/community/chat/${user.uuid}?mode=profile?hide=true`,
    //   content: user.user_bio,
    //   url: `/community/chat/${user.uuid}?mode=profile`,
    // }));

    // setUser(formattedUsers);

    setTimeout(() => {
      addToast({
        title: "Successfull!",
        description: "یک نفر رو برای شما پیدا کردم",
        classNames: {
          base: cn([
            "bg-default-50 dark:bg-background shadow-sm",
            "border-1",
            "relative before:content-[''] before:absolute before:z-10",
            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
            "rounded-l-none border-l-0",
            "min-w-[350px]",
            "rounded-md",
            "flex flex-col items-start",
            "before:bg-primary border-primary-200 dark:border-primary-100",
          ]),
          icon: "w-6 h-6 fill-current",
        },
        endContent: (
          <div className="ms-11 my-2 flex gap-x-2">
            <Button color={"primary"} size="lg" variant="light">
              <Avatar src={users[0].image_profile} name={users[0].first_name} />
            </Button>
          </div>
        ),
        color: "primary",
      });
      setTimeout(() => {
        router.push(`/community/chat/${users[0].uuid}?mode=profile&?hide=true`);
      }, 3000);

      // setShowUser(true);
    }, 3000);
  };

  if (is_last_question) {
    return (
      <div className="flex flex-col max-w-5xl mx-auto" dir="rtl">
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
    );
  } else {
    return null;
  }
};

export default SendDescription;
