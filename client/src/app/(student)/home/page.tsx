"use client";
import React, { useState } from "react";
import { FileQuestion, School, ClipboardList, Check } from "lucide-react";
import Navbar from "./_components/Navbar";
import EventCard from "./_components/EventCard";
import Footer from "./_components/Footer";

const StudentView = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const events = [
    {
      id: 1,
      type: "quiz",
      title: "CT: Algorithms",
      time: "10:00 AM - 11:30 AM",
      location: "Room 304",
      deadline: "In 30 mins",
      color: "#ef4444",
      icon: <FileQuestion size={22} />,
      topics: ["Bresenham Algorithm", "Circle Generation"],
      materials: ["PDF Slides", "Lecture Notes"]
    },
    {
      id: 2,
      type: "lecture",
      title: "Lecture: Data Structures",
      time: "12:00 PM - 1:00 PM",
      location: "Hall B",
      deadline: "In 2.5 hrs",
      color: "#399aef",
      icon: <School size={22} />
    },
    {
      id: 3,
      type: "assignment",
      title: "Assignment Due: UX Research",
      time: "Due at 11:59 PM",
      location: "Online Submission",
      deadline: "In 12 hrs",
      color: "#f59e0b",
      icon: <ClipboardList size={22} />
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col font-display antialiased text-[#111518]">
      <Navbar />
      
      <div className="h-24"></div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        <header className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Tuesday, <span className="text-gray-400 font-bold">Oct 24</span>
          </h1>
          <div className="flex items-center gap-2 text-[#399aef] font-bold text-sm">
            <span className="flex w-2 h-2 rounded-full bg-[#399aef] animate-pulse"></span>
            <p>3 events remaining today</p>
          </div>
        </header>

        <section className="space-y-4">
          {events.map((event) => (
            <EventCard 
              key={event.id}
              event={event}
              isExpanded={expandedId === event.id}
              onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
            />
          ))}
        </section>

        <div className="flex items-center gap-4 py-2 mt-4">
          <div className="h-px bg-[#dbe1e6] flex-1"></div>
          <span className="text-xxs font-black text-[#617789] uppercase tracking-[0.2em]">Completed Today</span>
          <div className="h-px bg-[#dbe1e6] flex-1"></div>
        </div>

        <article className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-dashed border-[#dbe1e6] opacity-60 grayscale">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <Check size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#617789] line-through">Morning Standup</h3>
            <p className="text-xs text-gray-400 font-medium">9:00 AM - 9:30 AM</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default StudentView;