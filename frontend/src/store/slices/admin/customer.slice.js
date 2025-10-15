import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createCustomer = createAsyncThunk("user/createCustomer", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/register-c", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log(data.error);
    if (!res.ok) {
      if (data.error) {
        data.error.forEach(error => {
          if (error.msg === "Invalid value") {
            console.log(error.msg);
          } else {
            toast.error(error.msg);
          }
        });
      } else if (!data.success && data.message) {
        toast.error(data.message);
      }
      throw new Error("Failed to create customer");
    };
    return data.newUser;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    newCustomer: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // create customer
    builder
      .addCase(createCustomer.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.newCustomer = action.payload;
        toast.success("Customer created successfully");
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  }
});

export { createCustomer };
export default customerSlice.reducer;