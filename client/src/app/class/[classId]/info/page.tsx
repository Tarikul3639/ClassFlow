"use client";

import React from "react";
import {
  Users,
  Calendar,
  Clock,
  BookOpen,
  MoreVertical,
  Edit3,
  Mail,
  Copy,
  Plus,
  GraduationCap,
  Layers,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// --- Types ---
type Teacher = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Co-Admin" | "Teacher";
  avatarUrl: string;
};

type Group = {
  id: string;
  name: string;
  membersCount: number;
  joinCode: string;
};

type ClassDetails = {
  name: string;
  code: string;
  subject: string;
  semester: string;
  totalStudents: number;
  schedule: string;
  description: string;
};

// --- Mock Data ---
const classData: ClassDetails = {
  name: "Advanced Mathematics 101",
  code: "MATH-2024-X",
  subject: "Mathematics",
  semester: "Fall 2024",
  totalStudents: 34,
  schedule: "Mon, Wed, Fri • 10:00 AM - 11:30 AM",
  description:
    "An in-depth exploration of calculus, linear algebra, and statistical modeling for engineering students.",
};

const teachersData: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@university.edu",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "t2",
    name: "Prof. James Carter",
    email: "j.carter@university.edu",
    role: "Co-Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "t3",
    name: "Emily Chen",
    email: "emily.chen@university.edu",
    role: "Teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  },
];

const groupsData: Group[] = [
  {
    id: "g1",
    name: "Study Group A - Calculus",
    membersCount: 12,
    joinCode: "CALC-A",
  },
  {
    id: "g2",
    name: "Project Team Alpha",
    membersCount: 5,
    joinCode: "PROJ-X",
  },
  {
    id: "g3",
    name: "Homework Help Circle",
    membersCount: 8,
    joinCode: "HELP-9",
  },
];

// --- Components ---

const Header = ({ classInfo }: { classInfo: ClassDetails }) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl md:text-3xl font-black text-[#111518] tracking-tight">
          {classInfo.name}
        </h1>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#399aef] text-xs font-black border border-blue-100 uppercase tracking-wide">
          {classInfo.code}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">
          Class Overview
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        {classInfo.semester}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <button className="px-4 py-2.5 bg-white border border-[#dbe1e6] text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
        <Users size={16} />
        <span className="hidden sm:inline">Invite Members</span>
      </button>
      <button className="px-4 py-2.5 bg-[#399aef] text-white text-sm font-bold rounded-xl hover:bg-[#2d84d1] transition-all shadow-md hover:shadow-lg flex items-center gap-2">
        <Edit3 size={16} />
        <span className="hidden sm:inline">Edit Class</span>
      </button>
    </div>
  </header>
);

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
    <div className="p-2 rounded-lg bg-blue-50 text-[#399aef]">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const TeacherCard = ({ teacher }: { teacher: Teacher }) => (
  <div className="group flex items-center justify-between p-4 bg-white border border-[#e5e9eb] rounded-2xl hover:border-[#399aef]/40 hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
          <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
          <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
            {teacher.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        {teacher.role === "Admin" && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white" title="Admin" />
        )}
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#111518] group-hover:text-[#399aef] transition-colors">
          {teacher.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-1.5">{teacher.email}</p>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider
          ${
            teacher.role === "Admin"
              ? "bg-amber-50 text-amber-600 border border-amber-100"
              : teacher.role === "Co-Admin"
              ? "bg-purple-50 text-purple-600 border border-purple-100"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {teacher.role}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        className="p-2 text-slate-400 hover:text-[#399aef] hover:bg-blue-50 rounded-lg transition-colors"
        title="Send Email"
      >
        <Mail size={16} />
      </button>
      <button className="p-2 text-slate-400 hover:text-[#399aef] hover:bg-blue-50 rounded-lg transition-colors">
        <MoreVertical size={16} />
      </button>
    </div>
  </div>
);

const GroupCard = ({ group }: { group: Group }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(group.joinCode);
    toast.success("Group code copied!");
  };

  return (
    <div className="min-w-[280px] p-4 bg-white border border-[#e5e9eb] rounded-2xl hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-[#399aef]">
          <Layers size={20} />
        </div>
        <button className="text-slate-400 hover:text-[#399aef] transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold text-[#111518] mb-1 line-clamp-1">
          {group.name}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Users size={12} />
          {group.membersCount} Members
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
            Join Code
          </span>
          <span className="text-xs font-mono font-bold text-slate-700">
            {group.joinCode}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="p-1.5 text-slate-400 hover:text-[#399aef] hover:bg-blue-50 rounded-lg transition-all"
        >
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function ClassOverviewPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header classInfo={classData} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Teachers (4 cols on desktop) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Teachers Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-[#111518] flex items-center gap-2">
                  <GraduationCap size={20} className="text-[#399aef]" />
                  Teachers & Instructors
                </h2>
                <button className="text-xs font-bold text-[#399aef] hover:underline">
                  Manage Teachers
                </button>
              </div>

              {teachersData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachersData.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                  ))}
                  
                  {/* Add Teacher Button */}
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#e5e9eb] rounded-2xl hover:border-[#399aef] hover:bg-blue-50/50 transition-all duration-300 group min-h-[100px]">
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-[#399aef] transition-colors mb-2 shadow-sm">
                      <Plus size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-500 group-hover:text-[#399aef]">
                      Add Instructor
                    </span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Users size={24} />
                  </div>
                  <p className="text-slate-500 font-medium">No teachers assigned yet.</p>
                </div>
              )}
            </section>

             {/* Groups Section (Moved to left for better flow in 2/3 column layout) */}
             <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-[#111518] flex items-center gap-2">
                  <Layers size={20} className="text-[#399aef]" />
                  Groups & Teams
                </h2>
                <button className="text-xs font-bold text-[#399aef] hover:underline">
                  View All Groups
                </button>
              </div>

              {groupsData.length > 0 ? (
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                  {groupsData.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                  <button className="min-w-[100px] flex flex-col items-center justify-center border-2 border-dashed border-[#e5e9eb] rounded-2xl hover:border-[#399aef] hover:bg-blue-50/50 transition-all">
                    <Plus size={24} className="text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-500">Create</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                  <p className="text-slate-500 font-medium">No groups created yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Class Info & Metadata (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-[#e5e9eb] p-6 sticky top-8">
              <h3 className="text-sm font-black text-[#111518] uppercase tracking-wider mb-5 pb-3 border-b border-slate-100">
                About this Class
              </h3>
              
              <div className="space-y-2">
                <InfoCard 
                  icon={BookOpen} 
                  label="Subject" 
                  value={classData.subject} 
                />
                <InfoCard 
                  icon={Calendar} 
                  label="Semester" 
                  value={classData.semester} 
                />
                <InfoCard 
                  icon={Users} 
                  label="Total Students" 
                  value={classData.totalStudents} 
                />
                <InfoCard 
                  icon={Clock} 
                  label="Schedule" 
                  value={classData.schedule} 
                />
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                  Description
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {classData.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}