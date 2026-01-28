"use client";

import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthRequiredProps {
  title?: string;
  description?: string;
  buttonText?: string;
  redirectPath?: string;
}

export const AuthRequired = ({
  title = "Authentication Required",
  description = "Please sign in to access this page.",
  buttonText = "Sign In",
  redirectPath = "/sign-in",
}: AuthRequiredProps) => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-100 p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
      <div className="p-3 mb-4 bg-red-100 rounded-full text-red-600">
        <ShieldAlert size={32} />
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-500 text-sm max-w-62.5 mb-6">
        {description}
      </p>

      <div className="flex flex-col w-full max-w-50 gap-2">
        <button
          onClick={() => router.push(redirectPath)}
          className="w-full py-2.5 px-4  bg-[#399aef] text-white text-sm font-medium rounded-lg hover:bg-[#3289d6] transition-colors shadow-sm"
        >
          {buttonText}
        </button>
        
        <button
          onClick={() => router.push("/")}
          className="text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};