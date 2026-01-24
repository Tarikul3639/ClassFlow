"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { AdminHeader } from "./_components/AdminHeader";
import { GeneralInfoSection } from "./_components/GeneralInfoSection";
import { ScheduleSection } from "./_components/ScheduleSection";
import { MaterialsSection } from "./_components/MaterialsSection";
import { ActionFooter } from "./_components/ActionFooter";
import { IMaterial } from "@/types/event";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  if (!id) {
    return <div>Invalid Event ID</div>;
  }

  const [topics, setTopics] = useState(["Calculus", "Derivatives"]);
  const [materials, setMaterials] = useState<IMaterial[]>([
    {
      _id: "1",
      type: "pdf",
      name: "Revision Notes - Module 2",
      url: "https://classflow.edu/resources/m2-notes.pdf",
    },
    {
      _id: "2",
      type: "pdf",
      name: "Formula Sheet",
      url: "https://classflow.edu/resources/formulae.pdf",
    },
  ]);

  return (
    <div className="min-h-screen max-w-2xl mx-auto overflow-hidden">
      <div className="h-16" />

      <AdminHeader id={id} />

      <div className="px-5 sm:px-10 py-8 space-y-12">
        <GeneralInfoSection />

        <ScheduleSection topics={topics} setTopics={setTopics} />

        <MaterialsSection materials={materials} setMaterials={setMaterials} />
      </div>

      <ActionFooter />
    </div>
  );
}
