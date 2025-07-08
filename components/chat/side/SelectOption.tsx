import { Select, SelectItem } from "@heroui/react";

export const techCategories = [
  { key: "web_dev", label: "وب" },
  { key: "mobile_dev", label: "موبایل" },
  { key: "game_dev", label: "بازی" },
  { key: "ai", label: "AI" },
  { key: "ml", label: "یادگیری ماشین" },
  { key: "cloud", label: "رایانش ابری" },
  { key: "cybersecurity", label: "امنیت سایبری" },
  { key: "data_science", label: "علم داده" },
  { key: "devops", label: "دِوآپس (DevOps)" },
  { key: "software_testing", label: "تست نرم‌افزار" },
  { key: "UI/UX", label: "UI/UX" },
  { key: "blockchain", label: "توسعه بلاک‌چین" },
  { key: "iot", label: "اینترنت اشیاء" },
];

export default function SelectOption() {

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select className="max-w-xs text-xs" defaultSelectedKeys={["web_dev"]} aria-label="select-language">
        {techCategories.map((category) => (
          <SelectItem  key={category.key}>{category.label}</SelectItem>
        ))}
      </Select>
    </div>

  );
}
