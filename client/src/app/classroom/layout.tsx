"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassroomThunk } from "@/redux/slices/classroom/thunks/classroom";
import { verifyAuthThunk } from "@/redux/slices/auth/thunks/verifyAuthThunk";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  const classroomLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom?.loading,
  );

  const user = useAppSelector((state) => state.auth?.user);
  const classrooms = useAppSelector((state) => state.auth?.user?.classrooms);
  const verifyError = useAppSelector(
    (state) => state.auth?.requestStatus?.refresh?.error,
  );

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Verify authentication with backend
        await dispatch(verifyAuthThunk()).unwrap();
        setIsVerifying(false);
      } catch (error) {
        console.error("❌ Auth verification failed:", error);
        // Redirect to sign-in if verification fails
        router.replace("/auth/sign-in");
      }
    };

    verifyUser();
  }, [dispatch, router]);

  useEffect(() => {
    // If verification returned error, redirect to sign-in
    if (verifyError) {
      console.error("🚫 Verification error, redirecting to sign-in");
      router.replace("/auth/sign-in");
    }
  }, [verifyError, router]);

  useEffect(() => {
    // Fetch classroom data after user is verified
    if (classrooms && classrooms.length > 0 && !isVerifying) {
      dispatch(fetchClassroomThunk(classrooms[0]));
    }
  }, [dispatch, classrooms, isVerifying]);

  // Show loading while verifying authentication
  if (isVerifying || classroomLoading) {
    return <Loader />;
  }

  // Only render if user is authenticated
  if (!user) {
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
