import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createProduct = createAsyncThunk("product/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/products", {
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
      throw new Error("Failed to create product");
    };
    return data.newProduct;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getAllProducts = createAsyncThunk("prooduct/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/products/`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch products");
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const getProductById = createAsyncThunk("prodcut/getProductById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to retreive the product");
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateProductById = createAsyncThunk("product/updateProductById", async ({ productId, rformData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/products/${productId}`, {
      method: "POST",
      body: rformData
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
      throw new Error(data?.message || "Failed to update product");
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deleteProductById = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/products/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to delete product");
    if (!data.success) throw new Error(data?.message || "Failed to delete product");
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    // create product
    newProduct: null,
    cPLoading: false,
    // get all producsts
    allProducts: [],
    allPLoading: false,
    // get product by id
    product: null,
    isGettingProduct: false,
    // update product by id
    isUpdatingProduct: false,
    // delete product by id
    isDeleteingProduct: false,

    error: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create product
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
      // get all products
      .addCase(getAllProducts.pending, state => {
        state.allPLoading = true;
        state.error = null
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allPLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.allPLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // get product by id
      .addCase(getProductById.pending, state => {
        state.isGettingProduct = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isGettingProduct = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isGettingProduct = false;
        state.error = action.payload;
      })
      // update product by id
      .addCase(updateProductById.pending, state => {
        state.isUpdatingProduct = true;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, state => {
        state.isUpdatingProduct = false;
        state.error = null;
        toast.success("Product updated successfully");
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.isUpdatingProduct = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // delete product by id
      .addCase(deleteProductById.pending, state => {
        state.isDeleteingProduct = true;
        state.error = null;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.isDeleteingProduct = false;
        toast.success(action?.payload?.message ?? "Product deleted");
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isDeleteingProduct = false;
        toast.error(action?.payload?.message ?? "Failed to delete product");
      })
  }
});

export { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById }
export default productSlice.reducer;