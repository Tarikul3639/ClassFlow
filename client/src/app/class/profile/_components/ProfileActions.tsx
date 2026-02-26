import { ShieldCheck } from "lucide-react";

const ProfileActions = () => {
  return (
    <div className="flex flex-row justify-end items-center gap-3">
      <button className="px-4 py-2.5 text-xxs font-black text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest rounded-xl hover:border-red-100 border border-transparent flex items-center gap-2">
        Deactivate
      </button>
      <button className="px-5 py-2.5 text-[11px] font-black bg-[#399aef]/10 text-[#399aef] rounded-xl transition-all flex items-center gap-2">
        <ShieldCheck size={14} />
        Security Settings
      </button>
    </div>
  );
};

export default ProfileActions;