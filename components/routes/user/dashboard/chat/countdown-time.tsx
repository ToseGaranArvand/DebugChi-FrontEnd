"use client"

import * as React from "react"
import { Timer } from 'lucide-react'

interface CountdownTimerProps {
  duration: number // in minutes
  onFinish: () => void
}

export function CountdownTimer({ duration, onFinish }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(duration * 60)
  
  React.useEffect(() => {
    if (timeLeft <= 0) {
      onFinish()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onFinish])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center gap-2 text-sm">
      <Timer className="h-4 w-4" />
      <span className="font-mono">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

