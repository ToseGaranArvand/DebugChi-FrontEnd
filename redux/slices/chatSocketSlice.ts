import { Main } from "@/components/types/testChat.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseObjectInputType } from "zod";




const initialState: Main[] = []; // مقدار اولیه یک آرایه از چت‌ها است

const aiSlice = createSlice({
  name: "chatSocket",
  initialState,
  reducers: {
    setData:(state,action:PayloadAction<any>)=>{
    return action.payload
    },
    setMessage: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },

    setSatus:(state,action:PayloadAction<{id:string,status: "sent" | "pending" | "recieved"}>)=>{
      console.log(action.payload.id)
        const msg = state.findIndex((item) => item.session_id === action.payload.id); 
        console.log(state[msg])// پیدا کردن ایتم بر اساس id
        if (msg) { // اگر پیام پیدا شد
          // state[msg].data.status = action.payload.status
        }
    },
    setRead :(state)=>{
      state.forEach((item) => {
        if (item.data.status === "sent") {
          item.data.status = "recieved"; // تغییر وضعیت پیام به "recieved"
        }
      });
    }
  },
});

export const { setMessage,setSatus,setRead ,setData} = aiSlice.actions;
export default aiSlice.reducer;