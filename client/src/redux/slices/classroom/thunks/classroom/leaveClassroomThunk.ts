import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

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
    return rejectWithValue(extractErrorMessage(error));
  }
});
