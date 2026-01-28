import {
  User,
  Mail,
  Fingerprint,
  GraduationCap,
  LayoutPanelTop,
  Album,
  Building2,
} from "lucide-react";
import AccountField from "./AccountField";
import { IStudentProfile } from "@/types/profile";

interface StudentAccountSectionProps {
  data: IStudentProfile;
  onEdit: (label: string, value: string) => void;
}

const StudentAccountSection = ({ data, onEdit }: StudentAccountSectionProps) => {
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
          label="Student ID"
          value={data.studentId}
          icon={Fingerprint}
          onEdit={onEdit}
        />
        <AccountField
          label="Department"
          value={data.department || "N/A"}
          icon={GraduationCap}
          onEdit={onEdit}
        />
        <AccountField
          label="Intake"
          value={data.intake || "N/A"}
          icon={LayoutPanelTop}
          onEdit={onEdit}
        />
        <AccountField
          label="Section"
          value={data.section || "N/A"}
          icon={Album}
          onEdit={onEdit}
        />
        <AccountField
          label="Class Section ID"
          value={data.classSectionId}
          icon={Building2}
          onEdit={onEdit}
        />
      </div>
    </section>
  );
};

export default StudentAccountSection;