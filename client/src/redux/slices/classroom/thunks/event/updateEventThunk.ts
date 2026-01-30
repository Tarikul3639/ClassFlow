import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "@/redux/slices/classroom/types";
import { apiClient } from "@/lib/api/axios";

interface UpdateEventPayload {
  classroomId: string;
  eventId: string;
  eventData: Partial<Omit<IEvent, "_id" | "createdAt" | "createdBy">>;
}

export const updateEventThunk = createAsyncThunk<
  IEvent,                 // fulfilled returns the updated event
  UpdateEventPayload,     // thunk argument
  { rejectValue: string } // rejected returns string error
>(
  "classroom/updateEvent",
  async ({ classroomId, eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch<{ event: IEvent }>(
        `/classroom/${classroomId}/event/${eventId}`,
        eventData,
        { withCredentials: true }
      );

      if (!response.data || !response.data.event)
        throw new Error("Failed to update event");

      return response.data.event;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
