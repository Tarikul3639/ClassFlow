"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import PageHeader from "./_components/PageHeader";
import StatsCards from "./_components/StatsCards";
import JoinCodeCard from "./_components/JoinCodeCard";
import MembersSection from "./_components/MembersSection";

type MemberRole = "admin" | "co_admin" | "member";

type DemoMember = {
  user: {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  role: MemberRole;
  isBlocked: boolean;
};

export default function PeoplePage() {
  const [currentUserRole, setCurrentUserRole] = useState<MemberRole>("member");

  const [members, setMembers] = useState<DemoMember[]>([
    {
      user: {
        _id: "u_1",
        name: "Tarikul Islam",
        email: "tarikul@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
      },
      role: "admin",
      isBlocked: false,
    },
    {
      user: {
        _id: "u_2",
        name: "Ayesha Rahman",
        email: "ayesha.rahman@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=47",
      },
      role: "co_admin",
      isBlocked: false,
    },
    {
      user: {
        _id: "u_3",
        name: "Mahfuz Hasan",
        email: "mahfuz.hasan@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=22",
      },
      role: "member",
      isBlocked: false,
    },
    {
      user: {
        _id: "u_4",
        name: "Nusrat Jahan",
        email: "nusrat.jahan@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=5",
      },
      role: "member",
      isBlocked: true,
    },
    {
      user: {
        _id: "u_5",
        name: "Sabbir Ahmed",
        email: "sabbir.ahmed@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=31",
      },
      role: "member",
      isBlocked: false,
    },
    {
      user: {
        _id: "u_6",
        name: "Fatima Khan",
        email: "fatima.khan@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=45",
      },
      role: "member",
      isBlocked: false,
    },
    {
      user: {
        _id: "u_7",
        name: "Rafiq Uddin",
        email: "rafiq.uddin@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
      },
      role: "member",
      isBlocked: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | MemberRole>("all");

  const classInfo = {
    joinCode: "A9X7Q2",
    totalMembers: members.length,
    totalAdmins: members.filter(
      (m) => m.role === "admin" || m.role === "co_admin",
    ).length,
    totalBlockedMembers: members.filter((m) => m.isBlocked).length,
  };

  const isAdmin = currentUserRole === "admin";
  const isCoAdmin = currentUserRole === "co_admin";
  const hasManagementAccess = isAdmin || isCoAdmin;

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRole === "all" || member.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  // Actions
  const onAssignCoAdmin = (userId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.user._id === userId && m.role === "member"
          ? { ...m, role: "co_admin" }
          : m,
      ),
    );
    toast.success("Co-Admin assigned (demo).");
  };

  const onBlockUser = (userId: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.user._id === userId ? { ...m, isBlocked: true } : m)),
    );
    toast.success("User blocked (demo).");
  };

  const onUnblockUser = (userId: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.user._id === userId ? { ...m, isBlocked: false } : m)),
    );
    toast.success("User unblocked (demo).");
  };

  const onRemoveCoAdmin = (userId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.user._id === userId && m.role === "co_admin"
          ? { ...m, role: "member" }
          : m,
      ),
    );
    toast.success("Co-Admin removed (demo).");
  };

  const onRemoveMember = (userId: string) => {
    setMembers((prev) => prev.filter((m) => m.user._id !== userId));
    toast.success("Member removed (demo).");
  };

  return (
    <main className="min-h-screen bg-[#f7fafc]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <PageHeader hasManagementAccess={hasManagementAccess} />

        <StatsCards
          totalMembers={classInfo.totalMembers}
          totalAdmins={classInfo.totalAdmins}
          totalBlockedMembers={classInfo.totalBlockedMembers}
          hasManagementAccess={hasManagementAccess}
        />

        {hasManagementAccess && <JoinCodeCard joinCode={classInfo.joinCode} />}

        <MembersSection
          members={filteredMembers}
          searchQuery={searchQuery}
          filterRole={filterRole}
          currentUserRole={currentUserRole}
          hasManagementAccess={hasManagementAccess}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterRole}
          onAssignCoAdmin={onAssignCoAdmin}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onRemoveCoAdmin={onRemoveCoAdmin}
          onRemoveMember={onRemoveMember}
        />
      </div>
    </main>
  );
}
