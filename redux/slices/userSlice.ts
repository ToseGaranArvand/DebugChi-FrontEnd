import { Main, UserLanguage,UserResume } from '@/components/types/user.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  user: Main | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Main>) => {
      state.user = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<Main>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addUserLanguage: (state, action: PayloadAction<UserLanguage>) => {
      if (state.user) {
        state.user.user_language.push(action.payload);
      }
    },
    removeUserLanguage: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.user_language = state.user.user_language.filter(
          lang => lang.language_name.id !== action.payload
        );
      }
    },
    addUserResume: (state, action: PayloadAction<UserResume>) => {
      if (state.user) {
        state.user.user_resume.push(action.payload);
      }
    },
    removeUserResume: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.user_resume = state.user.user_resume.filter(
          resume => resume.id !== action.payload
        );
      }
    },
    updateUserScore: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.user_score = action.payload;
      }
    },
    updateDigitalWallet: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.digital_wallet = action.payload;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  updateProfile,
  addUserLanguage,
  removeUserLanguage,
  addUserResume,
  removeUserResume,
  updateUserScore,
  updateDigitalWallet,
  clearUser,
  setError,
} = userSlice.actions;

export default userSlice.reducer;