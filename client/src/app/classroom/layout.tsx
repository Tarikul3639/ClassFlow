"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader";

import { useEffect } from "react";
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
  const isVerifying = useAppSelector(
    (state) => state.auth.requestStatus?.refresh?.loading,
  );

  const classroomLoading = useAppSelector(
    (state) => state.classroom.requestStatus.fetchClassroom?.loading,
  );

  const user = useAppSelector((state) => state.auth.user);
  const classrooms = user?.classrooms;
  const verifyError = useAppSelector(
    (state) => state.auth.requestStatus?.refresh?.error,
  );

  // ✅ Verify auth once
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await dispatch(verifyAuthThunk()).unwrap();
      } catch (err) {
        // Clear all auth data from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("auth_status");
        // Clear auth marker cookie
        document.cookie = "cf_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.replace("/auth/sign-in");
      }
    };

    verifyUser();
  }, [dispatch, router]);

  // ✅ Redirect on verification error
  useEffect(() => {
    if (verifyError) {
      router.replace("/auth/sign-in");
    }
  }, [verifyError, router]);

  // ✅ Fetch classroom after auth success
  useEffect(() => {
    if (!isVerifying && classrooms?.length) {
      dispatch(fetchClassroomThunk(classrooms[0]));
    }
  }, [dispatch, classrooms, isVerifying]);

  // ✅ Redirect if no user after verification
  useEffect(() => {
    if (!isVerifying && !user) {
      router.replace("/auth/sign-in");
    }
  }, [user, isVerifying, router]);

  // ✅ Loader control
  if (isVerifying || classroomLoading) {
    return <Loader />;
  }

  // ✅ Show nothing while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-display antialiased text-[#111518]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
