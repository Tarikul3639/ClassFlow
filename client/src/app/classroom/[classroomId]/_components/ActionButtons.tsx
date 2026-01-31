"use client";
import React, { useState } from "react";
import {
  Edit3,
  Trash2,
  LoaderCircle,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteEventThunk } from "@/redux/slices/classroom/thunks/event/deleteEventThunk";
import { setDeleteEventError } from "@/redux/slices/classroom/slice";
import { classroomId } from "@/redux/selectors/selectors";
import { Dialog } from "@/components/ui/Dialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ActionButtonsProps {
  _id: string;
  onEdit?: (_id: string) => void;
  onDelete?: (_id: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  isAdmin?: boolean; // New prop to differentiate admin/user
}

export function ActionButtons({
  _id,
  isExpanded,
  onToggleExpand,
  isAdmin = true,
}: ActionButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(
    (state) => state.classroom.requestStatus.deleteEvent.loading,
  );
  const classId = useAppSelector(classroomId);

  const handleDelete = async () => {
    try {
      if (!classId) throw new Error("Classroom ID not found");
      await toast.promise(
        dispatch(
          deleteEventThunk({ classroomId: classId, eventId: _id }),
        ).unwrap(),
        {
          loading: "Deleting event...",
          success: "Event deleted successfully!",
          error: (err) => `Failed to delete: ${err}`,
        },
      );
    } catch (err: any) {
      console.error(err);
      dispatch(setDeleteEventError(err.toString()));
    }
  };

  // User view - only expand button
  if (!isAdmin) {
    return (
      <button
        onClick={onToggleExpand}
        className="w-9 h-9 flex items-center justify-center text-[#617789] hover:text-[#399aef] bg-gray-50 hover:bg-gray-100 border border-[#edf1f4] rounded-lg transition-all active:scale-90"
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
      >
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  }

  return (
    <>
      {/* Desktop & Tablet View - Show all buttons */}
      <div
        className="hidden sm:flex items-center gap-0.5 sm:gap-1 bg-[#f8fafc] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#edf1f4] group-hover:bg-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={onToggleExpand}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-[#617789] hover:text-[#399aef] hover:bg-white hover:shadow-sm rounded-md sm:rounded-lg transition-all active:scale-90"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-gray-200 mx-0.5" />

        {/* Delete Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isDeleting}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-[#617789] hover:text-red-500 hover:bg-white hover:shadow-sm rounded-md sm:rounded-lg transition-all active:scale-90"
          title="Delete Event"
        >
          {isDeleting ? (
            <LoaderCircle strokeWidth={3} className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>

        {/* Edit Button */}
        <Link
          href={`/classroom/${classId}/${_id}`}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-[#617789] hover:text-[#399aef] hover:bg-white hover:shadow-sm rounded-md sm:rounded-lg transition-all active:scale-90"
          title="Edit Event"
        >
          <Edit3 className="w-4 h-4" />
        </Link>
      </div>

      {/* Mobile View - Compact & Modern Dropdown */}
      <div className="sm:hidden" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-9 h-9 flex items-center justify-center text-[#617789] bg-white border border-[#edf1f4] rounded-lg active:scale-90 transition-all"
              aria-label="More options"
            >
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-36 bg-white/95 backdrop-blur-md p-1 rounded-md border border-[#edf1f4] shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Expand Option */}
            <DropdownMenuItem
              onClick={onToggleExpand}
              className="flex items-center gap-2.5 px-2 py-1.5 text-xxsm! font-medium text-[#475569] hover:bg-[#f8fafc] hover:text-[#399aef] rounded-md cursor-pointer outline-none transition-colors group"
            >
              <div
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              >
                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover:text-[#399aef]"
                />
              </div>
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
            </DropdownMenuItem>

            {/* Edit Option */}
            <DropdownMenuItem
              onClick={() => router.push(`/classroom/${classId}/${_id}`)}
              className="flex items-center gap-2.5 px-2 py-1.5 text-xxsm! font-medium text-[#475569] hover:bg-[#f8fafc] hover:text-[#399aef] rounded-md cursor-pointer outline-none transition-colors group"
            >
              <Edit3
                size={14}
                className="text-slate-400 group-hover:text-[#399aef]"
              />
              <span>Edit Event</span>
            </DropdownMenuItem>

            {/* Subtle Divider */}
            <div className="h-px bg-[#f1f5f9] my-1 mx-1" />

            {/* Delete Option */}
            <DropdownMenuItem
              onClick={() => setIsModalOpen(true)}
              disabled={isDeleting}
              className="flex items-center gap-2.5 px-2 py-1.5 text-xxsm! font-medium text-red-500 hover:bg-red-50 focus:bg-red-50 rounded-md cursor-pointer outline-none transition-colors group"
            >
              {isDeleting ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Trash2
                  size={14}
                  className="text-red-400 group-hover:text-red-500"
                />
              )}
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        variant="danger"
        title="Delete Event?"
        description="Are you sure you want to delete this event? This action will permanently remove the record and all associated data."
        confirmText="Yes, Delete"
        loading={isDeleting}
      />
    </>
  );
};
