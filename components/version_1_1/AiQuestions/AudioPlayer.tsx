"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@heroui/react";

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src={audioSrc || "/sounds/default-message.mp3"}
        onEnded={handleAudioEnd}
        className="hidden"
      />
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onPress={togglePlay}
        className="text-lime-300"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </Button>
    </div>
  );
};

export default AudioPlayer;
