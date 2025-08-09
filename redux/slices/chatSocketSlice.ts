// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Main } from "@/components/types/testChat.type";

const initialState: Main[] = [];

const chatSlice = createSlice({
  name: "chatSocket",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Main[]>) => {
      // کل لیست پیام‌ها را جایگزین می‌کند
      return action.payload;
    },

    setMessage: (state, action: PayloadAction<Main>) => {
      // پیام جدید را به آرایه اضافه می‌کند
      state.push(action.payload);
    },

    setSatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "sent" | "pending" | "recieved";
      }>
    ) => {
      return state.map((item) =>
        item.data.id === action.payload.id
          ? {
              ...item,
              data: {
                ...item.data,
                status: action.payload.status,
              },
            }
          : item
      );
    },

    setRead: (state) => {
      state.forEach((item) => {
        if (item.data.status === "sent") {
          item.data.status = "recieved";
        }
      });
    },
  },
});

export const { setMessage, setSatus, setRead, setData } = chatSlice.actions;
export default chatSlice.reducer;
