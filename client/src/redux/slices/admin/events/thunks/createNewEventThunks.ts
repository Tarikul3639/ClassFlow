import { IEvent } from "@/types/event";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Dummy API placeholder
const fakeCreateAPI = (event: IEvent) =>
  new Promise<IEvent>((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0.2 ? resolve(event) : reject("Failed to create event"),
      1000,
    );
  });

// Create New Event
export const createNewEventThunk = createAsyncThunk<
  IEvent,
  IEvent,
  { state: RootState }
>("adminEvents/createNewEvent", async (form, { rejectWithValue }) => {
  try {
    const createdEvent = await fakeCreateAPI(form);
    return createdEvent; // just return the new event
  } catch (err) {
    return rejectWithValue(err);
  }
});
