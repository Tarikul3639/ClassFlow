"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyAuthThunk } from "@/redux/slices/auth/thunks/verifyAuthThunk";
export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyAuthThunk());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-white font-display antialiased text-[#111518]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
