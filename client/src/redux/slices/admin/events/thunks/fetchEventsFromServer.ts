// fetchEventsFromServer thunk

import { events as ADMIN_EVENT } from "@/data/events";
import { IEvent } from "@/types/event";
import { createAsyncThunk } from "@reduxjs/toolkit/react";

// Dummy API placeholders
const fakeUpdateAPI = (event: IEvent): Promise<IEvent> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.1 ? resolve(event) : reject("Failed to update event");
    }, 500);
  });
  
const fakeFetchAPI = (): Promise<IEvent[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(ADMIN_EVENT), 5000); // return initial dummy events
  });

export const fetchEventsFromServer = createAsyncThunk<IEvent[]>(
  "adminEvents/fetchEventsFromServer",
  async (_, { rejectWithValue }) => {
    try {
      return await fakeFetchAPI(); // return dummy events
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  },
);