"use client";
import { Feature } from "@/types/types";
import { BellRing, CalendarDays, Timer, Presentation } from "lucide-react";

const FEATURES: Feature[] = [
  {
    id: "1",
    title: "Class Schedule",
    description:
      "Keep track of your daily classes effortlessly with an intuitive calendar view.",
    icon: CalendarDays,
  },
  {
    id: "2",
    title: "Tests & Countdowns",
    description:
      "Never miss an exam.  Built-in countdowns keep you aware of upcoming deadlines.",
    icon: Timer,
  },
  {
    id: "3",
    title: "Presentations & Viva",
    description:
      "Organize presentation slots and viva dates seamlessly with your peers.",
    icon: Presentation,
  },
  {
    id: "4",
    title: "Extra Class Alerts",
    description:
      "Get instant push notifications for rescheduled classes and important announcements.",
    icon: BellRing,
  },
];


export const FeaturesSection: React.FC = () => {
  return (
    <section id="feature" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-main tracking-tight mb-4">
              Key Features
            </h2>
            <p className="text-text-muted text-lg">
              Everything you need to manage your academic life efficiently, all
              in one place.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative flex flex-col p-6 bg-white border border-neutral-border rounded-xl hover:shadow-hover-card transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};