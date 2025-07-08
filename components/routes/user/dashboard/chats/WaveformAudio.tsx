import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformAudioProps {
  audioUrl: string;
}

export default function WaveformAudio({ audioUrl }: WaveformAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isWaveformReady = false;
  
    if (waveformContainerRef.current) {
      waveformRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        height: 50,
      });
  
      waveformRef.current.load(audioUrl);
  
      waveformRef.current.on('ready', () => {
        isWaveformReady = true;
        setDuration(waveformRef.current?.getDuration() || 0);
      });
  
      waveformRef.current.on('finish', () => {
        setIsPlaying(false);
      });
    }
  
    return () => {
      if (waveformRef.current && isWaveformReady) {
        try {
          waveformRef.current.destroy();
          waveformRef.current = null;
        } catch (error) {
          console.error("Error destroying WaveSurfer instance:", error);
        }
      }
    };
  }, [audioUrl]);
  

  const togglePlayPause = () => {
    if (waveformRef.current) {
      if (isPlaying) {
        waveformRef.current.pause();
      } else {
        waveformRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background p-2 rounded-lg">
      <div ref={waveformContainerRef} className="w-full h-12 mb-2"></div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="text-sm">
          {formatTime(waveformRef.current?.getCurrentTime() || 0)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
