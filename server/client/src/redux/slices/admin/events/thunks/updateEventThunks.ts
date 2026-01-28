import { IEvent } from "@/types/event";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Dummy API placeholder
const fakeUpdateAPI = (event: IEvent) =>
  new Promise<IEvent>((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0.2 ? resolve(event) : reject("Failed to update event"),
      1000,
    );
  });

// Update Event
export const updateEventThunk = createAsyncThunk<
  IEvent,
  IEvent,
  { state: RootState }
>("adminEvents/updateEvent", async (form, { rejectWithValue }) => {
  try {
    const updatedEvent = await fakeUpdateAPI(form);
    return updatedEvent; // just return the updated event
  } catch (err) {
    return rejectWithValue(err);
  }
});
