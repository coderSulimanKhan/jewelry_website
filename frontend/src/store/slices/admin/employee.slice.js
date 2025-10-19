import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createEmployee = createAsyncThunk("employee/createEmployee", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/register-e", {
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
      throw new Error("Failed to create employee");
    };
    return data.newEmployee;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getAllEmployees = createAsyncThunk("employee/getAllCustomers", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/employee");
    if (!res.ok) throw new Error("Failed to get all employees");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/employee/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete employee");
    const { message } = await res.json();
    return message;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const getEmployeeById = createAsyncThunk("employee/getEmployee", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/employee/${id}`);
    if (!res.ok) throw new Error("Error to find the employee");
    const { data } = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const updateEmployeeById = createAsyncThunk("employee/updateEmployee", async ({ id, rformData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/users/employee/${id}`, {
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
      throw new Error("Failed to update employee");
    };
    return data.updatedEmployee;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    // getAllCustomers
    allEmployees: [],
    allELoading: false,
    // createEmployee
    newEmployee: null,
    loading: false,
    error: null,
    // deleteEmployee
    deleteEmployeeMessage: "",
    loadingDeleteEmployee: false,
    // getEmployeeById
    employee: null,
    employeeLoading: false,
    // updateEmployeeById
    updatedEmployee: null,
    isUpdatingEmployee: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create customer
      .addCase(createEmployee.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.newEmployee = action.payload;
        toast.success("Employee created successfully");
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // get all employees
      .addCase(getAllEmployees.pending, (state) => {
        state.allELoading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.allELoading = false;
        state.allEmployees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.allELoading = false;
        state.error = action.payload;
        toast.error("Failed to get all employees");
      })
      // delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loadingDeleteEmployee = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loadingDeleteEmployee = false;
        state.deleteEmployeeMessage = action.payload;
        toast.success("Employee deleted successfully");
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loadingDeleteEmployee = false;
        state.error = action.payload;
        toast.error("Failed to delete employee")
      })
      // get employee by id
      .addCase(getEmployeeById.pending, (state) => {
        state.employeeLoading = true;
        state.error = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.employeeLoading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.employeeLoading = false;
        state.error = action.payload;
      })
      // update customer
      .addCase(updateEmployeeById.pending, (state) => {
        state.isUpdatingCustomer = true;
        state.error = null;
      })
      .addCase(updateEmployeeById.fulfilled, (state, action) => {
        state.isUpdatingEmployee = false;
        state.updatedEmployee = action.payload;
        toast.success("Employee updated successfully");
      })
      .addCase(updateEmployeeById.rejected, (state, action) => {
        state.isUpdatingEmployee = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  }
});

export { createEmployee, getAllEmployees, deleteEmployee, getEmployeeById, updateEmployeeById };
export default employeeSlice.reducer;