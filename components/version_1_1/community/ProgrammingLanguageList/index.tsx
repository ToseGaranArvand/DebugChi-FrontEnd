"use client";
import { perform_get } from "@/lib/api";
import { Button, Spinner, Tooltip } from "@heroui/react";
import { ShieldAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

interface Status {
  error: boolean;
  loading: boolean;
}

interface ProgrammingLanguage {
  id: number;
  name: string;
  image: string;
}

const ProgrammingLanguageList = (props: Props) => {
  const [programmingList, setProgrammingList] = useState<ProgrammingLanguage[]>(
    []
  );
  const [status, setStatus] = useState<Status>({
    error: false,
    loading: false,
  });

  useEffect(() => {
    setStatus({ ...status, loading: true });

    const fetchData = async () => {
      try {
        const response = await perform_get("api/v1/programming-language/");
        if (response.status === 400) {
          setStatus({
            error: true,
            loading: false,
          });
          console.log(response);
        } else {
          setProgrammingList(response || []);
          setStatus({ error: false, loading: false });
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus({
          error: true,
          loading: false,
        });
      }
    };
    fetchData();
  }, []);

  // Group programming languages by name
  const groupedLanguages = programmingList.reduce((acc, language) => {
    if (!acc[language.name]) {
      acc[language.name] = [];
    }
    acc[language.name].push(language);
    return acc;
  }, {} as Record<string, ProgrammingLanguage[]>);

  if (status.loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner variant="wave" color="primary" size="sm" />
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ShieldAlertIcon color="red" />
        <span>خطای دریافت اطلاعات</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-3">
        {programmingList.map((language) => (
          <Tooltip content={language.name} key={language.id} showArrow placement="left">
            <Button
              isIconOnly
              size="lg"
              color="primary"
              className="flex items-center gap-2"
              variant="light"
              startContent={
                <div className="w-6 h-6 relative">
                  <Image
                    src={process.env.server + "/" + language.image}
                    alt={language.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              }
              onPress={() =>
                console.log(
                  `Selected language: ${language.name}, ID: ${language.id}`
                )
              }
            ></Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingLanguageList;
