"use client"

import * as React from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  aspectRatio?: string
  priority?: boolean
}

export function ZoomableImage({
  src,
  alt,
  className,
  width,
  height,
  aspectRatio = "aspect-square",
  priority = false,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const resetView = () => {
    setScale(1)
    setRotation(0)
  }

  return (
    <>
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg cursor-zoom-in",
          aspectRatio,
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority={priority}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetView()
      }}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <div className="relative w-full h-full min-h-[50vh]">
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full h-full overflow-auto p-4">
              <div 
                className="relative w-full h-full min-h-[50vh] transition-all duration-300 ease-out"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

