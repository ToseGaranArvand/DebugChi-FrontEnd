"use client";
import ProfileWithImageCard from "@/components/Tools/cards/ProfileWithImageCard";
import { Main } from "@/components/types/user.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import RequestMode from "./RequestMode";
import { formatCurrency } from "@/utils/tools";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { updateRequest } from "@/redux/slices/consultSlice";
import { TransactionDialog } from "@/components/ChooseTransaction/TransactionDialog";

type Props = {
  user: Main;
};

const Debugger = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const {request} = useAppSelector(state=>state.consult)
  const debugger_applicator = useAppSelector((state) => state.user.user?.id);
  useEffect(() => {
    dispatch(updateRequest({debuger:user.id}))
    
  }, []);

  const newPrice = ()=>{
    if (request.duration==20){
      return 0
    } else if (request.duration==40){
      return 10000
    }else if (request.duration==60){
      return 50000
    }
    return 0
  } 
const finalPrice = newPrice() + request.price 
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>
          <ProfileWithImageCard
            image={user.image_profile}
            name={user.first_name + " " + user.last_name}
            speciality={user.user_expertise}
            user_score={user.user_score}
          />
        </CardTitle>
        <CardDescription className="w-2/4">{user.debugger_bio}</CardDescription>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="flex w-full max-w-5xl flex-col gap-4 py-2 mx-auto ">



      <RequestMode />

      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="pt-6">
        <TransactionDialog />
        {/* <Button className="w-1/4 h-20">ثبت مشاوره</Button> */}
        <div className="flex-1 flex items-center justify-end gap-4">
         <span> قیمت نهایی : </span>
         <span>{formatCurrency(finalPrice)}</span>
        </div>
      </CardFooter>
      {/* <span>{user.first_name}</span> */}
    </Card>
  );
};

export default Debugger;
