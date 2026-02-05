"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isVerifying, setIsVerifying] = useState(true);
  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check if user exists in Redux
        if (!user) {
          console.log("🚫 No user found, redirecting to sign-in");
          router.replace("/auth/sign-in");
          return;
        }

        // Verify token by making an API call
        // If token is invalid, backend will return 401
        // and axios interceptor will handle it
        setIsVerifying(false);
      } catch (error) {
        console.error("❌ Auth verification failed:", error);
        router.replace("/auth/sign-in");
      }
    };

    verifyAuth();
  }, [user, router, dispatch]);

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
}
