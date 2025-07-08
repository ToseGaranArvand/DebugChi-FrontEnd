"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { WaveAudioPlayer } from "./wave-audio-player"
import { File } from 'lucide-react'
import Image from "next/image"

interface PreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "voice" | "image" | "file"
  file: File
  onConfirm: () => void
}

export default function PreviewDialog({
  open,
  onOpenChange,
  type,
  file,
  onConfirm
}: PreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string>("")

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file])

  const renderPreview = () => {
    switch (type) {
      case "voice":
        return (
          <div className="p-4 bg-muted/30 rounded-lg">
            <WaveAudioPlayer 
              url={previewUrl} 
              duration="0:00"
              height={80}
              waveColor="rgba(var(--primary), 0.3)"
              progressColor="rgb(var(--primary))"
            />
          </div>
        )
      case "image":
        return (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="پیش‌نمایش تصویر"
              fill
              className="object-contain"
            />
          </div>
        )
      case "file":
        return (
          <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
            <File className="w-12 h-12 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-3xl" dir="ltr">
        <DialogHeader>
          <DialogTitle>
            {type === "voice" && "پیش‌نمایش صدا"}
            {type === "image" && "پیش‌نمایش تصویر"}
            {type === "file" && "پیش‌نمایش فایل"}
          </DialogTitle>
        </DialogHeader>
        <div className="my-4">
          {renderPreview()}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            لغو
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            ارسال
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

