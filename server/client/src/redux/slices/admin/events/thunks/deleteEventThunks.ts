// store/admin/events/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

// Dummy API placeholder
const fakeDeleteAPI = (_id: string) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.2 ? resolve(_id) : reject("Failed to delete")), 1000);
  });

// Delete Event
export const deleteEventThunk = createAsyncThunk<string, string>(
  "adminEvents/deleteEvent",
  async (_id, { rejectWithValue }) => {
    try {
      const deletedId = await fakeDeleteAPI(_id);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
