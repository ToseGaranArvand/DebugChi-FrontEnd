import { jwtDecode } from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import moment from "jalali-moment";
import Cookies from "js-cookie";
export type JWTPayload = {
  user_id: number;
  exp: number;
  // Add other JWT fields as needed
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getCookies = (token: string) => {
  let _token = Cookies.get(token);
  if (_token != undefined) {
    return _token;
  }
};

export const formatCurrency = (
  number: number,
  icon?: boolean,
  text?: boolean
) => {
  if (icon) {
    return `${number.toLocaleString("fa-IR")}`;
  }
  if (text) {
    return number.toLocaleString("fa-IR");
  }
  return number.toLocaleString("fa-IR") + " تومان";
};

export const formatTimeAgo = (timestamp: string) => {
  return formatDistanceToNow(timestamp, { addSuffix: true, locale: faIR });
};

export function convertShamsiToGregorian(shamsiDateTime: string): string {
  console.log(shamsiDateTime);
  // بررسی ورودی شامل تاریخ و ساعت
  if (!moment(shamsiDateTime, "jYYYY/jMM/jDD HH:mm:ss", true).isValid()) {
    throw new Error(
      "تاریخ و ساعت شمسی نامعتبر است. لطفاً فرمت YYYY/MM/DD HH:mm:ss را رعایت کنید."
    );
  }
  // تبدیل تاریخ و ساعت شمسی به میلادی
  const gregorianDateTime = moment
    .from(shamsiDateTime, "fa", "jYYYY/jMM/jDD HH:mm:ss")
    .format("YYYY-MM-DD HH:mm:ss");
  console.log(gregorianDateTime);
  return gregorianDateTime;
}

// مثال استفاده
export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getMonthNames = (locale = "en-US") => {
  return Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1).toLocaleString(locale, { month: "long" })
  );
};

export const getCurrentPersianMonth = () => {
  return new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(new Date());
};

export const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/(.{4})/g, "$1-").slice(0, -1);
};

export function deepSearch(obj: any, keyword: string): boolean {
  const lowerKeyword = keyword.toLowerCase();

  if (typeof obj === "string") {
    return obj.toLowerCase().includes(lowerKeyword);
  }

  if (Array.isArray(obj)) {
    return obj.some((item) => deepSearch(item, keyword));
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).some((value) => deepSearch(value, keyword));
  }

  return false;
}
