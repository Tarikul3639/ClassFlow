import { IEvent } from "@/types/event";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Select Event for Edit (from store for now, API-ready)
export const selectEventForEditById = createAsyncThunk<
  IEvent,
  string,
  { state: RootState }
>(
  "adminEvents/selectEventForEditById",
  async (_id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const event = state.admin.events.find((e) => e._id === _id);
      if (!event) throw "Event not found";
      return event;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
