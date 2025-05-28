"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import ProtectedClient from "@/components/protected-client";
import { ModeToggle } from "@/components/mode-toggle";
 

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
          "--sidebarWidth": (isCollapsed) ? "0px" : "250px",
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
        <div className="w-full flex justify-center items-center border-b">
          {(isCollapsed || !user) && (
            <div className="border-r h-full w-[255px] flex justify-center items-center">
              Logo
            </div>
          )}{" "}
          <div className="flex-1 h-full  flex justify-end items-center">
            {user && <SidebarTrigger
              className="w-[60px] flex justify-center items-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            />}

            <ModeToggle />
          </div>
          <Header />
        </div>
        <ProtectedClient>
           {children}
        </ProtectedClient>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
