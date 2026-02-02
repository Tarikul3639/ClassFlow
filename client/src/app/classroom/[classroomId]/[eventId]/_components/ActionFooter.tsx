"use client";

import Link from "next/link";
import { Save, X, Loader2, AlertCircle } from "lucide-react";
import { IEvent } from "@/redux/slices/classroom/types";
import { createEventThunk } from "@/redux/slices/classroom/thunks/event/createEventThunk";
import { updateEventThunk } from "@/redux/slices/classroom/thunks/event/updateEventThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { classroomId } from "@/redux/selectors/selectors";
import { motion, AnimatePresence } from "framer-motion";

interface ActionFooterProps {
  form: IEvent;
}

export const ActionFooter = ({ form }: ActionFooterProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const classId = useAppSelector(classroomId);
  const isBusy = useAppSelector(
    (state) =>
      state.classroom.requestStatus.updateEvent.loading ||
      state.classroom.requestStatus.createEvent.loading,
  );
  const error = useAppSelector(
    (state) =>
      state.classroom.requestStatus.updateEvent.error ||
      state.classroom.requestStatus.createEvent.error,
  );

  if (!classId) {
    return null;
  }

  const handleSubmit = async () => {
    console.log(form);
    try {
      if (form._id === "new") {
        await dispatch(
          createEventThunk({
            classroomId: classId,
            eventData: Object.fromEntries(
              Object.entries(form).filter(
                ([key]) =>
                  key !== "_id" &&
                  key !== "createdAt" &&
                  key !== "createdBy" &&
                  key !== "updatedAt" &&
                  key !== "classroomId",
              ),
            ) as Omit<
              IEvent,
              "_id" | "createdAt" | "createdBy" | "updatedAt" | "classroomId"
            >,
          }),
        ).unwrap();
        router.push(`/classroom/${classId}`);
      } else {
        await dispatch(
          updateEventThunk({
            classroomId: classId,
            eventId: form._id,
            eventData: Object.fromEntries(
              Object.entries(form).filter(
                ([key]) =>
                  key !== "_id" &&
                  key !== "createdAt" &&
                  key !== "createdBy" &&
                  key !== "updatedAt" &&
                  key !== "classroomId",
              ),
            ) as Omit<
              IEvent,
              "_id" | "createdAt" | "createdBy" | "updatedAt" | "classroomId"
            >,
          }),
        ).unwrap();
        router.push(`/classroom/${classId}`);
        console.log("Event updated:", form);
      }
    } catch (err) {
      console.error("Failed to save event:", err);
    }
  };

  return (
    <div className="px-5 sm:px-10 pb-8 sm:pb-10 pt-4 backdrop-blur-md sticky bottom-0 z-50">
      {error && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-6 w-full px-1"
          >
            <div className="flex items-center gap-3 px-3.5 py-1 sm:py-1.5 sm:px-4 bg-red-50/60 border border-red-100 rounded-full backdrop-blur-md relative overflow-hidden shadow-sm shadow-red-100/20">
              {/* Icon Area: Fixed size */}
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                  <AlertCircle
                    size={20}
                    className="size-4 sm:size-5"
                    strokeWidth={2.5}
                  />
                </motion.div>
              </div>

              {/* Text Area: Flexible width */}
              <div className="flex-1 min-w-0">
                <p className="text-xxsm sm:text-[13.5px] font-medium text-red-800 leading-tight sm:leading-snug wrap-break-word">
                  {error}
                </p>
              </div>

              {/* Decorative Blur Element */}
              <div className="hidden sm:block absolute top-0 right-0 -mr-4 -mt-4 w-12 h-12 bg-red-200/30 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="max-w-4xl mx-auto p-2 sm:p-3 rounded-3xl sm:rounded-4xl flex items-center justify-between gap-2 shadow-[#111518]/20">
        {/* Cancel Button */}
        <Link href={`/classroom/${classId}`} className="flex-1">
          <button
            disabled={isBusy}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-3xl sm:rounded-4xl  bg-gray-200 text-black hover:text-red-500 hover:bg-red-100 transition-all duration-300 disabled:opacity-50"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
              Discard
            </span>
          </button>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 hidden sm:block" />

        {/* Save Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isBusy}
          className={`flex-[1.5] sm:flex-1 group relative flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-3xl sm:rounded-4xl bg-[#399aef] text-white overflow-hidden transition-all duration-500 hover:bg-[#2d82cc] hover:shadow-[0_0_20px_rgba(57,154,239,0.4)] active:scale-[0.96] disabled:opacity-50`}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-shine" />

          {isBusy ? (
            <Loader2
              size={14}
              className="sm:w-4 sm:h-4 animate-spin transition-transform"
            />
          ) : (
            <Save
              size={14}
              className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform"
            />
          )}
          <span className="hidden sm:inline text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
            {isBusy ? "Saving..." : "Confirm Changes"}
          </span>
          <span className="sm:hidden text-xxxs sm:text-xxxxs lg:text-xxxs font-black uppercase tracking-[0.25em]">
            {isBusy ? "Saving..." : "Save"}
          </span>
        </button>
      </div>
    </div>
  );
};
