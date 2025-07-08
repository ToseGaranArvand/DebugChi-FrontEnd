// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  sign_up: boolean;
  login: boolean;
  side: boolean;
  showRequest: boolean;
  more_request: boolean;
  find_user: boolean;
  path?: string;
  welcome?:boolean;
  answerMessage?:string;
  payed:boolean,
  showNewRequest?:boolean
}

const initialState: CounterState = {
  value: 0,
  sign_up: false,
  login: false,
  side: true,
  showRequest: false,
  more_request: false,
  find_user: false,
  path: "",
  welcome:true,
  answerMessage:"",
  payed:false,
  showNewRequest:false
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showSignUp: (state, action:PayloadAction<{show:boolean,path:string}>) => {
      state.login = false;
      state.sign_up = action.payload.show;
      state.path = action.payload.path;
    },
    showLogin: (
      state,
      action: PayloadAction<{ show: boolean; path: string }>
    ) => {
      state.sign_up = false;
      state.login = action.payload.show;
      state.path = action.payload.path;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    OpenSideBar: (state, action: PayloadAction<boolean>) => {
      state.side = action.payload;
    },
    setShowRequest: (state, action: PayloadAction<boolean>) => {
      state.showRequest = action.payload;
    },
    showMoreRequest: (state, action: PayloadAction<boolean>) => {
      state.more_request = action.payload;
    },
    setFindUser: (state, action: PayloadAction<boolean>) => {
      state.find_user = action.payload;
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    setClearPath: (state) => {
      state.path = "";
    },
    setWelcome:(state,action:PayloadAction<boolean>)=>{
      state.welcome = action.payload
    },
    setAnswerMessage:(state,action:PayloadAction<string>)=>{
      state.answerMessage = action.payload
    },
    setPayed:(state,action:PayloadAction<boolean>)=>{
      state.payed = action.payload
    },
    setShowNewRequest:(state,action:PayloadAction<boolean>)=>{
      state.showNewRequest = action.payload
    }

  },
});

export const {
  setAnswerMessage,
  setWelcome,
  showLogin,
  showSignUp,
  incrementByAmount,
  OpenSideBar,
  showMoreRequest,
  setShowRequest,
  setFindUser,
  setPath,
  setClearPath,
  setShowNewRequest
} = globalSlice.actions;
export default globalSlice.reducer;
