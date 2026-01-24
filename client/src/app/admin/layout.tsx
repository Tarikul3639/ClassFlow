import React from "react";
import Navbar from "./_components/Navbar";
import { AdminFooter } from "./_components/AdminFooter";
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
      <div className="w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl mx-auto">
        <AdminFooter studentRoute="/student" />
      </div>
    </div>
  );
}
