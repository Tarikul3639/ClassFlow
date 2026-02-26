"use client";

import React from "react";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ user, isActive }: { user: any; isActive: boolean }) => (
  <Link
    href="/class/profile"
    className={`hidden group/avatar relative w-8 h-8 rounded-full md:flex items-center justify-center transition-all duration-500 
      ${isActive ? "scale-110 ring-2 ring-[#399aef] ring-offset-2" : "hover:scale-105"}`}
  >
    <AnimatePresence>
      {isActive && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute inset-0 rounded-full blur-xl bg-linear-to-tr from-[#399aef] via-cyan-400 to-blue-500 animate-[spin_3s_linear_infinite]"
        />
      )}
    </AnimatePresence>

    <Avatar className="relative w-full h-full border-2 border-white/80 bg-slate-50 overflow-hidden shadow-inner">
      <AvatarImage
        src={user?.avatarUrl}
        alt={user?.name}
        className="object-cover group-hover/avatar:scale-110 transition-transform duration-500"
      />
      <AvatarFallback className="bg-linear-to-br from-[#399aef] to-[#2b8ad8] text-white font-black text-xsm!">
        {user?.name?.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>

    {isActive && (
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-linear-to-br from-[#399aef] to-cyan-500 border-2 border-white rounded-full animate-pulse" />
    )}
  </Link>
);

export default UserAvatar;