import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import WaveSurfer from 'wavesurfer.js'

interface AudioRecorderProps {
  onUpload: (audioBlob: Blob) => void
  onClose: () => void
}

export default function AudioRecorder({ onUpload, onClose }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const waveformRef = useRef<WaveSurfer | null>(null)
  const waveformContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (waveformContainerRef.current) {
      waveformRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        height: 100,
      })
    }

    return () => {
      if (waveformRef.current) {
        waveformRef.current.destroy()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        if (waveformRef.current) {
          waveformRef.current.loadBlob(audioBlob)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleUpload = () => {
    if (audioBlob) {
      onUpload(audioBlob)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Audio</DialogTitle>
        </DialogHeader>
        <div ref={waveformContainerRef} className="w-full h-24 mb-4"></div>
        <div className="flex justify-center space-x-4 py-4">
          {!isRecording && !audioBlob && (
            <Button onClick={startRecording}>
              Start Recording
            </Button>
          )}
          {isRecording && (
            <Button variant="destructive" onClick={stopRecording}>
              Stop Recording
            </Button>
          )}
          {audioBlob && (
            <Button onClick={handleUpload}>
              Upload
            </Button>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

