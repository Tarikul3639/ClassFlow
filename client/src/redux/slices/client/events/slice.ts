import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "@/types/event";
import { fetchEventsFromServer } from "./thunks/fetchEventsFromServer";
import { markAsPrepared } from "./thunks/markAsPrepared";
import { IInitialState } from "./types";

const initialState: IInitialState = {
  events: [],
  status: {},
};

const clientEventSlice = createSlice({
  name: "clientEvents",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    // markAsPrepared
    builder.addCase(markAsPrepared.pending, (state, action) => {
      state.status[action.meta.arg] = { updating: true };
    });
    builder.addCase(markAsPrepared.fulfilled, (state, action) => {
      delete state.status[action.payload._id];
      const index = state.events.findIndex((e) => e._id === action.payload._id);
      if (index !== -1) {
        state.events[index].isCompleted = action.payload.isCompleted;
      }
    });
    builder.addCase(markAsPrepared.rejected, (state, action) => {
      delete state.status[action.meta.arg];
      state.status[action.meta.arg] = {
        error: action.payload as string,
      };
    });

    // fetchEventsFromServer
    builder.addCase(fetchEventsFromServer.pending, (state) => {
      state.status["all"] = { fetching: true };
    });
    builder.addCase(fetchEventsFromServer.fulfilled, (state, action) => {
      delete state.status["all"];
      state.events = action.payload;
    });
    builder.addCase(fetchEventsFromServer.rejected, (state, action) => {
      state.status["all"] = { error: action.payload as string };
    });
  },
});

// export const { actions, reducer } = clientEventSlice;
export const { addEvent } = clientEventSlice.actions;
export default clientEventSlice.reducer;
