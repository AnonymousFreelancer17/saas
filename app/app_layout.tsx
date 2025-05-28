"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider
      className="w-screen h-screen flex justify-center items-center"
      style={
        {
          "--sidebarWidth": isCollapsed ? "0px" : "250px",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div
        className="h-screen flex flex-col justify-center items-center transition-all duration-300"
        style={{
          width: "calc(100% - var(--sidebarWidth))",
        }}
      >
        <div className="w-full flex justify-center items-center border-b">
          {isCollapsed && (
            <div className="border-r h-full w-[255px] flex justify-center items-center">
              Logo
            </div>
          )}{" "}
          <div className="flex-1 h-full  flex justify-end items-center">
            <SidebarTrigger className="w-[60px] flex justify-center items-center" onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          <Header />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
