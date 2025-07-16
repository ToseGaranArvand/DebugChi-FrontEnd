"use client";

import { useState } from "react";
import { CounterItem } from "./CounterItem/CounterItem";

const TimeCounter = () => {
  const [month, setMonth] = useState(2);
  const [day, setDay] = useState(5);
  const [hour, setHour] = useState(22);
  const [minute, setMinute] = useState(56);

  return (
    <div className=" flex justify-center gap-4">
      <CounterItem label="دقیقه" value={minute} max={59} onChange={setMinute} />
      <CounterItem label="ساعت" value={hour} max={23} onChange={setHour} />
      <CounterItem label="روز" value={day} max={31} onChange={setDay} />
      <CounterItem label="ماه" value={month} max={12} onChange={setMonth} />
    </div>
  );
};

export { TimeCounter };
