import { User, Mail, Building2, GraduationCap, LayoutPanelTop, Album, Shield, Clock } from "lucide-react";
import { IUser } from "@/redux/slices/auth/types";
import AccountField from "./AccountField";
import { IBaseUser } from "@/types/profile";

export interface UserSectionProps {
  user: IBaseUser;
  isAdmin: boolean;
  onEdit: (label: string, value: string, type?: 'text' | 'email' | 'password') => void;
}

const UserSection = ({ user, isAdmin, onEdit }: UserSectionProps) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
      {/* Header */}
      <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
        <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#399aef] flex items-center justify-center text-white">
            <User size={16} />
          </div>
          User Information
        </h2>
        <span className="px-3 py-1 rounded-lg bg-[#399aef]/10 text-[#399aef] text-xxxs font-black uppercase tracking-wider">
          {isAdmin ? 'Administrator' : 'Student'}
        </span>
      </div>

      {/* Fields */}
      <div className="divide-y divide-[#dbe1e6]">
        <AccountField
          label="Full Name"
          value={user.name}
          icon={User}
          onEdit={onEdit}
        />
        
        <AccountField
          label="Email Address"
          value={user.email}
          icon={Mail}
          onEdit={onEdit}
        />

        <AccountField
          label="Role in Classroom"
          value={user.currentClassroom.role === 'admin' ? 'Administrator' : user.currentClassroom.role === 'co_admin' ? 'Co-Administrator' : 'Student'}
          icon={Shield}
          onEdit={() => {}} // Read-only
          readOnly
        />

        <AccountField
          label="Institute"
          value={user.institute}
          icon={Building2}
          onEdit={onEdit}
        />

        <AccountField
          label="Department"
          value={user.department}
          icon={GraduationCap}
          onEdit={onEdit}
        />

        <AccountField
          label="Intake"
          value={user.intake}
          icon={LayoutPanelTop}
          onEdit={onEdit}
        />

        {user.section && (
          <AccountField
            label="Section"
            value={user.section}
            icon={Album}
            onEdit={onEdit}
          />
        )}

        <AccountField
          label="Joined Classroom"
          value={new Date(user.currentClassroom.joinedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          icon={Clock}
          onEdit={() => {}} // Read-only
          readOnly
        />
      </div>
    </section>
  );
};

export default UserSection;