"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Check,
  Loader2,
  NotebookPen,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { joinClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/joinClassroomThunk";
import { setJoinClassroomError } from "@/redux/slices/classroom/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const JoinClassroomPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const error = useAppSelector(
    (state) => state.classroom.requestStatus.joinClassroom.error,
  );
  const isLoading = useAppSelector(
    (state) => state.classroom.requestStatus.joinClassroom.loading,
  );

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length <= 6) {
      setCode(value);
      dispatch(setJoinClassroomError(""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      dispatch(setJoinClassroomError("Code must be 6 characters"));
      return;
    }

    dispatch(setJoinClassroomError(""));

    try {
      await dispatch(joinClassroomThunk(code));
      // Success - redirect to classroom
      router.push(`/classroom/${code}`);
    } catch (err) {
      dispatch(setJoinClassroomError("Invalid code. Please try again."));
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans antialiased">
      <div className="h-21"></div>

      <main className="flex flex-col items-center justify-center p-3 sm:p-4 max-w-sm sm:max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-5 border border-[#e5e7eb]"
        >
          {/* Back Button */}
          <div className="mb-5 sm:mb-4">
            <button
              onClick={() => router.back()}
              className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[#dbe1e6] hover:border-[#399aef] hover:bg-[#399aef]/5 transition-all duration-300 shadow-xs"
            >
              <ChevronLeft
                className="w-5 h-5 text-[#617789] group-hover:text-[#399aef] group-hover:-translate-x-0.5 transition-all"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-15 h-15 sm:w-14 sm:h-14 rounded-full bg-[#4D9DE0]/10 flex items-center justify-center">
              <NotebookPen
                className="w-7 h-7 sm:w-7 sm:h-7 text-[#4D9DE0]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-5 sm:mb-4">
            <h1 className="text-lg sm:text-lg font-bold text-[#121716] mb-1.5 sm:mb-1">
              Join Classroom
            </h1>
            <p className="text-xs sm:text-xs text-[#6b7280]">
              Enter the 6-character code from your instructor
            </p>
          </div>

          {/* Error Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4"
              >
                <div className="flex items-start gap-2 py-2.5 px-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Code Input */}
            <div className="space-y-2">
              <label className="text-xs sm:text-xs font-semibold text-[#121716] ml-0.5 block">
                Classroom Code
              </label>
              <input
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="ABC123"
                maxLength={6}
                className="w-full h-14 sm:h-12 px-4 text-center text-2xl font-bold tracking-[0.5em] uppercase rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#d1d5db] placeholder:tracking-[0.3em] focus:ring-2 focus:ring-[#4D9DE0]/20 focus:border-[#4D9DE0] outline-none transition-all"
                disabled={isLoading}
              />
              <p className="text-xs sm:text-xxs text-[#6b7280] ml-0.5">
                {code.length}/6 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full h-11 sm:h-10 bg-[#4D9DE0] text-white text-sm font-semibold rounded-lg hover:bg-[#3d8bc7] shadow-[0_4px_12px_rgba(77,157,224,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4D9DE0]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Join Classroom</span>
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-5 sm:mt-5 pt-4 border-t border-[#e5e7eb]">
            <p className="text-xs sm:text-xxs text-[#6b7280] text-center leading-relaxed">
              Don't have a code? Ask your instructor or CR to share the
              classroom code with you.
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#4D9DE0]/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#4D9DE0] text-xxs sm:text-xs font-bold">
                ?
              </span>
            </div>
            <div>
              <h4 className="text-xxs sm:text-xs font-semibold text-[#121716] mb-0.5">
                Where to find your code?
              </h4>
              <p className="text-xxs sm:text-xxs text-[#6b7280] leading-relaxed">
                Your instructor or CR should have shared a 6-character code.
                Check your email, group chat, or class announcement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinClassroomPage;
