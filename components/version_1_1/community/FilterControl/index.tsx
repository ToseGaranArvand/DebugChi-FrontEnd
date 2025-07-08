"use client";

import React, { Suspense } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
  Select,
  SelectItem,
  Divider,
} from "@heroui/react";
import { Search, Filter, X, FilterIcon } from "lucide-react";
import { useFilter } from "@/context/AllDebugersContext";
import { languages } from "./data";
import { Item } from "@radix-ui/react-select";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const FilterControls: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedExpertise,
    toggleExpertise,
    selectedLanguages,
    toggleLanguage,
    sortOption,
    setSortOption,
    resetFilters,
    availableExpertise,
    availableLanguages,
    filteredUsers,
  } = useFilter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <Suspense fallback={<div>Loading..</div>}>

    <div className="w-full mb-6 space-y-4 sticky top-0 bg-community p-4 box-border  px-20 z-[50]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center justify-center gap-2">
          <Input
            className="max-w-xl"
            variant="bordered"
            color="default"
            radius="full"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search className="text-default-400" size={18} />}
            endContent={
              searchTerm && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setSearchTerm("")}
                >
                  <X size={14} />
                </Button>
              )
            }
          />

          {/* <Button
            color="danger"
            variant="flat"
            onPress={resetFilters}
            startContent={<FilterIcon size={14} />}
            isDisabled={
              !searchTerm &&
              selectedExpertise.length === 0 &&
              selectedLanguages.length === 0 &&
              sortOption === "score_high"
            }
          >
            حذف فیلتر ها
          </Button> */}
        </div>
      </div>
      <Divider />
      <div className="flex gap-4">
        <Button
          color={type == "debugers" ? "primary" : "default"}
          variant={type == "debugers" ? "solid" : "flat"}
          size="lg"
          radius="full"
          as={Link}
          href="/community?type=debugers"
        >
          مدرسین و دیباگر ها
        </Button>
        <Button
          color={type == "courses" ? "primary" : "default"}
          variant={type == "courses" ? "solid" : "flat"}
          size="lg"
          as={Link}
          radius="full"
          href="/community?type=courses"
        >
          ویدیو ها
        </Button>
      </div>
      <div className="flex  gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              startContent={<Filter size={16} />}
              size="sm"
            >
              مهارت{" "}
              {selectedExpertise.length > 0 && `(${selectedExpertise.length})`}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Expertise filters"
            selectionMode="multiple"
            selectedKeys={new Set(selectedExpertise)}
          >
            {availableExpertise.map((expertise) => (
              <DropdownItem
                key={expertise}
                onPress={() => toggleExpertise(expertise)}
              >
                {expertise}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Languages dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              startContent={<Filter size={16} />}
              size="sm"
            >
              زبان{" "}
              {selectedLanguages.length > 0 && `(${selectedLanguages.length})`}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Language filters"
            selectionMode="multiple"
            selectedKeys={new Set(selectedLanguages)}
          >
            {availableLanguages.map((language) => (
              <DropdownItem
                key={language}
                onPress={() => toggleLanguage(language)}
              >
                {language}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="flex-1 overflow-x-auto gap-2 flex scrollbar-hide z-50">
          {languages.map((item, index) => {
            return (
              <Button
                size="sm"
                variant={selectedLanguages.includes(item) ? 'solid'  : 'flat'}
                color={selectedLanguages.includes(item) ? "primary" : 'default'}
                radius="md"
                onPress={() => toggleLanguage(item)}
                key={index + 1}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>
      <Divider />

      {(selectedExpertise.length > 0 || selectedLanguages.length > 0) && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedExpertise.map((exp) => (
            <Chip
              key={`exp-${exp}`}
              onClose={() => toggleExpertise(exp)}
              variant="flat"
              color="primary"
            >
              {exp}
            </Chip>
          ))}

          {selectedLanguages.map((lang) => (
            <Chip
              key={`lang-${lang}`}
              onClose={() => toggleLanguage(lang)}
              variant="flat"
              color="secondary"
            >
              {lang}
            </Chip>
          ))}
        </div>
      )}
    </div>
    </Suspense>

  );
};

export default FilterControls;
