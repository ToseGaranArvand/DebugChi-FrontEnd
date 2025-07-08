import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Feedback {
  sessionId: string
  rating: number
  comment: string
  timestamp: string
}

interface FeedbackState {
  feedbacks: Feedback[]
}

const initialState: FeedbackState = {
  feedbacks: []
}

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<Feedback>) => {
      state.feedbacks.push(action.payload)
    }
  }
})

export const { addFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer
