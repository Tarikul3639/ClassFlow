"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Sparkles,
  PlusCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { classroomId } from "@/redux/selectors/selectors";
import { useAppSelector } from "@/redux/hooks";

const GetStartedPage: React.FC = () => {
  const router = useRouter();
  const classId = useAppSelector(classroomId);

  const handleJoinClassroom = () => {
    router.push("/classroom/join-classroom");
  };

  const handleCreateClassroom = () => {
    router.push("/classroom/create-classroom");
  };

  useEffect(() => {
    if (classId) {
      router.push(`/classroom/${classId}`);
    }
  }, [classId, router]);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans antialiased">
      <div className="h-18"></div>
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 max-w-4xl mx-auto w-full">
        <div className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Hero Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4D9DE0]/10 rounded-full flex items-center justify-center">
              <BookOpen
                className="w-7 h-7 sm:w-9 sm:h-9 text-[#4D9DE0]"
                strokeWidth={1.5}
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <Sparkles
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1b9883]"
                fill="#1b9883"
              />
            </div>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-lg space-y-2 px-3"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#121716]">
              Ready to start your academic journey?
            </h1>
            <p className="text-[#6b7280] text-xs sm:text-sm leading-relaxed">
              Join an existing classroom or create your own to see your
              schedule, track assignments, and collaborate with your peers.
            </p>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl pt-1 px-3"
          >
            {/* Join Classroom Card */}
            <button
              onClick={handleJoinClassroom}
              className="group flex flex-col items-center text-center p-4 sm:p-5 bg-[#f8fafc] rounded-xl shadow-xs hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border-2 border-blue-50 hover:border-[#4D9DE0] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#4D9DE0]/10 flex items-center justify-center text-[#4D9DE0] group-hover:scale-110 transition-transform duration-300">
                <PlusCircle
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  strokeWidth={1.5}
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm sm:text-base font-bold text-[#121716] mb-1">
                  Join Classroom
                </h3>
                <p className="text-xxs sm:text-xs text-[#6b7280] leading-relaxed">
                  Enter a code provided by your instructor to get started.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-[#4D9DE0] font-semibold text-xs group-hover:gap-1 transition-all">
                Get Started
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Create Classroom Card */}
            <button
              onClick={handleCreateClassroom}
              className="group flex flex-col items-center text-center p-4 sm:p-5 bg-[#f8fafc] rounded-xl shadow-xs hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border-2 border-green-50 hover:border-[#1b9883] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1b9883]/10 flex items-center justify-center text-[#1b9883] group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <div className="mt-3">
                <h3 className="text-sm sm:text-base font-bold text-[#121716] mb-1">
                  Create Classroom
                </h3>
                <p className="text-xxs sm:text-xs text-[#6b7280] leading-relaxed">
                  For teachers and CRs. Set up a space for your students.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-[#1b9883] font-semibold text-xs group-hover:gap-1 transition-all">
                Set Up Space
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;
