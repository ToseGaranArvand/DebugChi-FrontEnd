"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, PlayCircle, Search } from 'lucide-react';

const ScrollableNewProject = () => {
  const [currentCard, setCurrentCard] = useState(1);
  const [selectedValue, setSelectedValue] = useState("comfortable");
  const cardRefs = useRef<(HTMLDivElement)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleUpload = async () => {
    console.log(selectedValue);
  };

  const scrollToCard = (cardNumber: number) => {
    if (cardRefs.current[cardNumber - 1]) {
      cardRefs.current[cardNumber - 1]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentCard(cardNumber);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardNumber = Number(entry.target.getAttribute('data-card'));
            setCurrentCard(cardNumber);
          }
        });
      },
      { threshold: 0.5, root: containerRef.current }
    );

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentCard > 1 && currentCard <= 5) {
      cardRefs.current[currentCard - 1]?.classList.remove('opacity-0', 'invisible', 'h-0', 'overflow-hidden');
      cardRefs.current[currentCard - 1]?.classList.add('opacity-100', 'visible');
    }
  }, [currentCard]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div ref={containerRef} className="flex-1 w-full max-w-[600px] overflow-y-auto">
        <div className="sticky top-0 w-full h-44 flex items-center justify-center border rounded-lg bg-white z-10 mb-4">
          <PlayCircle />
        </div>

        {[1, 2, 3, 4, 5].map((cardNumber) => (
          <Card
            key={cardNumber}
            ref={(el:any) => (cardRefs.current[cardNumber - 1] = el)}
            data-card={cardNumber}
            className={`w-full mb-8 transition-opacity duration-500 ${
              cardNumber > currentCard ? 'opacity-0 invisible h-0 overflow-hidden' : 'opacity-100 visible'
            }`}
          >
            <CardHeader>
              <CardTitle>{`سوال ${cardNumber}`}</CardTitle>
              <CardDescription>{getCardDescription(cardNumber)}</CardDescription>
            </CardHeader>
            <CardContent>
              {getCardContent(cardNumber, selectedValue, handleChange)}
            </CardContent>
            <CardFooter className="flex gap-2">
              {cardNumber < 5 && (
                <Button
                  className="rounded-full flex-1"
                  onClick={() => scrollToCard(cardNumber + 1)}
                >
                  <ArrowRight />
                  <span>بعدی</span>
                </Button>
              )}
              {cardNumber > 1 && (
                <Button
                  className="rounded-full flex-1"
                  variant="outline"
                  onClick={() => scrollToCard(cardNumber - 1)}
                >
                  <span>بازگشت</span>
                  <ArrowLeft />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="h-20 w-full flex items-center justify-center sticky bottom-0 bg-white" dir="ltr">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`w-10 h-2 rounded-full ${
              index < currentCard ? "bg-blue-600 mx-1" : "bg-gray-400 mx-1"
            }`}
          ></div>
        ))}
      </div>

      <Button onClick={handleUpload} className="mb-4">show data</Button>
    </div>
  );
};

function getCardDescription(cardNumber: number) {
  switch (cardNumber) {
    case 1: return "ایجاد پروژه";
    case 2: return "حوزه تخصص خود را انتخاب کنید";
    case 3: return "زبان ها و فریم ورک هایی که مسلط هستید";
    case 4: return "مهارت هایی که دارید رو انتخاب کنید";
    case 5: return "اطلاعات روزومه خود را تکمیل کنید";
    default: return "";
  }
}

function getCardContent(cardNumber: number, selectedValue: string, handleChange: (value: string) => void) {
  switch (cardNumber) {
    case 1:
      return (
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="project_name">نام پروژه</Label>
            <Input
              type="text"
              id="project_name"
              placeholder="آموزش مقدماتی سطح پایتون"
            />
          </div>
          <RadioGroup
            defaultValue="comfortable"
            onValueChange={handleChange}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "default", label: "پروژه آموزشی", id: "r1" },
              { value: "comfortable", label: "دیباگ", id: "r2" },
              { value: "compact", label: "وبینار", id: "r3" },
              { value: "coach", label: "کوچ", id: "r4" },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex items-center space-x-2 border rounded-md w-full h-14 flex-row-reverse px-4 box-border gap-4 ${
                  selectedValue === item.value ? "bg-blue-50 border-blue-600 text-foreground" : ""
                }`}
              >
                <RadioGroupItem value={item.value} id={item.id} />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    case 2:
    case 3:
    case 4:
      return (
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2" />
            <Input
              type="text"
              placeholder="جستجو"
              className="pl-8"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2 border rounded-md p-4">
                <Input type="checkbox" id={`item-${i}`} />
                <Label htmlFor={`item-${i}`}>{`گزینه ${i + 1}`}</Label>
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="resume">رزومه</Label>
            <Input type="file" id="resume" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="additional_info">اطلاعات تکمیلی</Label>
            <textarea
              id="additional_info"
              placeholder="اطلاعات تکمیلی خود را وارد کنید"
              className="w-full h-32 p-2 border rounded-md"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default ScrollableNewProject;

