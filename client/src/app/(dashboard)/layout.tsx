"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-display antialiased text-[#111518]">
      <Navbar />
      {children}
      {/* Add it at the very bottom of the main container or inside the main wrapper */}
    </div>
  );
}
