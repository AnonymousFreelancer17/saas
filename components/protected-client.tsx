"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import React from "react";
import { FaSpinner } from "react-icons/fa6";

const ProtectedClient = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <div className="min-h-screen w-full flex flex-col justify-center items-center relative">
    <FaSpinner className="animate-spin mb-4" />
    <p className="text-2xl">
      Loading...
    </p>
  </div>;

  return <>{children}</>;
};

export default ProtectedClient;
