import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswerProps {
  id: number;
  answer: string;
}

interface Conversation {
  ai: boolean;
  message: string;
  analyze?: boolean;
  sound?: string;
}

interface Delay {
  state: boolean;
  message: string;
}

interface AiState {
  disabled: boolean;
  question_id: number;
  selected_answers: number[];
  addedAnswers: AnswerProps[];
  selected_category: any;
  description: string;
  answer_colors: {
    [key: number]:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "default";
  };
  answers: string[];
  debuggers: any[];
  is_last_question: boolean;
  conversation: Conversation[];
  delay: Delay;
}

const initialState: AiState = {
  description: "",
  addedAnswers: [],
  disabled: true,
  question_id: 0,
  selected_answers: [],
  selected_category: null,
  answer_colors: {},
  answers: [],
  debuggers: [],
  is_last_question: false,
  conversation: [],
  delay: {
    state: false,
    message: "",
  },
};

const aiSlice = createSlice({
  name: "aiQuestion",
  initialState,
  reducers: {
    addCustomAnswer: (state, action: PayloadAction<AnswerProps>) => {
      state.addedAnswers.push(action.payload);
      state.selected_answers.push(action.payload.id); 
    },
    clearAddedAnswers: (state) => {
      state.addedAnswers = [];
    },
    setContinue: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload;
    },
    showQuestion: (state, action: PayloadAction<number>) => {
      state.question_id = action.payload;
      // وقتی سوال تغییر کرد، پاسخ‌های قبلی ریست شوند
      state.selected_answers = [];
    },

    // ـــــــــــــــــــــــــــــ تغییر اصلی در این اکشن ـــــــــــــــــــــــــــــ
    toggleAnswer: (state, action: PayloadAction<number>) => {
      // اگر در سؤال اول از دسته starter هستیم
      // Question_id === 0 یعنی سوال اول
      // category.toLowerCase() === "starter" یعنی در دسته‌ی استارتر
      if (
        state.question_id === 0 &&
        state.selected_category?.category.toLowerCase() === "starter"
      ) {
        // حالت تک‌گزینه‌ای
        // اگر همان پاسخ انتخاب‌شده دوباره کلیک شود، حذفش کن
        if (state.selected_answers.includes(action.payload)) {
          state.selected_answers = [];
        } else {
          // در حالت تک‌گزینه‌ای فقط یکی می‌تواند انتخاب شود
          state.selected_answers = [action.payload];
        }
      } else {
        // در بقیه سوالات، حالت چندگزینه‌ای
        if (state.selected_answers.includes(action.payload)) {
          state.selected_answers = state.selected_answers.filter(
            (id) => id !== action.payload
          );
        } else {
          state.selected_answers.push(action.payload);
        }
      }
    },
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

    addAnswer: (state, action: PayloadAction<string>) => {
      // اگر جواب وجود داشته باشد، حذف کن
      if (state.answers.includes(action.payload)) {
        state.answers = state.answers.filter(
          (answer) => answer !== action.payload
        );
      } else {
        // اگر جواب وجود نداشت، اضافه کن
        state.answers.push(action.payload);
      }
    },
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.selected_category = action.payload;
    },
    setAnswerColors: (
      state,
      action: PayloadAction<{
        [key: number]:
          | "primary"
          | "secondary"
          | "success"
          | "danger"
          | "warning"
          | "default";
      }>
    ) => {
      state.answer_colors = action.payload;
    },
    setDebuggers: (state, action) => {
      state.debuggers = action.payload;
    },
    setLastQuestion: (state, action: PayloadAction<boolean>) => {
      state.is_last_question = action.payload;
    },
    setAiConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversation.push(action.payload);
    },
    setDelay: (state, action: PayloadAction<Delay>) => {
      state.delay = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addSelectedAnswerToCustom: (state, action: PayloadAction<string>) => {
      if (!state.answers.includes(action.payload)) {
        state.answers.push(action.payload);
      }
    },
    setAnalyze: (state, action: PayloadAction<Conversation>) => {
      state.conversation.push(action.payload);
    },
    setClearAi: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  showQuestion,
  toggleAnswer,
  setClearAi,
  setSelectedCategory,
  setAnswerColors,
  addAnswer,
  setDebuggers,
  setContinue,
  setLastQuestion,
  setAiConversation,
  setDelay,
  addCustomAnswer,
  clearAddedAnswers,
  addSelectedAnswerToCustom,
  setAnalyze,
  setDescription,
} = aiSlice.actions;

export default aiSlice.reducer;
