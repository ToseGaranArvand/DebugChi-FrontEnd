import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Square } from 'lucide-react';

// Import WaveSurfer and RecordRTC dynamically
let WaveSurfer: any;
let RecordRTC: any;

if (typeof window !== "undefined") {
  WaveSurfer = require('wavesurfer.js');
  RecordRTC = require('recordrtc');
}

interface VoiceRecorderProps {
  onUpload: (audioBlob: Blob) => void;
  onClose: () => void;
}

export default function VoiceRecorder({ onUpload, onClose }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<any | null>(null);
  const waveformRef = useRef<any | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && waveformContainerRef.current && WaveSurfer) {
      // Initialize WaveSurfer
      waveformRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        height: 100,
      });
    }
  
    return () => {
      // Ensure waveformRef.current is valid before calling destroy
      if (waveformRef.current) {
        waveformRef.current.destroy();
        waveformRef.current = null; // Clean up the ref
      }
    };
  }, []);

  const startRecording = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      console.error('Recording is not supported in this environment');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        recorderType: RecordRTC.StereoAudioRecorder,
        timeSlice: 1000,
        ondataavailable: (blob: Blob) => {
          if (waveformRef.current) {
            waveformRef.current.loadBlob(blob);
          }
        },
      });

      mediaRecorderRef.current.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stopRecording(() => {
        const blob = mediaRecorderRef.current?.getBlob();
        if (blob) {
          setAudioBlob(blob);
          if (waveformRef.current) {
            waveformRef.current.loadBlob(blob);
          }
        }
      });
      setIsRecording(false);
    }
  };

  const handleUpload = () => {
    if (audioBlob) {
      onUpload(audioBlob);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ضبط صدا</DialogTitle>
        </DialogHeader>
        <div ref={waveformContainerRef} className="w-full h-24 mb-4" dir='ltr'></div>
        <div className="flex justify-center space-x-4 py-4">
          {!isRecording && !audioBlob && (
            <Button onClick={startRecording}>
              <Mic className="h-4 w-4 mr-2" />
              شروع ضبط
            </Button>
          )}
          {isRecording && (
            <Button variant="destructive" onClick={stopRecording}>
              <Square className="h-4 w-4 mr-2" />
              توقف ضبط
            </Button>
          )}
          {audioBlob && (
            <Button onClick={handleUpload}>
              ارسال
            </Button>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            لغو
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
