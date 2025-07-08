'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store/store';
import { addMessage, setChatRooms } from '@/redux/slices/chatSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, Send, Code } from 'lucide-react';
import MessageItem from './MessageItem';
import FileUpload from './FileUpload';
import VoiceRecorder from './VoiceRecorder';
import CodeSnippetDialog from './CodeSnippetDialog';
import {socket} from '@/config/socket-config';
import { toBase64 } from '@/utils/tools';

type Props = {
  uuid: string;
};

export default function ChatArea({ uuid }: Props) {
  const [inputMessage, setInputMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const selectedRoomId = useAppSelector((state: RootState) => state.chat.selectedRoomId);
  const chatRooms = useAppSelector((state: RootState) => state.chat.chatRooms);
  const selectedRoom = chatRooms.find((room) => room._id === selectedRoomId);
  const dispatch = useAppDispatch();
  const roomUUId = useAppSelector((state:RootState)=>state.chat.room_id);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentUser = selectedRoom?.debuger.uuid === uuid ? selectedRoom?.debuger._id : selectedRoom?.applicator._id;

  useEffect(() => {
    socket.emit('get_room', { debuger: uuid });
    socket.on('room_list', (data:any) => {
      console.log(data);
      dispatch(setChatRooms(data));
      data.forEach((room: any) => {
        socket.emit('join_room', { room_id: room.room_id, user_id: uuid });
      });
    });
    socket.on('receive_message', (data:any) => {
      dispatch(addMessage({roomId:data.room_id,message:{
        _id: Date.now().toString(),
        type: data.message.type,
        sender: data.sender_id,
        receiver: data.receiver_id,
        content: data.message.content,
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
      }}));
      console.log(data);
      scrollToBottom();
      playNotificationSound();
    });

    return () => {
      socket.off('room_list');
      socket.off('receive_message');
    };
  }, [dispatch, uuid]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedRoom?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedRoomId) {
      const isDebuger = selectedRoom?.debuger.uuid === uuid;
      const newMessage = {
        _id: Date.now().toString(),
        type: 'text',
        sender: isDebuger ? selectedRoom?.debuger.uuid : selectedRoom?.applicator.uuid || '',
        receiver: isDebuger ? selectedRoom?.applicator.uuid : selectedRoom?.debuger.uuid || '',
        content: inputMessage,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      };
      
      socket.emit('send_message',{
        room_id:roomUUId,
        message:{
          sender_id:newMessage.sender,
          receiver_id:newMessage.receiver,
          content:newMessage.content,
          type:newMessage.type,
          fileName:"",
          file:""
        },
      });
      setInputMessage('');
      // Remove the local dispatch to prevent duplicate messages
      // dispatch(addMessage({ roomId: selectedRoomId, message: newMessage }));
    }
  };

  const handleFileUpload = async (file: File) => {
    const to_base64 = await toBase64(file);
    console.log(to_base64);
    if (selectedRoomId && selectedRoom) {
      const isDebuger = selectedRoom.debuger.uuid === uuid;
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newMessage = {
          _id: Date.now().toString(),
          type: file.type.startsWith('image/') ? 'image' : 'file',
          sender: isDebuger ? selectedRoom.debuger.uuid : selectedRoom.applicator.uuid,
          receiver: isDebuger ? selectedRoom.applicator.uuid : selectedRoom.debuger.uuid,
          content: file.name,
          fileUrl: content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        socket.emit('send_message',{
          room_id:roomUUId,
          message:{
            sender_id:newMessage.sender,
            receiver_id:newMessage.receiver,
            content:newMessage.content || '',
            type:newMessage.type,
            fileName:file.name,
            file:to_base64
          },
        });
        // Remove the local dispatch to prevent duplicate messages
        // dispatch(addMessage({ roomId: selectedRoomId, message: newMessage }));
      };
      reader.readAsDataURL(file);
    }
    setShowFileUpload(false);
  };

  const handleVoiceUpload = (audioBlob: Blob) => {
    if (selectedRoomId && selectedRoom) {
      const isDebuger = selectedRoom.debuger.uuid === uuid;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newMessage = {
          _id: Date.now().toString(),
          type: 'audio',
          sender: isDebuger ? selectedRoom.debuger._id : selectedRoom.applicator._id,
          receiver: isDebuger ? selectedRoom.applicator._id : selectedRoom.debuger._id,
          content: 'Voice message',
          fileUrl: content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        socket.emit('send_message', {
          room_id: roomUUId,
          message: {
            sender_id: newMessage.sender,
            receiver_id: newMessage.receiver,
            content: newMessage.content,
            type: newMessage.type,
            fileName: 'audio.mp3',
            file: content,
          },
        });
        // Remove the local dispatch to prevent duplicate messages
        // dispatch(addMessage({ roomId: selectedRoomId, message: newMessage }));
      };
      reader.readAsDataURL(audioBlob);
    }
    setShowVoiceRecorder(false);
  };

  const handleCodeSnippetSend = (code: string, language: string) => {
    if (selectedRoomId && selectedRoom) {
      const isDebuger = selectedRoom.debuger.uuid === uuid;
      const newMessage = {
        _id: Date.now().toString(),
        type: 'code',
        sender: isDebuger ? selectedRoom.debuger.uuid : selectedRoom.applicator.uuid,
        receiver: isDebuger ? selectedRoom.applicator.uuid : selectedRoom.debuger.uuid,
        content: code,
        language: language,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      socket.emit('send_message',{
        room_id:roomUUId,
        message:{
          sender_id:newMessage.sender,
          receiver_id:newMessage.receiver,
          content:newMessage.content || '',
          type:newMessage.type,
          fileName:'',
          file:'',
          language:newMessage.language,
        },
      });
      // Remove the local dispatch to prevent duplicate messages
      // dispatch(addMessage({ roomId: selectedRoomId, message: newMessage }));
    }
    setShowCodeSnippet(false);
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">لطفاً یک چت را برای شروع انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[90vh]" dir='ltr'>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <AnimatePresence>
          {selectedRoom.messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MessageItem message={message} currentUserId={currentUser || ''} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setShowFileUpload(true)}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowVoiceRecorder(true)}>
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowCodeSnippet(true)}>
            <Code className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showFileUpload && <FileUpload onUpload={handleFileUpload} onClose={() => setShowFileUpload(false)} />}
      {showVoiceRecorder && <VoiceRecorder onUpload={handleVoiceUpload} onClose={() => setShowVoiceRecorder(false)} />}
      {showCodeSnippet && <CodeSnippetDialog onSend={handleCodeSnippetSend} onClose={() => setShowCodeSnippet(false)} />}
      <audio ref={audioRef} src="/sound/new_message.wav" />
    </div>
  );
}

