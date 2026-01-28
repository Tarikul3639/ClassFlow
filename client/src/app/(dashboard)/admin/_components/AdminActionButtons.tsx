// _components/AdminActionButtons.tsx
"use client";
import React, { useState } from "react";
import { Edit3, Trash2, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteEventThunk } from "@/redux/slices/admin/events/thunks/deleteEventThunks";
import { Dialog } from "@/components/ui/Dialog";
import { toast } from "sonner";

interface AdminActionButtonsProps {
  id: string | number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(
    (state) => state.admin.status[id]?.deleting,
  );

  const handleDelete = async () => {
    try {
      await toast.promise(dispatch(deleteEventThunk(id.toString())).unwrap(), {
        loading: "Deleting event...",
        success: "Event deleted successfully!",
        error: (err) => `Failed to delete: ${err}`, // ← actual error
      });
    } catch (err) {
      console.error(err); // already handled in toast
    }
  };
  return (
    <>
      <div
        className="flex items-center gap-1 bg-[#f8fafc] p-1 rounded-xl border border-[#edf1f4] group-hover:bg-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Edit Button */}
        <button
          onClick={() => router.push(`/admin/${id}`)}
          className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[#617789] hover:text-[#399aef] hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
          title={`Edit Event ${id}`}
        >
          <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-gray-200 mx-0.5 hidden sm:block" />

        {/* Delete Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isDeleting}
          className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[#617789] hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
          title={`Delete Event ${id}`}
        >
          {isDeleting ? (
            <LoaderCircle
              strokeWidth={3}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin"
            />
          ) : (
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>
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
