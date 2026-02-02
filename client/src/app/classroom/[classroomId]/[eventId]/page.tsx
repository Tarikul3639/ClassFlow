"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminHeader } from "./_components/AdminHeader";
import { GeneralInfoSection } from "./_components/GeneralInfoSection";
import { ScheduleSection } from "./_components/ScheduleSection";
import { MaterialsSection } from "./_components/MaterialsSection";
import { ActionFooter } from "./_components/ActionFooter";
import { IEvent, IMaterial } from "@/redux/slices/classroom/types";
import { useAppSelector } from "@/redux/hooks";
import { getCurrentEvent } from "@/redux/selectors/event";

export default function Page() {
  const params = useParams();
  const id = params.eventId as string;

  const existingEvent = useAppSelector((state) =>
    id && id !== "new" ? getCurrentEvent(state, id) : null,
  );

  const [form, setForm] = useState<IEvent>({
    _id: id,
    title: "",
    type: "lecture",
    date: "",
    startAt: "",
    location: "",
    topics: "",
    materials: [] as IMaterial[],
    endAt: "",
    isCompleted: false,
    createdBy: { _id: "", name: "", email: "", classrooms: [] },
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (existingEvent) {
      setForm(existingEvent);
    }
  }, [existingEvent]);

  if (id == null || id === "") {
    return <div>Invalid Event ID</div>;
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto overflow-hidden">
      <div className="h-16" />

      <AdminHeader id={id} />

      <div className="px-5 sm:px-10 py-8 space-y-12">
        <GeneralInfoSection form={form} setForm={setForm} />
        <ScheduleSection form={form} setForm={setForm} />
        <MaterialsSection form={form} setForm={setForm} />
      </div>

      <ActionFooter form={form} />
    </div>
  );
}
