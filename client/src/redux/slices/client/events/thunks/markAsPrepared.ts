import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "@/types/event";
import { RootState } from "@/redux/store";

// Dummy API placeholders
const fakeUpdateAPI = (event: IEvent): Promise<IEvent> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.1 ? resolve(event) : reject("Failed to update event");
    }, 500);
  });

// markAsPrepared thunk
export const markAsPrepared = createAsyncThunk<IEvent, string>(
  "clientEvents/markAsPrepared",
  async (_id, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const event = state.client.events.find((e) => e._id === _id);
      if (!event) throw new Error("Event not found");

      const updatedEvent = {
        ...event,
        isCompleted: !event.isCompleted,
      };

      // Return updated event
      return await fakeUpdateAPI(updatedEvent);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);
