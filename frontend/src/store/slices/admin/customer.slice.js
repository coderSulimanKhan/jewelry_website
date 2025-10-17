import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createCustomer = createAsyncThunk("user/createCustomer", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/register-c", {
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
      throw new Error("Failed to create customer");
    };
    return data.newUser;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getAllCustomers = createAsyncThunk("user/getAllCustomers", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/customers");
    if (!res.ok) throw new Error("Failed to get all cutomers");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deleteCustomer = createAsyncThunk("user/deleteCustomer", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete customer");
    const { message } = await res.json();
    return message;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getCustomerById = createAsyncThunk("user/getCustomer", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/${id}`);
    if (!res.ok) throw new Error("Error to find the customer");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateCustomerById = createAsyncThunk("user/updateCustomer", async ({ id, rformData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/${id}`, {
      method: "PUT",
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
      throw new Error("Failed to update customer");
    };
    return data.updatedCustomer;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    // getAllCustomers
    allCustomers: [],
    allCLoading: false,
    // createCustomer
    newCustomer: null,
    loading: false,
    error: null,
    // deleteCustomer
    deleteCustomerMessage: "",
    loadingDeleteCustomer: false,
    // getCustomerById
    customer: null,
    customerLoading: false,
    // updateCustomerById
    updatedCustomer: null,
    isUpdatingCustomer: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create customer
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
      // get all customers
      .addCase(getAllCustomers.pending, (state) => {
        state.allCLoading = true;
        state.error = null;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.allCLoading = false;
        state.allCustomers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.allCLoading = false;
        state.error = action.payload;
        toast.error("Failed to get all customers")
      })
      // delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loadingDeleteCustomer = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loadingDeleteCustomer = false;
        state.deleteCustomerMessage = action.payload;
        toast.success("User deleted successfully");
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loadingDeleteCustomer = false;
        state.error = action.payload;
        toast.error("Failed to delete customer")
      })
      // get customer by id
      .addCase(getCustomerById.pending, (state) => {
        state.customerLoading = true;
        state.error = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customer = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.customerLoading = false;
        state.error = action.payload;
      })
      // update customer
      .addCase(updateCustomerById.pending, (state) => {
        state.isUpdatingCustomer = true;
        state.error = null;
      })
      .addCase(updateCustomerById.fulfilled, (state, action) => {
        state.isUpdatingCustomer = false;
        state.updatedCustomer = action.payload;
        toast.success("Customer updated successfully");
      })
      .addCase(updateCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  }
});

export { createCustomer, getAllCustomers, deleteCustomer, getCustomerById, updateCustomerById };
export default customerSlice.reducer;