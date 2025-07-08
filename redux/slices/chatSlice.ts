import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  _id: string
  uuid: string
  first_name: string
  last_name: string
  image_profile: string
}

export interface Message {
  _id: string
  type: 'text' | 'file' | 'image' | 'audio' | 'code' | string
  sender: string
  receiver: string
  content: string
  fileUrl?: string
  language?: string // for code snippets
  createdAt: string | ''
  updatedAt: string | ''
}

interface ChatRoom {
  _id: string
  room_id: string
  open: boolean
  debuger: User
  applicator: User
  messages: Message[]
}

interface ChatState {
  chatRooms: ChatRoom[]
  selectedRoomId: string | null
  room_id:string | null
}

const initialState: ChatState = {
  chatRooms: [],
  selectedRoomId: null,
  room_id:null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.chatRooms = action.payload
    },
    selectRoom: (state, action: PayloadAction<string>) => {
      state.selectedRoomId = action.payload

    },
    selectRoomUUID:(state,action)=>{
        state.room_id = action.payload
    },
    addMessage: (state, action: PayloadAction<{ roomId: string, message: Message }>) => {
      const { roomId, message } = action.payload
      const room = state.chatRooms.find(room => room.room_id === roomId)
      if (room) {
        room.messages.push(message)
      }
    },
  },
})

export const { setChatRooms, selectRoom, addMessage ,selectRoomUUID} = chatSlice.actions

export default chatSlice.reducer

