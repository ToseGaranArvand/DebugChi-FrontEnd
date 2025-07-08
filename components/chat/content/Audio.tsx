"use client";
import { Avatar, Button, Slider, SliderValue } from "@heroui/react";
import { CheckCheck, Play, Pause } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const AudioContent = () => {
  const [time, setTime] = useState<SliderValue>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setTime(audioRef.current?.currentTime || 0);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: SliderValue) => {
    setTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value as number;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full h-auto box-border p-4 flex flex-col gap-2">
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Name"
        size="sm"
      />
      <div className="w-max box-border min-h-14 rounded-r-full bg-purple-800 px-4 rounded-bl-full flex gap-4 items-center">
        <audio ref={audioRef}>
          <source src="/sound/test.mp3" type="audio/mp3" />
        </audio>
        <Button
          startContent={isPlaying ? <Pause /> : <Play />}
          size="md"
          isIconOnly
          variant="faded"
          color="secondary"
          radius="full"
          onPress={togglePlayPause}
        />
        <span>{formatTime(Number(time))}</span>
        <Slider
          aria-label="Audio Progress"
          className="w-96"
          value={time}
          onChange={handleSliderChange}
          minValue={0}
          maxValue={audioRef.current?.duration || 60}
          size="sm"
          step={1}
        />
      </div>
    </div>
  );
};

export default AudioContent;
