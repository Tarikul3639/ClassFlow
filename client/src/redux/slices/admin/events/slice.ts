// store/admin/events/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "@/types/event";
import { AdminEventsState } from "./types";
import { deleteEventThunk } from "./thunks/deleteEventThunks";
import { selectEventForEditById } from "./thunks/selectEventForEditById";
import { createNewEventThunk } from "./thunks/createNewEventThunks";
import { updateEventThunk } from "./thunks/updateEventThunks";
import { fetchEventsFromServer } from "./thunks/fetchEventsFromServer";

const initialState: AdminEventsState = {
  events: [],
  status: {},
};

const adminEventsSlice = createSlice({
  name: "adminEvents",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<IEvent>) {
      state.events.push(action.payload);
    },
    updateEvent(state, action: PayloadAction<IEvent>) {
      const index = state.events.findIndex((e) => e._id === action.payload._id);
      if (index !== -1) state.events[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Delete Event
    builder.addCase(deleteEventThunk.pending, (state, action) => {
      state.status[action.meta.arg] = { deleting: true };
    });
    builder.addCase(
      deleteEventThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        delete state.status[action.payload];
        state.events = state.events.filter((e) => e._id !== action.payload);
      },
    );
    builder.addCase(deleteEventThunk.rejected, (state, action) => {
      delete state.status[action.meta.arg];
      state.status[action.meta.arg] = { error: action.payload as string };
    });

    // Fetch Event by _id for Edit
    builder.addCase(selectEventForEditById.pending, (state, action) => {
      state.status[action.meta.arg] = { fetching: true };
    });
    builder.addCase(
      selectEventForEditById.fulfilled,
      (state, action: PayloadAction<IEvent>) => {
        delete state.status[action.payload._id];
        const index = state.events.findIndex(
          (e) => e._id === action.payload._id,
        );
        if (index !== -1) state.events[index] = action.payload;
        else state.events.push(action.payload);
      },
    );
    builder.addCase(selectEventForEditById.rejected, (state, action) => {
      delete state.status[action.meta.arg];
      state.status[action.meta.arg] = { error: "Failed to fetch event" };
    });

    // Create New Event
    builder.addCase(createNewEventThunk.pending, (state, action) => {
      state.status["creating"] = { creating: true };
    });
    builder.addCase(
      createNewEventThunk.fulfilled,
      (state, action: PayloadAction<IEvent>) => {
        delete state.status["creating"];
        state.events.push(action.payload);
      },
    );
    builder.addCase(createNewEventThunk.rejected, (state, action) => {
      delete state.status["creating"];
      state.status["creating"] = { error: action.payload as string };
    });

    // Update Event
    builder.addCase(updateEventThunk.pending, (state, action) => {
      state.status[action.meta.arg._id] = { updating: true };
    });
    builder.addCase(
      updateEventThunk.fulfilled,
      (state, action: PayloadAction<IEvent>) => {
        delete state.status[action.payload._id];
        const index = state.events.findIndex(
          (e) => e._id === action.payload._id,
        );
        if (index !== -1) state.events[index] = action.payload;
      },
    );
    builder.addCase(updateEventThunk.rejected, (state, action) => {
      delete state.status[action.meta.arg._id];
      state.status[action.meta.arg._id] = { error: action.payload as string };
    });

    // Fetch Events from Server
    builder.addCase(fetchEventsFromServer.pending, (state) => {
      state.status["all"] = { fetching: true };
    });
    builder.addCase(
      fetchEventsFromServer.fulfilled,
      (state, action: PayloadAction<IEvent[]>) => {
        delete state.status["all"];
        state.events = action.payload;
      },
    );
    builder.addCase(fetchEventsFromServer.rejected, (state, action) => {
      state.status["all"] = { error: action.payload as string };
    });
  },
});

export const { setEvents, addEvent, updateEvent } = adminEventsSlice.actions;
export default adminEventsSlice.reducer;
