import {
  User,
  Mail,
  Fingerprint,
  Shield,
  Building2,
  GraduationCap,
} from "lucide-react";
import AccountField from "./AccountField";
import { IAdminProfile } from "@/types/profile";

interface AdminAccountSectionProps {
  data: IAdminProfile;
  onEdit: (label: string, value: string) => void;
}

const AdminAccountSection = ({ data, onEdit }: AdminAccountSectionProps) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#dbe1e6] overflow-hidden">
      <div className="p-4 px-6 border-b border-[#dbe1e6] bg-gray-50/20 flex items-center justify-between">
        <h2 className="text-md font-black text-[#111518] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#399aef] flex items-center justify-center text-white">
            <User size={16} />
          </div>
          Account Information
        </h2>
      </div>

      <div className="divide-y divide-[#dbe1e6]">
        <AccountField
          label="Email Address"
          value={data.email}
          icon={Mail}
          onEdit={onEdit}
        />
        <AccountField
          label="Admin ID"
          value={data.adminId}
          icon={Fingerprint}
          onEdit={onEdit}
        />
        <AccountField
          label="Role"
          value={data.role === "admin" ? "Administrator" : "Co-Administrator"}
          icon={Shield}
          onEdit={onEdit}
        />
        {data.instituteId && (
          <AccountField
            label="Institute ID"
            value={data.instituteId}
            icon={Building2}
            onEdit={onEdit}
          />
        )}
        {data.departmentId && (
          <AccountField
            label="Department ID"
            value={data.departmentId}
            icon={GraduationCap}
            onEdit={onEdit}
          />
        )}
      </div>
    </section>
  );
};

export default AdminAccountSection;