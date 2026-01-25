// store/admin/events/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "@/types/event";
import { AdminEventsState } from "./types";
import { deleteEventThunk } from "./thunks/deleteEventThunks";
import { selectEventForEditById } from "./thunks/selectEventForEditById";
import { createNewEventThunk } from "./thunks/createNewEventThunks";
import { updateEventThunk } from "./thunks/updateEventThunks";

const initialState: AdminEventsState = {
  events: [
    {
      _id: "1",
      type: "ct",
      title: "Algorithms CT-1",
      date: "2026-01-24",
      startAt: "2026-01-24T10:00",
      endAt: "2026-01-24T11:30",
      topics: ["Sorting Algorithms", "Graph Theory"],
      materials: [
        {
          _id: "m1",
          name: "CT_Syllabus.pdf",
          type: "pdf",
          url: "https://example.com/ct_syllabus.pdf",
        },
      ],
      isCompleted: true,
    },
    {
      _id: "2",
      type: "quiz",
      title: "Data Structures Quiz",
      date: "2026-01-26",
      startAt: "2026-01-26T14:00",
      isCompleted: true,
    },
    {
      _id: "3",
      type: "assignment",
      title: "OS Kernel Project",
      date: "2026-02-02",
      startAt: "2026-02-02T23:59",
      isCompleted: false,
    },
    {
      _id: "4",
      type: "lecture",
      title: "Advanced DB Lecture",
      date: "2026-01-30",
      startAt: "2026-01-30T09:00",
      isCompleted: false,
    },
  ],
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
    builder.addCase(updateEventThunk.fulfilled, (state, action: PayloadAction<IEvent>) => {
      delete state.status[action.payload._id];
      const index = state.events.findIndex((e) => e._id === action.payload._id);
      if (index !== -1) state.events[index] = action.payload;
    });
    builder.addCase(updateEventThunk.rejected, (state, action) => {
      delete state.status[action.meta.arg._id];
      state.status[action.meta.arg._id] = { error: action.payload as string };
    });
  },
});

export const { setEvents, addEvent, updateEvent } = adminEventsSlice.actions;
export default adminEventsSlice.reducer;
