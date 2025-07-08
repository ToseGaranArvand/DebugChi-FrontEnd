"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  onChange: (time: string) => void
}

export function TimePicker({ onChange }: TimePickerProps) {
  const [hour, setHour] = React.useState<string>("00")
  const [minute, setMinute] = React.useState<string>("00")

  React.useEffect(() => {
    onChange(`${hour}:${minute}`)
  }, [hour, minute, onChange])

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="time-picker">Select Time</Label>
      <div className="flex space-x-2">
        <Select onValueChange={setHour} value={hour}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                {hour.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-2xl">:</span>
        <Select onValueChange={setMinute} value={minute}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                {minute.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

