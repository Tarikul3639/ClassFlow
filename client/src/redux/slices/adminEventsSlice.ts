import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "@/types/event";

interface AdminEventsState {
  events: IEvent[];
  status: {
    // e.g., "fetch", "add", "update", "delete"
    [eventId: string]: {
      deleting?: boolean;
      updating?: boolean;
      error?: string;
    };
  };
}

const initialState: AdminEventsState = {
  events: [
    {
      _id: "1",
      type: "ct",
      title: "Algorithms CT-1",
      date: "2026-01-24",
      startAt: "2026-01-24T10:00",
      endAt: "2026-01-24T11:30",
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

// Dummy API call placeholder
const fakeDeleteAPI = (_id: string) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      // 80% success rate
      Math.random() > 0.2 ? resolve(_id) : reject("Failed to delete");
    }, 1000);
  });

// Thunk
export const deleteEventThunk = createAsyncThunk(
  "adminEvents/deleteEvent",
  async (_id: string, { rejectWithValue }) => {
    try {
      const deletedId = await fakeDeleteAPI(_id);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

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
      const index = state.events.findIndex(
        (event) => event._id === action.payload._id,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEventThunk.pending, (state, action) => {
        state.status[action.meta.arg] = { deleting: true };
      })
      .addCase(
        deleteEventThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          delete state.status[action.payload];
          state.events = state.events.filter(
            (event) => event._id !== action.payload,
          );
        },
      )
      .addCase(deleteEventThunk.rejected, (state, action) => {
        delete state.status[action.meta.arg];
        state.status[action.meta.arg] = { error: action.payload as string };
      });
  },
});

export const { setEvents, addEvent, updateEvent } = adminEventsSlice.actions;
export default adminEventsSlice.reducer;
