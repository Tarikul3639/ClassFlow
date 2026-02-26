"use client";

import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";

const NavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className="relative px-5 py-2 text-xsm transition-colors duration-300 no-underline outline-none"
  >
    <span
      className={`relative z-10 font-semibold ${active ? "text-primary" : "text-slate-500 hover:text-slate-900"}`}
    >
      {label}
    </span>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-white rounded-full shadow-sm"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </Link>
);

export default NavItem;