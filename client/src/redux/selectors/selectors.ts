// src/redux/slices/classroom/selectors.ts
import { RootState } from "@/redux/store";

export const classroomId = (state: RootState): string | null => {
  return state.classroom.classroom?._id ?? null;
};
