import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createOrder = createAsyncThunk("orders/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/orders", {
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
      throw new Error("Failed to create order");
    };
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to create order.");
  }
});

const getAllOrders = createAsyncThunk("orders/allOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/orders");
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get all orders");
    return data.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get all orders");
  }
});

const deleteOrder = createAsyncThunk("orders/delete", async (saleId, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/orders/${saleId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to delete order");
    return data?.success;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to delete order");
  }
});

const getOrderById = createAsyncThunk("orders/getOrder", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/orders/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get order");
    return data.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get order");
  }
});

const changeStatus = createAsyncThunk("orders/changeStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to update status");
    return data?.message;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update status");
  }
});

const updateOrder = createAsyncThunk("orders/update", async ({ formData, id }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/orders/${id}`, {
      method: "PATCH",
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
      throw new Error("Failed to update order");
    };
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update order");
  }
})

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    // create order
    isCreating: false,
    // get all orders
    isGettingAllOrders: false,
    allOrders: [],
    // delete order
    isDeleting: false,
    // get order
    isGettingOrder: false,
    order: {},
    // change status
    isChangingStatus: false,
    // update order
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // create order
      .addCase(createOrder.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, state => {
        state.isCreating = false;
        state.error = null;
        toast.success("Order created successfully");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload || "Failed to create order";
        toast.error(action.payload || "Failed to create order");
      })
      // get all orders
      .addCase(getAllOrders.pending, state => {
        state.isGettingAllOrders = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isGettingAllOrders = false;
        state.allOrders = action?.payload || [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isGettingAllOrders = false;
        state.error = action?.payload;
        toast.error("Failed to get all orders");
      })
      // delete order
      .addCase(deleteOrder.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, state => {
        state.isDeleting = false;
        toast.success("Order deleted successfully");
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error(action?.payload || "Failed to delete order");
      })
      // get order
      .addCase(getOrderById.pending, state => {
        state.isGettingOrder = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isGettingOrder = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isGettingOrder = false;
        state.error = action.payload;
      })
      // change status
      .addCase(changeStatus.pending, state => {
        state.isChangingStatus = true;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isChangingStatus = false;
        toast.success(action?.payload || "Status updated successfully");
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.isChangingStatus = false;
        state.error = action.payload;
        toast.error(action?.payload || "Failed to update status");
      })
      // update order
      .addCase(updateOrder.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, state => {
        state.isUpdating = false;
        toast.success("Order updated successfully");
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isUpdating = false;
        toast.error(action?.payload || "Failed to update order");
      })
  }
});

export { createOrder, getAllOrders, deleteOrder, getOrderById, changeStatus, updateOrder }
export default orderSlice.reducer 