import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createProduct = createAsyncThunk("product/create", async (formData, { rejectWithValue }) => {
  try {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const res = await fetch("/api/v1/products", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log(data);
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
      throw new Error("Failed to create product");
    };
    return data.newProduct;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});


const productSlice = createSlice({
  name: "product",
  initialState: {
    // create product
    newProduct: null,
    cPLoading: false,
    error: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, state => {
        state.cPLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.cPLoading = false;
        state.newProduct = action.payload;
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.cPLoading = false;
        state.error = action.payload;
        toast.error("Failed to create product");
      })
  }
});

export { createProduct }
export default productSlice.reducer;