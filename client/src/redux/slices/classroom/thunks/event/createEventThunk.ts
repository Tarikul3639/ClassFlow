import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "@/redux/slices/classroom/types";
import { apiClient } from "@/lib/api/axios";

interface CreateEventPayload {
  classroomId: string;
  eventData: Omit<IEvent, "_id" | "createdAt">; // frontend sends data except _id
}

export const createEventThunk = createAsyncThunk<
  IEvent, // 1️⃣ Return type of the thunk
  CreateEventPayload, // 2️⃣ Argument type for the thunk
  { rejectValue: string } // 3️⃣ optional → rejectValue type
>(
  "classroom/createEvent",
  async ({ classroomId, eventData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{ event: IEvent }>(
        `/classroom/${classroomId}/event`,
        eventData,
        { withCredentials: true }
      );

      return response.data.event;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
