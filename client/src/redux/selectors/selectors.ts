// src/redux/slices/classroom/selectors.ts
import { RootState } from "@/redux/store";
import { current } from "@reduxjs/toolkit";

export const classroomId = (state: RootState): string | null => {
  return state.classroom.classroom?._id ?? null;
};

export const classroomName = (state: RootState): string | null => {
  return state.classroom.classroom?.name ?? null;
}

export const isAdmin = (state: RootState): boolean => {
  const role = state.classroom.classroom?.myRole;
  return role === "admin" || role === "co_admin";
};



// ------------- Profile Selectors -------------

export const selectUser  = (state: RootState) => {
  const user = state.auth.user;
  if (user) {
    return {
      ...user,
      currentClassroom: {
        id: "c1",
        name: "Computer Science 101",
        role: "admin",
        isAdmin: true,
        joinedAt: "2023-01-15T10:00:00Z",
      },
      department: "Computer Science",
      institute: "Tech University",
      intake: "2023",
      section: "A",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    };
  }
  return null;
};

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectCurrentClassroom = (state: RootState) => {
  const user = state.auth.user;
  if (!user) return null;
  return {
    id: "c1",
    name: "Computer Science 101",
    role: "admin",
    isAdmin: true,
    joinedAt: "2023-01-15T10:00:00Z",
  };
}