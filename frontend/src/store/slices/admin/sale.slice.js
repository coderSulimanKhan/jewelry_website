import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createSale = createAsyncThunk("sale/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/sales", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
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
      throw new Error("Failed to create sale");
    };
    if(data?.success) toast.success("Sale created successfully.");
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to create sale.");
  }
});


const saleSlice = createSlice({
  name: "sale",
  initialState: {
    allSales: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, state => {
        state.loading = false;
        state.error = null;
        toast.success("Sale created successfully");
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create sale";
        toast.error(action.payload || "Failed to create sale");
      })
  }
});

export { createSale }
export default saleSlice.reducer;