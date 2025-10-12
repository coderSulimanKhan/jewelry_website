import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk("user/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    return data.user;
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export { loginUser };
export default userSlice.reducer;