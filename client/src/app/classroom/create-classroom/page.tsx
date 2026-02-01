"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Check,
  Loader2,
  School,
  AlertCircle,
  Building2,
  GraduationCap,
  Users,
  Hash,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateClassroomPayload } from "@/types/classroom/create.classroom";
import { createClassroomThunk } from "@/redux/slices/classroom/thunks/classroom/createClassroomThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCreateClassroomError } from "@/redux/slices/classroom/slice";

const CreateClassroomPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.classroom.requestStatus.createClassroom.loading,
  );
  const error = useAppSelector(
    (state) => state.classroom.requestStatus.createClassroom.error,
  );

  const [formData, setFormData] = useState<CreateClassroomPayload>({
    name: "",
    description: "",
    institute: "",
    department: "",
    intake: "",
    section: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      dispatch(setCreateClassroomError("Classroom name is required"));
      return;
    }
    if (!formData.institute.trim()) {
      dispatch(setCreateClassroomError("Institute name is required"));
      return;
    }
    if (!formData.department.trim()) {
      dispatch(setCreateClassroomError("Department is required"));
      return;
    }
    if (!formData.intake.trim()) {
      dispatch(setCreateClassroomError("Intake is required"));
      return;
    }

    try {
      const createdClassroom = await dispatch(
        createClassroomThunk(formData),
      ).unwrap();

      // Success - redirect to classroom
      router.push(`/classrooms/${createdClassroom._id}`);
    } catch (err) {
      dispatch(
        setCreateClassroomError(
          "Failed to create classroom. Please try again.",
        ),
      );
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans antialiased">
      <div className="h-21"></div>

      <main className="flex flex-col items-center p-3 sm:p-4 max-w-2xl mx-auto w-full pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 border border-[#e5e7eb]"
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
            <div className="w-15 h-15 rounded-full bg-[#1b9883]/10 flex items-center justify-center">
              <School className="w-7 h-7 text-[#1b9883]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold text-[#121716] mb-1.5">
              Create Classroom
            </h1>
            <p className="text-xs text-[#6b7280]">
              Set up a new classroom for your students
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
                <div className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-600" />
                  <p className="text-red-700 text-xs sm:text-xsm font-medium">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Classroom Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#1b9883]" />
                Classroom Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., CSE 50th Batch Section A"
                maxLength={100}
                className="w-full h-11 px-3.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all placeholder:font-normal"
                disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#1b9883]" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description about this classroom..."
                rows={3}
                maxLength={500}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all resize-none placeholder:font-normal"
                disabled={isLoading}
              />
            </div>

            {/* Institute */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#1b9883]" />
                Institute *
              </label>
              <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                placeholder="e.g., BUBT University"
                maxLength={200}
                className="w-full h-11 px-3.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all placeholder:font-normal"
                disabled={isLoading}
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#1b9883]" />
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science & Engineering"
                maxLength={200}
                className="w-full h-11 px-3.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all placeholder:font-normal"
                disabled={isLoading}
              />
            </div>

            {/* Intake & Section (Grid) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Intake */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#1b9883]" />
                  Intake *
                </label>
                <input
                  type="text"
                  name="intake"
                  value={formData.intake}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  maxLength={50}
                  className="w-full h-11 px-3.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all placeholder:font-normal"
                  disabled={isLoading}
                />
              </div>

              {/* Section */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-xxsm font-semibold text-[#121716] ml-0.5">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="e.g., A"
                  maxLength={10}
                  className="w-full h-11 px-3.5 text-sm rounded-lg border-2 border-[#e5e7eb] bg-[#f9fafb] text-[#121716] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1b9883]/20 focus:border-[#1b9883] outline-none transition-all placeholder:font-normal"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#1b9883] text-white text-sm font-semibold rounded-lg hover:bg-[#158770] shadow-[0_4px_12px_rgba(27,152,131,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1b9883] mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Create Classroom</span>
                </>
              )}
            </button>
          </form>

          {/* Info Text */}
          <div className="mt-5 pt-4 border-t border-[#e5e7eb]">
            <p className="text-xs sm:text-xxsm text-[#6b7280] text-center leading-relaxed">
              A unique join code will be generated after creation. Share it with
              your students to let them join.
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="w-full mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1b9883]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#1b9883]" strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs sm:text-xxsm font-semibold text-[#121716] mb-0.5">
                What happens next?
              </h4>
              <p className="text-xxs sm:text-xs text-[#6b7280] leading-relaxed">
                After creating the classroom, you'll receive a unique
                6-character code. Share this code with students so they can join
                your classroom.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateClassroomPage;
