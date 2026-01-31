"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/ui/Loader";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyAuthThunk } from "@/redux/slices/auth/thunks/verifyAuthThunk";

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
    dispatch(verifyAuthThunk());
  }, [dispatch]);

  if (isLoading) {
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
