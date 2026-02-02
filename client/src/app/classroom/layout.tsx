"use client";
import React, { use } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyAuthThunk } from "@/redux/slices/auth/thunks/verifyAuthThunk";
import { fetchClassroomDetails } from "@/redux/slices/classroom/thunks/classroom/fetchClassroomDetails";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useAppSelector(
    (state) => state.auth?.requestStatus.refresh.loading,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        const user = await dispatch(verifyAuthThunk()).unwrap();
        if (user) {
          dispatch(fetchClassroomDetails(user.classrooms[0]));
        }
      } catch (error) {}
    })();
  }, [dispatch]);

  if (isLoading && !children) {
    return <Loader />; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-white font-display antialiased text-[#111518]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
