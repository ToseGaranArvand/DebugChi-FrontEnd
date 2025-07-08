"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface DottedBackgroundProps {
  dotColor?: string
  hoverColor?: string
  dotSize?: number
  spacing?: number
  hoverRadius?: number
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({
  dotColor = "#000000",
  hoverColor = "#ff0000",
  dotSize = 1,
  spacing = 20,
  hoverRadius = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawDots = (mouseX = -1000, mouseY = -1000) => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)

          if (distance <= hoverRadius) {
            ctx.fillStyle = hoverColor
          } else {
            ctx.fillStyle = dotColor
          }

          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawDots()
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      drawDots(mouseX, mouseY)
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", () => drawDots())

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", () => drawDots())
    }
  }, [dotColor, hoverColor, dotSize, spacing, hoverRadius])

  return <canvas ref={canvasRef} className="inset-0 w-full h-full absolute" />
}

export default DottedBackground

