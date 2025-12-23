import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const createCut = createAsyncThunk("cut/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/cuts", {
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
      throw new Error("Failed to create got");
    };
    return data?.message;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to create got");
  }
})

const getAllCuts = createAsyncThunk("cut/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/cuts");
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get all gots");
    return data?.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get all gots");
  }
})

const deleteCut = createAsyncThunk("cut/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/cuts/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to delete got")
    return data?.success;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to delete got");
  }
});

const getCutById = createAsyncThunk("cut/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/cuts/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get got");
    return data?.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get got");
  }
});

const updateCut = createAsyncThunk("cut/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/cuts/${id}`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      if (data?.errors) {
        data?.errors?.forEach(error => {
          if (error.msg === "Invalid value") {
            console.log(error.msg);
          } else {
            toast.error(error.msg);
          }
        });
      } else if (!data.success && data.message) {
        toast.error(data.message);
      }
      throw new Error("Failed to update got");
    };

  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update got");
  }
});

const cutSlice = createSlice({
  name: "cut",
  initialState: {
    // create cut
    isCreating: false,
    // get all cuts
    isGettingAllCuts: false,
    allCuts: [],
    // delete cut
    isDeleting: false,
    // get cut by id
    isGettingCut: false,
    cut: {},
    // update cut
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // create cut
      .addCase(createCut.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createCut.fulfilled, (state, action) => {
        state.isCreating = false;
        toast.success(action?.payload || "Got created successfully");
      })
      .addCase(createCut.rejected, (state, action) => {
        state.isCreating = false;
        toast.error(action?.payload || "Failed to create got");
        state.error = action?.payload || "Error in creating got";
      })
      // get all cuts
      .addCase(getAllCuts.pending, state => {
        state.isGettingAllCuts = true;
        state.error = null;
      })
      .addCase(getAllCuts.fulfilled, (state, action) => {
        state.isGettingAllCuts = false;
        state.allCuts = action?.payload || [];
      })
      .addCase(getAllCuts.rejected, (state, action) => {
        state.isGettingAllCuts = false;
        toast.error(action?.payload || "Failed to get all gots");
        state.error = action?.payload || "Failed to get all gots";
      })
      // delete cut
      .addCase(deleteCut.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteCut.fulfilled, state => {
        state.isDeleting = false;
        toast.success("Got deleted successfully");
      })
      .addCase(deleteCut.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error(action?.payload || "Failed to get all got");
        state.error = action?.payload || "Failed to get all got";
      })
      // get cut by id
      .addCase(getCutById.pending, state => {
        state.isGettingCut = true;
        state.error = null;
      })
      .addCase(getCutById.fulfilled, (state, action) => {
        state.isGettingCut = false;
        state.cut = action?.payload;
      })
      .addCase(getCutById.rejected, (state, action) => {
        state.isGettingCut = false;
        toast.error(action?.payload || "Failed to get got");
        state.error = action?.payload || "Failed to get got";
      })
      // update cut
      .addCase(updateCut.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateCut.fulfilled, (state, action) => {
        state.isUpdating = false;
        toast.success(action?.payload || "Got updated successfully");
      })
      .addCase(updateCut.rejected, (state, action) => {
        state.isUpdating = false;
        toast.error(action?.payload || "Failed to update got");
        state.error = action?.payload || "Failed to update got";
      })
  }
});

export { createCut, getAllCuts, deleteCut, getCutById, updateCut }
export default cutSlice.reducer;