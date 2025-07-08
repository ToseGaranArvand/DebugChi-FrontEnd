import { MessageCircle, Monitor, MonitorPlay, Phone } from "lucide-react";
import TimePicker from "./TimePicker";
import moment from "jalali-moment";

export function getDaysInCurrentShamsiMonth() {
  // تاریخ شمسی فعلی
  const shamsiNow = moment().locale("fa");
  const monthNumber = shamsiNow.jMonth() + 1; // شماره ماه فعلی
  const daysInMonth = shamsiNow.jDaysInMonth(); // تعداد روزهای ماه فعلی
  const today = Number(shamsiNow.format("D")); // روز فعلی
  const nextMonth = moment(shamsiNow).add(1, "jMonth"); // ماه بعد
  const nextMonthDaysInMonth = nextMonth.jDaysInMonth(); // تعداد روزهای ماه بعد
  const nextMonthNumber = nextMonth.jMonth(); // شماره ماه بعد

  // محاسبه روزهای ماه همراه با روزهای هفته
  const daysWithWeekdays = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1; // شماره روز
    const date = moment(shamsiNow).startOf("jMonth").add(index, "days"); // تاریخ هر روز
    const weekday = date.format("dddd"); // نام روز هفته
    return { day, weekday };
  });

  // محاسبه روزهای ماه بعد همراه با روزهای هفته
  const nextDaysInMonth = Array.from(
    { length: nextMonthDaysInMonth },
    (_, index) => {
      const day = index + 1; // شماره روز
      const date = moment(nextMonth).startOf("jMonth").add(index, "days"); // تاریخ هر روز
      const weekday = date.format("dddd"); // نام روز هفته
      return { day, weekday };
    }
  );

  // بازگشت نتیجه
  return {
    monthNumber,
    nextMonthNumber,
    daysInMonth,
    currentMonthName: shamsiNow.format("MMMM"), // نام ماه فعلی
    nextMonthName: nextMonth.format("MMMM"), // نام ماه بعد
    today,
    daysWithWeekdays,
    nextMonthWithWeekdays: nextDaysInMonth,
  };
}


export const UserRequestMode = [
  {
    value: "chat",
    label: "مشاوره متنی",
    icon: MessageCircle,
    price: 60000,
    component: <TimePicker />,
  },
  {
    value: "video_call",
    label: "دیباگ ریموت",
    icon: MonitorPlay,
    price: 90000,
    component: <TimePicker />,
  },

  {
    value: "voice_call",
    label: "مشاوره تلفنی",
    icon: Phone,
    price: 80000,

    component: <TimePicker />,
  },
];


export const findPriceByValue = (value:string) => {
  const mode = UserRequestMode.find((item) => item.value === value);
  return mode ? mode.price : 0; // Return null if no matching value is found
};

export const chooseConsultTime = [
  {
    time: 20,
    price: 0
  },
  {
    time: 40,
    price:10000
  },
  {
    time: 60,
    price:20000
  },
];

export const feedbackComments = [
  {
    id: 1,
    text: "این برنامه‌نویس با دقت بالایی کدها را بررسی می‌کند و اشکالات را به سرعت شناسایی می‌کند.",
    rating: 5,
    reviewer: "احمد",
    date: "2025-01-09T10:30:00Z",
  },
  {
    id: 2,
    text: "در توضیح مشکلات و راه‌حل‌ها بسیار شفاف عمل می‌کند و به خوبی مفاهیم را منتقل می‌کند.",
    rating: 4,
    reviewer: "سارا",
    date: "2025-01-08T14:15:00Z",
  },
  {
    id: 3,
    text: "گاهی اوقات بازه زمانی طولانی‌تری برای ارائه نتیجه می‌گیرد، اما کیفیت کارش بالا است.",
    rating: 4,
    reviewer: "محمد",
    date: "2025-01-07T16:45:00Z",
  },
  {
    id: 4,
    text: "توصیه‌های فنی او بسیار کاربردی هستند و منجر به بهبود عملکرد پروژه شدند.",
    rating: 5,
    reviewer: "مریم",
    date: "2025-01-06T09:00:00Z",
  },
  {
    id: 5,
    text: "نیاز به بهبود مهارت‌های ارتباطی دارد، ولی از لحاظ فنی بسیار قوی است.",
    rating: 3,
    reviewer: "حسین",
    date: "2025-01-05T12:20:00Z",
  },
  {
    id: 6,
    text: "در هنگام دیباگینگ بسیار جزئی‌نگر و حرفه‌ای عمل می‌کند. همچنین حواسش به جزئیات امنیتی است.",
    rating: 5,
    reviewer: "زهرا",
    date: "2025-01-04T18:10:00Z",
  },
  {
    id: 7,
    text: "گاهی اوقات در اولویت‌بندی مشکلات نیاز به کمک بیشتری دارد، ولی در کل مشاور خوبی است.",
    rating: 4,
    reviewer: "علی",
    date: "2025-01-03T11:30:00Z",
  },
  {
    id: 8,
    text: "درک عمیقی از پروژه داشت و مشکلات پیچیده را به خوبی حل کرد.",
    rating: 5,
    reviewer: "نرگس",
    date: "2025-01-02T15:50:00Z",
  },
  {
    id: 9,
    text: "با دقت گوش می‌دهد و دقیقاً روی مسائل مهم تمرکز می‌کند.",
    rating: 5,
    reviewer: "فرزاد",
    date: "2025-01-01T13:00:00Z",
  },
  {
    id: 10,
    text: "پیشنهادهای او باعث کاهش باگ‌ها و بهبود کیفیت کلی کد شد.",
    rating: 5,
    reviewer: "لیلا",
    date: "2024-12-31T08:45:00Z",
  },
];
