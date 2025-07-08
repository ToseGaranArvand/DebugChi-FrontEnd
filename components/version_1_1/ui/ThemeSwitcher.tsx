"use client"

import { Button, Tooltip } from "@heroui/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render the same structure regardless of theme to avoid hydration mismatch
  // Only change the icon and functionality after mounting
  return (
    <Tooltip content={mounted && theme === "dark" ? "تاریک" : "روشن"} placement="right">
   
          <Button
            variant="light"
            size="lg"
            radius="full"
            
            isIconOnly
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            disabled={!mounted}
            startContent={  mounted && theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          >
          
          </Button>
      </Tooltip>
  )
}

