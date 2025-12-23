import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getMe = createAsyncThunk("user/me", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/me");
    if (!res.ok) throw new Error("Failed to get data");
    const data = await res.json();
    return data.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const loginUser = createAsyncThunk("user/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
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
      }
      throw new Error("Failed to login");
    };
    return data.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/logout", {
      method: "POST"
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data?.message || "Failed to logout");
    return data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to logout");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null,
    // logout
    isLoggingOut: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get me
      .addCase(getMe.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // login user
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        toast.success("Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // logout user
      .addCase(logoutUser.pending, state => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggingOut = false;
        toast.success(action?.payload);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoggingOut = false;
        toast.error(action?.payload);
      })
  }
});

export { loginUser, getMe, logoutUser };
export default userSlice.reducer;