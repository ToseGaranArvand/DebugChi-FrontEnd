"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function NavigationProgress() {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // When the URL changes, start the loading animation
    setIsNavigating(true)
    setProgress(0)

    // Quickly move to 80% to give the impression of loading
    const timer1 = setTimeout(() => {
      setProgress(80)
    }, 100)

    // Complete the loading after a short delay
    const timer2 = setTimeout(() => {
      setProgress(100)

      // Hide the loader after it completes
      const timer3 = setTimeout(() => {
        setIsNavigating(false)
        setProgress(0)
      }, 200)

      return () => clearTimeout(timer3)
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-300 ease-out",
        isNavigating ? "opacity-100" : "opacity-0",
      )}
      style={{ width: `${progress}%` }}
    />
  )
}

