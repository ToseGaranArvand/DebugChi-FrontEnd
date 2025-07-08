"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AmoozeshiCard from "@/components/Tools/cards/AmoozeshiCard";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import VipProject from "./VipProject";
import Jumbotron from "./Jumbotron";



type Props = {
  data: Main[];
};

export interface Main {
  id: number;
  type_class: string;
  class_session: number;
  educational_heading: string;
  educational_heading_file: string;
  price: number;
  description: string;
  discount: number;
  created_at: Date;
  updated_at: Date;
  start_date: Date | null;
  end_date: Date | null;
  buffer_date: number;
  is_deleted: boolean;
  language: Language[];
  expertise: Expertise[];
  user: User;
}

export interface Expertise {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
}

export interface Language {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  image: string;
  video: null;
  level: string;
}

export interface User {
  id: number;
  email: string;
  username: string | null;
  image_profile: string | null;
  password: string;
  user_phone: string;
  first_name: string;
  last_name: string;
  user_expertise: string[];
}

const Amoozeshi = ({ data }: Props) => {
  const token = Cookies.get("token");
  let j_token:any;
  if (token) {
    j_token = jwtDecode(token);
  }
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedExpertises, setSelectedExpertises] = useState<string[]>([]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language]
    );
  };

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertises((prev) =>
      prev.includes(expertise)
        ? prev.filter((item) => item !== expertise)
        : [...prev, expertise]
    );
  };

  const filteredData = data.filter((item) => {
    const matchesLanguages =
      selectedLanguages.length === 0 ||
      item.language.some((lang) => selectedLanguages.includes(lang.name));
    const matchesExpertises =
      selectedExpertises.length === 0 ||
      item.expertise.some((exp) => selectedExpertises.includes(exp.title));
    return matchesLanguages && matchesExpertises;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <Jumbotron />
      <VipProject />

      {/* Cards Section */}
      <section className="container grid grid-cols-[25%_75%] gap-4 mx-auto py-12">
        <div className="sticky top-24 border max-h-fit p-4 rounded-md">
          <Accordion type="multiple"  className="w-full text-base">
            <AccordionItem value="languages">
              <AccordionTrigger>فیلتر براساس زبان</AccordionTrigger>
              <AccordionContent>
                {Array.from(new Set(data.flatMap((item) => item.language.map((lang) => lang.name)))).map(
                  (language) => (
                    <div key={language} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`lang-${language}`}
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                      />
                      <label htmlFor={`lang-${language}`}>{language}</label>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="expertises">
              <AccordionTrigger>فیلتر براساس تخصص</AccordionTrigger>
              <AccordionContent>
                {Array.from(new Set(data.flatMap((item) => item.expertise.map((exp) => exp.title)))).map(
                  (expertise) => (
                    <div key={expertise} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`exp-${expertise}`}
                        checked={selectedExpertises.includes(expertise)}
                        onChange={() => handleExpertiseChange(expertise)}
                      />
                      <label htmlFor={`exp-${expertise}`}>{expertise}</label>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredData.map((item) => (
            <AmoozeshiCard key={item.id} item={item} user_id={j_token.user_id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Amoozeshi;
