import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
// Define types for request data and state
interface ConsultRequest {
  debuger: number | null;
  debuger_applicator: number | null;
  description: string;
  file: string | null;
  price: number;
  discount: number;
  mode: string | null;
  duration: number | null;
  start_at:string | null;
}

interface ConsultState {
  request: ConsultRequest;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Async action for submitting the consult request
export const submitConsultRequest = createAsyncThunk(
  'consult/submitRequest',
  async (requestData: ConsultRequest, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.server}/api/v1/debug-hub/`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data){
        dispatch(resetRequest())
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState: ConsultState = {
  request: {
    debuger: null,
    debuger_applicator: null,
    description: '',
    file: "",
    price: 60000,
    discount: 0,
    mode: "chat",
    duration: 20,
    start_at: new Date().toISOString(),
  },
  loading: false,
  error: null,
  success: false,
};

// Slice for consult requests
const consultSlice = createSlice({
  name: 'consult',
  initialState,
  reducers: {

    updateRequest: (state, action: PayloadAction<Partial<ConsultRequest>>) => {
      state.request = { ...state.request, ...action.payload };
    },
    resetRequest: (state) => {
      state.request = { ...initialState.request };
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitConsultRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitConsultRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        toast.success('موفق', {
          description: 'درخواست مشاوره شما با موفقیت ثبت شد.',
        });
      })
      .addCase(submitConsultRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'مشکلی در ارسال درخواست پیش آمد';
        toast.error('خطا', {
          description: state.error,
        });
      });
  },
});

export const { updateRequest, resetRequest } = consultSlice.actions;
export default consultSlice.reducer;
