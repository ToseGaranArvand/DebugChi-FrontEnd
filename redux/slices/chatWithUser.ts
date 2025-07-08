import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseObjectInputType } from "zod";

interface AnswerProps  {
  id: number;
  answer: string;
};

interface Conversation {
  ai:boolean;
  message:string;
  analyze?:boolean;
}

interface Delay {
  state:boolean,
  message:string
}

interface ChatState {

  conversation:Conversation[];

}

const initialState: ChatState = {

  conversation: [],

};

const aiSlice = createSlice({
  name: "chatWithUser",
  initialState,
  reducers: {
    setConversation:(state,action:PayloadAction<Conversation>)=>{
      state.conversation.push(action.payload)
    }
  },
});

export const {

  setConversation,

} = aiSlice.actions;
export default aiSlice.reducer;
