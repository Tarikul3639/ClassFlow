import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api/axios";
import { extractErrorMessage } from "@/lib/utils/error.utils";

export const deactivateAccountThunk = createAsyncThunk(
  "auth/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete("/auth/account");
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);