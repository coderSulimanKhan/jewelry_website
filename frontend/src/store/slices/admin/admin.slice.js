import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createAdmin = createAsyncThunk("admin/createAdmin", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/register-a", {
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
      throw new Error("Failed to create admin");
    };
    return data.newAdmin;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getAllAdmins = createAsyncThunk("admin/getAllAdmins", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/admin");
    if (!res.ok) throw new Error("Failed to get all admins");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deleteAdmin = createAsyncThunk("admin/deleteAdmin", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/admin/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete admin");
    const { message } = await res.json();
    return message;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getAdminById = createAsyncThunk("admin/getAdmin", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/admin/${id}`);
    if (!res.ok) throw new Error("Error to find the admin");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateAdminById = createAsyncThunk("admin/updateAdmin", async ({ id, rformData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/admin/${id}`, {
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
      throw new Error("Failed to update admin");
    };
    return data.updatedEmployee;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    // getAllCustomers
    allAdmins: [],
    allALoading: false,
    // createEmployee
    newAdmin: null,
    loading: false,
    error: null,
    // deleteEmployee
    deleteAdminMessage: "",
    loadingDeleteAdmin: false,
    // getEmployeeById
    admin: null,
    adminLoading: false,
    // updateEmployeeById
    updatedAdmin: null,
    isUpdatingAdmin: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create admin
      .addCase(createAdmin.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.newAdmin = action.payload;
        toast.success("Admin created successfully");
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // get all admin
      .addCase(getAllAdmins.pending, (state) => {
        state.allALoading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.allALoading = false;
        state.allAdmins = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.allALoading = false;
        state.error = action.payload;
        toast.error("Failed to get all admins");
      })
      // delete admin
      .addCase(deleteAdmin.pending, (state) => {
        state.loadingDeleteAdmin = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loadingDeleteAdmin = false;
        state.deleteEmployeeMessage = action.payload;
        toast.success("Admin deleted successfully");
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loadingDeleteAdmin = false;
        state.error = action.payload;
        toast.error("Failed to delete admin")
      })
      // get admin by id
      .addCase(getAdminById.pending, (state) => {
        state.adminLoading = true;
        state.error = null;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.admin = action.payload;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
      })
      // update admin
      .addCase(updateAdminById.pending, (state) => {
        state.isUpdatingAdmin = true;
        state.error = null;
      })
      .addCase(updateAdminById.fulfilled, (state, action) => {
        state.isUpdatingAdmin = false;
        state.updatedAdmin = action.payload;
        toast.success("Admin updated successfully");
      })
      .addCase(updateAdminById.rejected, (state, action) => {
        state.isUpdatingAdmin = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  }
});

export { createAdmin, getAllAdmins, deleteAdmin, getAdminById, updateAdminById };
export default adminSlice.reducer;