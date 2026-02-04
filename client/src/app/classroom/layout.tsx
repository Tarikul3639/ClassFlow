"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassroomThunk } from "@/redux/slices/classroom/thunks/classroom";
import { verifyAuthThunk } from "@/redux/slices/auth/thunks/verifyAuthThunk";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const classroomLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom?.loading,
  );

  const classrooms = useAppSelector((state) => state.auth?.user?.classrooms);

  useEffect(() => {
    dispatch(verifyAuthThunk()); //TODO: Not needed if we have middleware. Right now use just for fetching user data on refresh
  }, [dispatch]);

  useEffect(() => {
    // Middleware already guaranteed user is authenticated
    // So we just fetch data
    if (classrooms && classrooms.length > 0) {
      dispatch(fetchClassroomThunk(classrooms[0]));
    }
  }, [dispatch, classrooms]);

  if (classroomLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white font-display antialiased text-[#111518]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
