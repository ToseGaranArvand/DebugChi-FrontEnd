"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Send } from "lucide-react";
import { io, type Socket } from "socket.io-client";
import { Button } from "@heroui/react";
import { MicIcon } from "@/components/ui/icons";
import { useAppDispatch } from "@/redux/store/store";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { v4 } from "uuid";
export default function AudioRecorder({
    session_id,
    reciever,
    sender,
}:
{
    session_id:string;
    reciever:string;
    sender:string;
}
) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState("Ready");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const dispatch = useAppDispatch()
  console.log(session_id,reciever,sender)
  // Connect to Socket.IO server when component mounts
  useEffect(() => {
    const socketInstance = io("http://localhost:3000");

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setStatus("Connected to server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setStatus("Disconnected from server");
    });

    socketInstance.on("audio-received", () => {
      setStatus("Audio received by server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        setStatus("Recording saved");

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
        sendAudio(audioBlob)
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setStatus("Recording...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setStatus("Error: Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    
    }
    
};

const sendAudio = (blob: Blob) => {
  if (socket && blob) {
    const previewUrl = URL.createObjectURL(blob);

    // Dispatch a local message with preview URL
    // dispatch(
    //   setMessage({
    //     session_id:session_id,
    //     sender:sender,
    //     receiver: reciever,
    //     data: {
    //       type: "audio",
    //       audioUrl: previewUrl,
    //       created_at: String(new Date()),
    //       status: "pending",
    //     },
    //   })
    // );

    setStatus("Sending audio...");

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && socket.connected) {
        socket.emit("send_audio", {
          session_id:session_id,
          sender:sender,
          receiver: reciever,
          data: {
            id:v4(),
            type: "audio",
            audioUrl: reader.result, // Base64 string
            created_at: String(new Date()),
            status: "pending",
          },
        });
        setStatus("Audio sent");
      }
    };

    reader.readAsDataURL(blob); // Convert blob to base64 string
  } else {
    setStatus("Error: Not connected or no audio recorded");
  }
};

  return (
    <>
      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <Button
            onPress={startRecording}
            isDisabled={!socket}
            isIconOnly
            className="bg-lime-300 text-background"
            radius="full"
            startContent={<MicIcon />}
          >
        
          </Button>
        ) : (
          <Button
            onPress={stopRecording}
            variant="flat"
            color="danger"
            startContent={<Square />}
            isIconOnly
          ></Button>
        )}
      </div>

      {/* {audioBlob && (
        <div className="flex flex-col gap-4">
          <audio
            src={URL.createObjectURL(audioBlob)}
            controls
            className="w-full"
          />
          <Button
            onPress={sendAudio}
            isIconOnly
            startContent={<Send />}
            isDisabled={!socket || !socket.connected}
          ></Button>
        </div>
      )} */}
    </>
  );
}
