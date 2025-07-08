"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TimePickerProps {
  initialHour?: number
  initialMinute?: number
  onTimeChange?: (hour: number, minute: number) => void
  is24Hour?: boolean
}

export const TimePicker: React.FC<TimePickerProps> = ({
  initialHour = 12,
  initialMinute = 0,
  onTimeChange,
  is24Hour = true,
}) => {
  const [selectedHour, setSelectedHour] = useState(initialHour)
  const [selectedMinute, setSelectedMinute] = useState(initialMinute)
  const [isDraggingHour, setIsDraggingHour] = useState(false)
  const [isDraggingMinute, setIsDraggingMinute] = useState(false)

  const hourScrollRef = useRef<HTMLDivElement>(null)
  const minuteScrollRef = useRef<HTMLDivElement>(null)

  const hourRange = is24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1)

  const minuteRange = Array.from({ length: 60 }, (_, i) => i)

  // Generate time items with padding for smooth scrolling
  const hourItems = [...hourRange, ...hourRange, ...hourRange]
  const minuteItems = [...minuteRange, ...minuteRange, ...minuteRange]

  useEffect(() => {
    if (hourScrollRef.current && minuteScrollRef.current) {
      const hourItemHeight = 60
      const minuteItemHeight = 60

      hourScrollRef.current.scrollTop =
        hourRange.length * hourItemHeight + hourRange.indexOf(selectedHour) * hourItemHeight

      minuteScrollRef.current.scrollTop =
        minuteRange.length * minuteItemHeight + selectedMinute * minuteItemHeight
    }
  }, [hourRange, minuteRange, selectedHour, selectedMinute])

  useEffect(() => {
    if (onTimeChange && (initialHour !== selectedHour || initialMinute !== selectedMinute)) {
      onTimeChange(selectedHour, selectedMinute)
    }
  }, [selectedHour, selectedMinute, onTimeChange, initialHour, initialMinute])

  const handleHourScroll = () => {
    if (hourScrollRef.current && !isDraggingHour) {
      const scrollTop = hourScrollRef.current.scrollTop
      const itemHeight = 60
      const totalHeight = hourRange.length * itemHeight * 3

      // Handle looping
      if (scrollTop < itemHeight) {
        hourScrollRef.current.scrollTop = scrollTop + hourRange.length * itemHeight
      } else if (scrollTop > totalHeight - hourRange.length * itemHeight - itemHeight) {
        hourScrollRef.current.scrollTop = scrollTop - hourRange.length * itemHeight
      }

      const index = Math.round(scrollTop / itemHeight) % hourRange.length
      const hour = hourRange[index]
      if (hour !== undefined && hour !== selectedHour) {
        setSelectedHour(hour)
      }
    }
  }

  const handleMinuteScroll = () => {
    if (minuteScrollRef.current && !isDraggingMinute) {
      const scrollTop = minuteScrollRef.current.scrollTop
      const itemHeight = 60
      const totalHeight = minuteRange.length * itemHeight * 3

      // Handle looping
      if (scrollTop < itemHeight) {
        minuteScrollRef.current.scrollTop = scrollTop + minuteRange.length * itemHeight
      } else if (scrollTop > totalHeight - minuteRange.length * itemHeight - itemHeight) {
        minuteScrollRef.current.scrollTop = scrollTop - minuteRange.length * itemHeight
      }

      const index = Math.round(scrollTop / itemHeight) % minuteRange.length
      const minute = minuteRange[index]
      if (minute !== undefined && minute !== selectedMinute) {
        setSelectedMinute(minute)
      }
    }
  }

  const handleHourScrollEnd = () => {
    if (hourScrollRef.current) {
      const itemHeight = 60
      const targetScrollTop = Math.round(hourScrollRef.current.scrollTop / itemHeight) * itemHeight

      hourScrollRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      })
    }
  }

  const handleMinuteScrollEnd = () => {
    if (minuteScrollRef.current) {
      const itemHeight = 60
      const targetScrollTop = Math.round(minuteScrollRef.current.scrollTop / itemHeight) * itemHeight

      minuteScrollRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    // Add CSS to hide scrollbars but keep functionality
    const style = document.createElement("style")
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-2xl mb-8">انتخاب زمان</div>
      <div className="relative flex items-center justify-center">
        {/* Hour Picker */}
        <div
          className="w-20 h-[180px] overflow-hidden relative mx-2"
          onTouchStart={() => setIsDraggingHour(true)}
          onTouchEnd={() => {
            setIsDraggingHour(false)
            handleHourScrollEnd()
          }}
          onMouseDown={() => setIsDraggingHour(true)}
          onMouseUp={() => {
            setIsDraggingHour(false)
            handleHourScrollEnd()
          }}
          onMouseLeave={() => {
            if (isDraggingHour) {
              setIsDraggingHour(false)
              handleHourScrollEnd()
            }
          }}
        >
          <div
            ref={hourScrollRef}
            className="h-full overflow-auto scrollbar-hide"
            onScroll={handleHourScroll}
          >
            <div className="py-[60px]">
              {hourItems.map((hour, index) => (
                <div
                  key={`hour-${index}`}
                  className={`h-[60px] flex items-center justify-center text-2xl transition-all duration-200 ${
                    hour === selectedHour ? "text-white font-bold scale-110" : "text-gray-500"
                  }`}
                >
                  {hour.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-white text-2xl mx-2">:</div>

        {/* Minute Picker */}
        <div
          className="w-20 h-[180px] overflow-hidden relative mx-2"
          onTouchStart={() => setIsDraggingMinute(true)}
          onTouchEnd={() => {
            setIsDraggingMinute(false)
            handleMinuteScrollEnd()
          }}
          onMouseDown={() => setIsDraggingMinute(true)}
          onMouseUp={() => {
            setIsDraggingMinute(false)
            handleMinuteScrollEnd()
          }}
          onMouseLeave={() => {
            if (isDraggingMinute) {
              setIsDraggingMinute(false)
              handleMinuteScrollEnd()
            }
          }}
        >
          <div
            ref={minuteScrollRef}
            className="h-full overflow-auto scrollbar-hide"
            onScroll={handleMinuteScroll}
          >
            <div className="py-[60px]">
              {minuteItems.map((minute, index) => (
                <div
                  key={`minute-${index}`}
                  className={`h-[60px] flex items-center justify-center text-2xl transition-all duration-200 ${
                    minute === selectedMinute ? "text-white font-bold scale-110" : "text-gray-500"
                  }`}
                >
                  {minute.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selection indicator */}
        <div className="absolute pointer-events-none w-full h-[60px] border-t border-b border-[#3a3651] bg-[#2a2740]/30 top-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}
