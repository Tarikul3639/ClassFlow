"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type JoinCodeCardProps = {
  joinCode: string;
};

const JoinCodeCard: React.FC<JoinCodeCardProps> = ({ joinCode }) => {
  const [copiedJoinCode, setCopiedJoinCode] = useState(false);

  const copyJoinCode = () => {
    navigator.clipboard.writeText(joinCode);
    setCopiedJoinCode(true);
    toast.success("Join code copied to clipboard!");
    setTimeout(() => setCopiedJoinCode(false), 2000);
  };

  return (
    <div className="p-4 bg-linear-to-r from-[#399aef]/5 to-purple-500/5 rounded-xl border border-[#399aef]/20 mb-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xxxs font-black text-gray-500 uppercase tracking-wider mb-1">
            Class Join Code
          </p>
          <p className="text-lg font-black text-[#399aef] tracking-[0.3em]">
            {joinCode}
          </p>
        </div>
        <button
          onClick={copyJoinCode}
          className="p-3 bg-white hover:bg-[#399aef]/10 rounded-xl border border-[#399aef]/20 transition-all"
        >
          {copiedJoinCode ? (
            <Check size={18} className="text-green-600" />
          ) : (
            <Copy size={18} className="text-[#399aef]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JoinCodeCard;