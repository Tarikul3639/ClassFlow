"use client";

import React from "react";
import { Users } from "lucide-react";

type PageHeaderProps = {
  hasManagementAccess: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({ hasManagementAccess }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#111518] flex items-center gap-3">
            <div className="p-3 sm:p-4 rounded-xl bg-linear-to-br from-[#399aef] to-purple-500 flex items-center justify-center text-white">
              <Users size={18} />
            </div>
            Class Members
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {hasManagementAccess
              ? "Manage members, roles, and permissions"
              : "View all class members"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
