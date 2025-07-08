"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play } from 'lucide-react'
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  url: string
  duration: string
}

export function AudioPlayer({ url, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  React.useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        setProgress((audio.currentTime / audio.duration) * 100)
      })
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setProgress(0)
      })
    }
  }, [])

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <audio ref={audioRef} src={url} />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Slider
        value={[progress]}
        max={100}
        step={1}
        className="flex-1"
        onValueChange={(value) => {
          if (audioRef.current) {
            const time = (value[0] / 100) * audioRef.current.duration
            audioRef.current.currentTime = time
            setProgress(value[0])
          }
        }}
      />
      <span className="text-xs">{duration}</span>
    </div>
  )
}

