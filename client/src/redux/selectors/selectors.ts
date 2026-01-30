// src/redux/slices/classroom/selectors.ts
import { RootState } from "@/redux/store";

export const classroomId = (state: RootState): string | null => {
  return state.classroom.classroom?._id ?? null;
};

export const isAdmin = (state: RootState): boolean => {
  const role = state.classroom.classroom?.myRole;
  return role === "admin" || role === "co_admin";
};