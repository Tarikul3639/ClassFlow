import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClassroom } from "@/redux/slices/classroom/types";
import { apiClient } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

export const joinClassroomThunk = createAsyncThunk<
  IClassroom,
  string, // joinCode
  { rejectValue: string }
>("classroom/join", async (joinCode, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{ classroom: IClassroom }>(
      "/classrooms/join",
      { joinCode },
      {
        withCredentials: true,
      },
    );
    if (!response) throw new Error("Failed to join classroom");
    return response.data.classroom;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});
