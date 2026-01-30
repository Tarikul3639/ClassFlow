import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api/axios";

interface DeleteEventPayload {
  classroomId: string;
  eventId: string;
}

export const deleteEventThunk = createAsyncThunk<
  string,                // fulfilled returns deleted eventId
  DeleteEventPayload,    // argument
  { rejectValue: string }
>(
  "classroom/deleteEvent",
  async ({ classroomId, eventId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete<{ eventId: string }>(
        `/classroom/${classroomId}/event/${eventId}`,
        { withCredentials: true }
      );

      if (!response.data || !response.data.eventId)
        throw new Error("Failed to delete event");

      return response.data.eventId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
