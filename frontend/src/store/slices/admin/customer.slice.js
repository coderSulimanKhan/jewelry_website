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
    loadingDeleteCustomer: false
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
        toast.error("Failed to get all customers")
      })
  }
});

export { createCustomer, getAllCustomers, deleteCustomer };
export default customerSlice.reducer;