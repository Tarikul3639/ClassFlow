import { BadgeCheck, Cpu, Edit3, GraduationCap, ArrowLeft } from "lucide-react";
import { IStudentProfile } from "@/types/profile";
import { AnimatePresence } from "motion/react";
import ProfileEditModal from "./ProfileEditModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  data: IStudentProfile;
}

const ProfileHeader = ({ data }: ProfileHeaderProps) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };
  const router = useRouter();
  return (
    <header className="relative bg-linear-to-r from-[#399aef] to-[#4D9DE0] rounded-2xl p-6 md:p-8 overflow-hidden shadow-md shadow-blue-100/40">
      {/* 1. Back Button - Positioned Top Left */}
      <div className="absolute top-4 left-4 md:top-5 z-10">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all group active:scale-90"
          title="Go Back"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>
      </div>
      <div className="absolute -right-10 -top-10 opacity-10 rotate-12 pointer-events-none">
        <GraduationCap size={160} strokeWidth={1} />
      </div>
      <div className="relative flex flex-col md:flex-row md:mx-6 items-center gap-6 text-white">
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 p-1 shadow-xl overflow-hidden">
            <img
              alt="Student Profile"
              className="w-full h-full object-cover rounded-full"
              src={data.avatarUrl}
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-black tracking-tight mb-2">
            {data.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-white/90 font-bold text-xxs">
            <span className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm">
              <BadgeCheck size={14} />
              ID: #{data.studentId}
            </span>
            <span className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm">
              <Cpu size={14} />
              {data.department}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={openProfileModal}
            className="px-4 py-2 bg-white backdrop-blur-2xl text-[#399aef] text-[12px] font-black rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 group"
          >
            <Edit3
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal for Profile Editing */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <ProfileEditModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            currentData={{
              name: data.name,
              avatar: data.avatarUrl,
            }}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default ProfileHeader;
