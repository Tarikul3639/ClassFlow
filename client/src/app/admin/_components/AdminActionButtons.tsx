// _components/AdminActionButtons.tsx
import React from "react";
import { Edit3, Trash2 } from "lucide-react";

interface AdminActionButtonsProps {
  id: string | number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({
  id,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="flex items-center gap-1 bg-[#f8fafc] p-1 rounded-xl border border-[#edf1f4] group-hover:bg-white transition-colors"
      onClick={(e) => e.stopPropagation()} 
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit?.(id)}
        className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[#617789] hover:text-[#399aef] hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
        title={`Edit Event ${id}`}
      >
        <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      {/* Vertical Divider */}
      <div className="w-px h-4 bg-gray-200 mx-0.5 hidden sm:block" />

      {/* Delete Button */}
      <button
        onClick={() => onDelete?.(id)}
        className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-[#617789] hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
        title={`Delete Event ${id}`}
      >
        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};
