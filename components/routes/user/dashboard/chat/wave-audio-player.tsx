"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import WaveSurfer from 'wavesurfer.js'

interface WaveAudioPlayerProps {
  url: string
  duration: string
  waveColor?: string
  progressColor?: string
  height?: number
}

export function WaveAudioPlayer({ 
  url, 
  duration,
  waveColor = 'white',
  progressColor = 'rgb(var(--primary))',
  height = 48 
}: WaveAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState("0:00")
  const [volume, setVolume] = React.useState(1)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isReady, setIsReady] = React.useState(false)
  const waveformRef = React.useRef<HTMLDivElement>(null)
  const wavesurferRef = React.useRef<WaveSurfer | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined' && waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor, 
        progressColor,
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height,
        normalize: true,
        fillParent: true,
        interact: true,
        hideScrollbar: true,
        autoplay: false,
        barHeight: 1,
        mediaControls: false,
      })

      wavesurferRef.current.load(url)

      wavesurferRef.current.on('ready', () => {
        setIsReady(true)
      })

      wavesurferRef.current.on('audioprocess', () => {
        if (wavesurferRef.current) {
          const time = Math.floor(wavesurferRef.current.getCurrentTime())
          const minutes = Math.floor(time / 60)
          const seconds = time % 60
          setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`)
        }
      })

      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false)
      })

      return () => {
        if (wavesurferRef.current && isReady) {
            wavesurferRef.current.destroy();
            wavesurferRef.current = null; // مرجع را خالی کنید
          }
      }
    }
  }, [url, waveColor, progressColor, height])

  const togglePlay = () => {
    if (wavesurferRef.current && isReady) {
      if (isPlaying) {
        wavesurferRef.current.pause()
      } else {
        wavesurferRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (wavesurferRef.current) {
      if (isMuted) {
        wavesurferRef.current.setVolume(volume)
      } else {
        wavesurferRef.current.setVolume(0)
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume)
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  return (
    <div className="space-y-2 min-w-[300px]" dir="ltr">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 transition-all hover:scale-105"
          onClick={togglePlay}
          disabled={!isReady}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <span className="text-xs min-w-[60px] font-mono">
          {currentTime} / {duration}
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            className="w-24"
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
      <div 
        ref={waveformRef} 
        className="w-full rounded-lg overflow-hidden transition-all hover:opacity-90"
        style={{
          background: 'var(--muted)',
          padding: '8px',
        }}
      />
    </div>
  )
}

