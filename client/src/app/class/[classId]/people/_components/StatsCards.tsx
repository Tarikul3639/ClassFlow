"use client";

import React from "react";

type StatsCardsProps = {
  totalMembers: number;
  totalAdmins: number;
  totalBlockedMembers: number;
  hasManagementAccess: boolean;
};

const StatsCards: React.FC<StatsCardsProps> = ({
  totalMembers,
  totalAdmins,
  totalBlockedMembers,
  hasManagementAccess,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-xxxxs font-black text-blue-600 uppercase tracking-wider">
          Total Members
        </p>
        <p className="text-xl font-black text-blue-700 mt-1">{totalMembers}</p>
      </div>
      <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
        <p className="text-xxxxs font-black text-purple-600 uppercase tracking-wider">
          Admins
        </p>
        <p className="text-xl font-black text-purple-700 mt-1">{totalAdmins}</p>
      </div>
      {hasManagementAccess && (
        <div className="p-3 bg-red-50 rounded-xl border border-red-100">
          <p className="text-xxxxs font-black text-red-600 uppercase tracking-wider">
            Blocked
          </p>
          <p className="text-xl font-black text-red-700 mt-1">
            {totalBlockedMembers}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsCards;