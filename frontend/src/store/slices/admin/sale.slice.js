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
      if (data.errors) {
        data.errors.forEach(error => {
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
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to create sale.");
  }
});

const getAllSales = createAsyncThunk("sale/allSales", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/sales");
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get all sales");
    return data.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get all sales");
  }
});

const deleteSale = createAsyncThunk("sale/delete", async (saleId, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/sales/${saleId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to delete sale");
    return data?.success;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to delete sale");
  }
});

const getSale = createAsyncThunk("sale/getSale", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/sales/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get sale");
    return data.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get sale");
  }
});

const updateSale = createAsyncThunk("sale/update", async ({ formData, id }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/sales/${id}`, {
      method: "PUT",
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
      throw new Error("Failed to update sale");
    };
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update sale");
  }
})

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    // create sale
    loading: false,
    // get all sales
    getting: false,
    allSales: [],
    // delete sale
    isDeleting: false,
    // get sale
    isGettingSale: false,
    sale: {},
    // update sale
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create sale
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
      // get all sales
      .addCase(getAllSales.pending, state => {
        state.getting = true;
        state.error = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.getting = false;
        state.allSales = action?.payload || [];
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.getting = false;
        state.error = action?.payload;
        toast.error("Failed to get all sales");
      })
      // delete sale
      .addCase(deleteSale.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, state => {
        state.isDeleting = false;
        toast.success("Sale deleted successfully");
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error(action?.payload || "Failed to delete sale");
      })
      // get sale
      .addCase(getSale.pending, state => {
        state.isGettingSale = true;
        state.error = null;
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.isGettingSale = false;
        state.sale = action.payload;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.isGettingSale = false;
        state.error = action.payload;
      })
      // update sale
      .addCase(updateSale.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateSale.fulfilled, state => {
        state.isUpdating = false;
        state.error = null;
        toast.success("Sale updated successfully");
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to update sale";
        toast.error(action.payload || "Failed to update sale");
      })
  }
});

export { createSale, getAllSales, deleteSale, getSale, updateSale }
export default saleSlice.reducer;