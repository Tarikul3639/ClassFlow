import { Edit3, LucideIcon } from "lucide-react";

interface AccountFieldProps {
  label: string;
  value: string;
  icon: LucideIcon;
  isPassword?: boolean;
  readOnly?: boolean;
  onEdit: (label: string, value: string) => void;
}

const AccountField = ({
  label,
  value,
  icon: Icon,
  isPassword = false,
  readOnly = false,
  onEdit,
}: AccountFieldProps) => (
  <div className="px-4 md:px-6 py-4 flex items-center justify-between group hover:bg-blue-50/20 transition-all duration-300">
    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#399aef]/10 group-hover:text-[#399aef] transition-colors shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex flex-col gap-0 min-w-0">
        <span className="text-xxxs md:text-xxs font-black text-gray-400 uppercase tracking-widest">
          {label}
        </span>
        <p
          className={`text-[#111518] font-bold truncate ${isPassword ? "tracking-[0.2em] text-xxs md:text-xs" : "text-xxsm md:text-xsm"}`}
        >
          {value}
        </p>
      </div>
    </div>
    
    {!readOnly && (
      <button
        onClick={() => onEdit(label, value)}
        className="ml-2 p-2 md:p-1.5 text-gray-400 hover:text-[#399aef] hover:bg-white rounded-lg border border-[#dbe1e6] md:border-transparent md:hover:border-[#dbe1e6] transition-all flex items-center gap-1 shrink-0 md:opacity-0 md:group-hover:opacity-100"
      >
        <Edit3 size={12} />
        <span className="text-xxxs md:text-xxs font-black hidden xs:block pl-1.5 pr-1">
          Edit
        </span>
      </button>
    )}
  </div>
);

export default AccountField;