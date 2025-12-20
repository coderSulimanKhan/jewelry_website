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
      throw new Error("Failed to create cut");
    };
    return data?.message;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to create cut");
  }
})

const getAllCuts = createAsyncThunk("cut/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/v1/cuts");
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get all cuts");
    return data?.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get all cuts");
  }
})

const deleteCut = createAsyncThunk("cut/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/cuts/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to delete cut")
    return data?.success;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to delete cut");
  }
});

const getCutById = createAsyncThunk("cut/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/v1/cuts/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to get cut");
    return data?.data;
  } catch (error) {
    return rejectWithValue(error?.message || "Failed to get cut");
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
      throw new Error("Failed to update cut");
    };

  } catch (error) {
    return rejectWithValue(error?.message || "Failed to update cut");
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
        toast.success(action?.payload || "Cut created successfully");
      })
      .addCase(createCut.rejected, (state, action) => {
        state.isCreating = false;
        toast.error(action?.payload || "Failed to create cut");
        state.error = action?.payload || "Error in creating cut";
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
        toast.error(action?.payload || "Failed to get all cuts");
        state.error = action?.payload || "Failed to get all cuts";
      })
      // delete cut
      .addCase(deleteCut.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteCut.fulfilled, state => {
        state.isDeleting = false;
        toast.success("Cut deleted successfully");
      })
      .addCase(deleteCut.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error(action?.payload || "Failed to get all cut");
        state.error = action?.payload || "Failed to get all cut";
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
        toast.error(action?.payload || "Failed to get cut");
        state.error = action?.payload || "Failed to get cut";
      })
      // update cut
      .addCase(updateCut.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateCut.fulfilled, (state, action) => {
        state.isUpdating = false;
        toast.success(action?.payload || "Cut updated successfully");
      })
      .addCase(updateCut.rejected, (state, action) => {
        state.isUpdating = false;
        toast.error(action?.payload || "Failed to update cut");
        state.error = action?.payload || "Failed to update cut";
      })
  }
});

export { createCut, getAllCuts, deleteCut, getCutById, updateCut }
export default cutSlice.reducer;