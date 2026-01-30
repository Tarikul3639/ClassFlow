import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api/axios";

export const leaveClassroomThunk = createAsyncThunk<
  void,
  { classroomId: string },
  { rejectValue: string }
>("classroom/leave", async ({ classroomId }, { rejectWithValue }) => {
  try {
    await apiClient.post(
      "/classroom/leave",
      { classroomId },
      { withCredentials: true },
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
});
