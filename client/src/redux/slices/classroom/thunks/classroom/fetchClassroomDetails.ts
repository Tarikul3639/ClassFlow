import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClassroom } from "@/redux/slices/classroom/types";
import { extractErrorMessage } from "@/lib/utils/error.utils";
import { apiClient } from "@/lib/api/axios";

export const fetchClassroomDetails = createAsyncThunk<
  IClassroom,
  void,
  { rejectValue: string }
>("classroom/fetchClassroomDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<{ classroom: IClassroom }>(
      "/classroom",
      {
        withCredentials: true,
      },
    );

    if (!response?.data?.classroom) {
      throw new Error("Failed to fetch classroom");
    }

    const classroom = response.data.classroom;

    return {
      _id: classroom._id,
      name: classroom.name,
      description: classroom.description,
      institute: classroom.institute,
      department: classroom.department,
      intake: classroom.intake,
      section: classroom.section,
      joinCode: classroom.joinCode,
      isJoinCodeActive: classroom.isJoinCodeActive,
      createdBy: classroom.createdBy,
      members: classroom.members,
      events: classroom.events,
      isActive: classroom.isActive,
      isArchived: classroom.isArchived,
      coverImage: classroom.coverImage,
      totalMembers: classroom.totalMembers,
      totalEvents: classroom.totalEvents,
      myRole: classroom.myRole,
    };
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});
