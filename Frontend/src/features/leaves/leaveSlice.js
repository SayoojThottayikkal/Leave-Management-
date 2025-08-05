import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const applyLeave = createAsyncThunk(
  "leaves/apply",
  async (leaveData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.post(
      "http://localhost:5000/api/leaves",
      leaveData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const fetchLeaveHistory = createAsyncThunk(
  "leaves/fetchHistory",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id;
    const token = thunkAPI.getState().auth.token;
    const res = await axios.get(
      `http://localhost:5000/api/users/${userId}/leaves`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const fetchAllLeaves = createAsyncThunk(
  "leaves/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await axios.get("http://localhost:5000/api/leaves", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "leaves/updateStatus",
  async ({ id, status }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.put(
      `http://localhost:5000/api/leaves/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { id, status };
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    leaveRequests: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(applyLeave.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveRequests.push(action.payload);
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchLeaveHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLeaveHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveRequests = action.payload;
      })
      .addCase(fetchLeaveHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchAllLeaves.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaveRequests = action.payload;
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateLeaveStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, status } = action.payload;
        const leave = state.leaveRequests.find((l) => l._id === id);
        if (leave) leave.status = status;
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leaveSlice.reducer;
