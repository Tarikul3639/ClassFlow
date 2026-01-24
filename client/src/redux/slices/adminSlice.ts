import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  eventDraft: any | null;
}

const initialState: AdminState = {
  eventDraft: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setEventDraft(state, action: PayloadAction<any>) {
      state.eventDraft = action.payload;
    },
    clearEventDraft(state) {
      state.eventDraft = null;
    },
  },
});

export const { setEventDraft, clearEventDraft } = adminSlice.actions;
export default adminSlice.reducer;
