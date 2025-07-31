// base
import { FC, ReactElement } from "react";
// lib
import DatePicker, {
  CustomComponentProps,
  DateObject,
} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";

import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import "react-multi-date-picker/styles/colors/purple.css";

// calendars & locales
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// style
import "./ui.css";

const toEnglishDigits = (value: string) => {
  return value.replace(/[۰-۹]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) - 1728)
  );
};

interface IFullDatePickerPropTypes {
  value?: any;
  onChange?: (e: any) => void;
  onRawChange?: (date: DateObject) => void;
  className?: string;
  highlightToday?: boolean;
  placeholder?: string;
  animations?: any;
  calendar?: any;
  locale?: any;
  plugins?: any;
  format?: string;
  render?: ReactElement<CustomComponentProps>;
  calendarPosition?: string;
  weekPicker?: boolean;
  minDate?: Date | string;
}

const FullDatePicker: FC<IFullDatePickerPropTypes> = ({
  value,
  onChange,
  onRawChange,
  className = "purple",
  highlightToday = true,
  placeholder = "",
  calendar = persian,
  locale = persian_fa,
  plugins = [weekends([5, 6])],
  format,
  render,
  calendarPosition,
  weekPicker,minDate
}): JSX.Element => {
  return (
    <div>
      <DatePicker
        className={className}
        render={render}
        format={format}
        value={value}
        onChange={(date) => {
          if (weekPicker && Array.isArray(date)) {
            const raw = date.map((data) => data.format("YYYY/MM/DD"));
            const formatted = raw.map((d) => toEnglishDigits(d));
            onChange?.(formatted);
          } else {
            onRawChange?.(date as DateObject);
            const raw = (date as DateObject)?.format("YYYY/MM/DD");
            const formatted = raw ? toEnglishDigits(raw) : null;
            onChange?.(formatted);
          }
        }}
        highlightToday={highlightToday}
        placeholder={placeholder}
        calendar={calendar}
        locale={locale}
        plugins={plugins}
        calendarPosition={calendarPosition}
        weekPicker={weekPicker}
        minDate={minDate}
      />
    </div>
  );
};

export { FullDatePicker };
