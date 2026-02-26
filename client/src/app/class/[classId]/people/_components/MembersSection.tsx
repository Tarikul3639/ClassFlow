"use client";

import React from "react";
import { Search, Filter, Users, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MemberCard from "./MemberCard";

type MemberRole = "admin" | "co_admin" | "member";

type Member = {
  user: {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  role: MemberRole;
  isBlocked: boolean;
};

type MembersSectionProps = {
  members: Member[];
  searchQuery: string;
  filterRole: "all" | MemberRole;
  currentUserRole: MemberRole;
  hasManagementAccess: boolean;
  onSearchChange: (query: string) => void;
  onFilterChange: (role: "all" | MemberRole) => void;
  onAssignCoAdmin: (userId: string) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onRemoveCoAdmin: (userId: string) => void;
  onRemoveMember: (userId: string) => void;
};

const MembersSection: React.FC<MembersSectionProps> = ({
  members,
  searchQuery,
  filterRole,
  currentUserRole,
  hasManagementAccess,
  onSearchChange,
  onFilterChange,
  onAssignCoAdmin,
  onBlockUser,
  onUnblockUser,
  onRemoveCoAdmin,
  onRemoveMember,
}) => {
  const isAdmin = currentUserRole === "admin";

  return (
    <div className="bg-gray-50 backdrop-blur-2xl rounded-2xl shadow-sm shadow-blue-100 border border-blue-100 overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-4 px-6 border-b pt-8 border-[#dbe1e6] bg-gray-50/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 relative group">
            {/* Animated Glow Background - Only visible on focus */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#399aef] to-[#0056b3] rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition duration-500"></div>

            <div className="relative flex items-center">
              {/* Left Icon with focus-color change */}
              <Search
                size={18}
                className="absolute left-4 text-slate-400 group-focus-within:text-[#399aef] transition-colors duration-300"
              />

              <input
                type="text"
                placeholder="Search members by name or email..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 placeholder:text-slate-400 placeholder:font-medium shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] focus:outline-none focus:border-[#399aef] focus:ring-4 focus:ring-[#399aef]/5 transition-all duration-300"
              />

              {/* Clear Button - Only shows when there's text */}
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-4 p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-3 py-2.5 bg-white border border-[#dbe1e6] rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-44 p-1.5 bg-gray-50 border-slate-200 rounded-2xl shadow-xs animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="px-2 py-1.5 mb-1">
                <span className="text-xxs font-black text-slate-400 uppercase tracking-widest">
                  Select Role
                </span>
              </div>

              {[
                { id: "all", label: "All Roles", color: "bg-slate-400" },
                { id: "admin", label: "Admin", color: "bg-rose-500" },
                { id: "co_admin", label: "Co-Admin", color: "bg-amber-500" },
                { id: "member", label: "Members", color: "bg-[#399aef]" },
              ].map((item, index) => (
                <React.Fragment key={item.id}>
                  <DropdownMenuItem
                    onClick={() =>
                      onFilterChange(item.id as "all" | MemberRole)
                    }
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 cursor-pointer 
                   transition-all duration-200 focus:bg-[#399aef]/10 focus:text-[#399aef] group"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${item.color} group-hover:scale-125 transition-transform`}
                    />
                    {item.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between py-2 px-1">
          {/* Left Side: Count with Badge Style */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-blue-50 text-blue-600 px-2 py-2 rounded-md border border-blue-100 shadow-xs">
              <span className="text-xs font-black leading-none">
                {members.length}
              </span>
            </div>
            <p className="text-xxs font-black text-slate-400 uppercase tracking-[0.15em]">
              {members.length === 1 ? "Member" : "Members"} Found
            </p>
          </div>

          {/* Right Side: Clear Filter Button with Icon */}
          {filterRole !== "all" && (
            <button
              onClick={() => onFilterChange("all")}
              className="group flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all duration-300 shadow-xs border border-red-50"
            >
              <span className="text-xxs font-black uppercase tracking-wider">
                Clear Filter
              </span>
              <X size={14} strokeWidth={3.5} />
            </button>
          )}
        </div>
      </div>

      {/* Members List */}
      <div className="p-6">
        {members.length > 0 ? (
          <div className="space-y-2">
            {members.map((member) => (
              <MemberCard
                key={member.user._id}
                member={member}
                hasManagementAccess={hasManagementAccess}
                isAdmin={isAdmin}
                onAssignCoAdmin={onAssignCoAdmin}
                onBlockUser={onBlockUser}
                onUnblockUser={onUnblockUser}
                onRemoveCoAdmin={onRemoveCoAdmin}
                onRemoveMember={onRemoveMember}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Users size={24} className="text-gray-400" />
            </div>
            <p className="text-sm font-bold text-gray-400">
              {searchQuery || filterRole !== "all"
                ? "No members found"
                : "No members yet"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery || filterRole !== "all"
                ? "Try adjusting your search or filter"
                : "Share the join code to invite students"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersSection;
