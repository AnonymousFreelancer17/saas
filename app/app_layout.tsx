"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import ProtectedClient from "@/components/protected-client";
import Header from "@/components/Header/Header";
 

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUser();

  return (
    <SidebarProvider
      open={!isCollapsed}
      onOpenChange={() => {
        setIsCollapsed(!isCollapsed);
      }}
      className="w-screen h-screen flex justify-center items-center"
      style={
        {
          "--sidebarWidth": isCollapsed ? "0px" : "250px",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      {user && <AppSidebar />}

      {/* Main Content */}
      <div
        className="h-screen flex flex-col justify-center items-center transition-all duration-300"
        style={{
          width: user ? "calc(100% - var(--sidebarWidth))" : "100%",
        }}
      >
        {/* Header */}
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} user={user}  />
        <ProtectedClient>{children}</ProtectedClient>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
