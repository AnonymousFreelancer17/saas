"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import React from "react";

const ProtectedClient = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedClient;
