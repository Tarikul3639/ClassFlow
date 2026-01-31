import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { IBaseUser, IAdminProfile } from "@/types/profile";
import {
  demoClassroom,
  demoClassroomMembers,
  demoUsers,
} from "../slices/classroom/demoData";

// Base selectors
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectClassroom = (state: RootState) => state.classroom.classroom;

// Check if user is admin
export const selectIsAdmin = createSelector([selectClassroom], (classroom) => {
  if (!classroom?.myRole) return false;
  return classroom.myRole === "admin" || classroom.myRole === "co_admin";
});

// Get current user's classroom member info
export const selectCurrentUserMember = createSelector(
  [selectAuthUser, selectClassroom],
  (user, classroom) => {
    if (!user || !classroom) return null;
    return classroom.members.find((m) => m.user._id === user._id);
  },
);

// Build profile user data
export const selectProfileUser = createSelector(
  [selectAuthUser, selectClassroom, selectCurrentUserMember],
  (user, classroom, memberInfo): IBaseUser | null => {
    // if (!user || !classroom || !memberInfo) return null;

    // return {
    //   ...user,
    //   currentClassroom: {
    //     _id: classroom._id,
    //     name: classroom.name,
    //     role: memberInfo.role,
    //     joinedAt: memberInfo.joinedAt,
    //   },
    //   institute: classroom.institute,
    //   department: classroom.department,
    //   intake: classroom.intake,
    //   section: classroom.section,
    // };

    return {
      _id: demoUsers[0]._id,
      name: demoUsers[0].name,
      email: demoUsers[0].email,
      avatarUrl: demoUsers[0].avatarUrl,
      createdAt: "2026-01-01T08:00:00.000Z",
      updatedAt: "2026-01-31T10:00:00.000Z",
      currentClassroom: {
        _id: demoClassroom._id,
        name: demoClassroom.name,
        role: "admin",
        joinedAt: demoClassroomMembers[0].joinedAt,
      },
      institute: demoClassroom.institute,
      department: demoClassroom.department,
      intake: demoClassroom.intake,
      section: demoClassroom.section,
    };
  },
);

// Build admin profile data
export const selectAdminProfile = createSelector(
  [selectProfileUser, selectClassroom, selectIsAdmin],
  (user, classroom, isAdmin): IAdminProfile | null => {
    if (!user || !classroom || !isAdmin) return null;

    const totalAdmins = classroom.members.filter(
      (m) => m.role === "admin" || m.role === "co_admin",
    ).length;

    const totalBlockedMembers = classroom.members.filter(
      (m) => m.isBlocked,
    ).length;

    return {
      ...user,
      members: classroom.members,
      classroomInfo: {
        joinCode: classroom.joinCode || "N/A",
        isJoinCodeActive: classroom.isJoinCodeActive,
        totalMembers: classroom.totalMembers,
        totalAdmins,
        totalEvents: classroom.totalEvents,
        totalBlockedMembers,
      },
    };
  },
);

// Check permissions
export const selectCanAssignCoAdmin = createSelector(
  [selectCurrentUserMember],
  (member) => member?.role === "admin",
);

export const selectCanBlockUser = createSelector(
  [selectCurrentUserMember],
  (member) => member?.role === "admin" || member?.role === "co_admin",
);

export const selectCanRemoveCoAdmin = createSelector(
  [selectCurrentUserMember],
  (member) => member?.role === "admin",
);
