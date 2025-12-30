import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getRate = createAsyncThunk("rate/get", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/rates");
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get rates");
    return data?.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get rates");
  }
});

const updateRate = createAsyncThunk("rate/update", async (rate, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rate }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to update rates");
    return data?.message;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update rates");
  }
});

const rateSlice = createSlice({
  name: "rate",
  initialState: {
    // get rate
    isGetting: false,
    gold_t: null,
    // update rate
    isUpdating: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // get rate
      .addCase(getRate.pending, state => {
        state.isGetting = true;
        state.error = null;
      })
      .addCase(getRate.fulfilled, (state, action) => {
        state.isGetting = false;
        state.gold_t = action?.payload;
      })
      .addCase(getRate.rejected, (state, action) => {
        state.isGetting = false;
        state.error = action?.payload;
      })
      // update rate
      .addCase(updateRate.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateRate.fulfilled, (state, action) => {
        state.isUpdating = false;
        toast.success(action?.payload);
      })
      .addCase(updateRate.rejected, (state, action) => {
        state.isUpdating = false;
        toast.error(action?.payload);
        state.error = action?.payload;
      })
  }
});

export { getRate, updateRate };
export default rateSlice.reducer;