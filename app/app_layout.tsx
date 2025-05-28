"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import ProtectedClient from "@/components/protected-client";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
        <div className="w-full flex justify-center items-center border-b">
          {(isCollapsed || !user) && (
            <div className="h-full w-[255px] flex justify-center items-center">
              Logo
            </div>
          )}
          <div className="flex-1 h-full  flex justify-between items-center">
            <div className="h-full flex flex-1 justify-start items-center">
              {user && (
                <SidebarTrigger
                  className="w-[36px] h-[36px] border rounded-md flex justify-center items-center ms-2"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                />
              )}
             <div className="w-1/2 h-[40px] border rounded-md flex justify-start items-center px-2 mx-2">
               <FaMagnifyingGlass />
               <Input
                value={""}
                onChange={() => {}}
                className="flex-1 border-0 outline-0 focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 shadow-none"
                placeholder="Search your projects here"
              />
             </div>
            </div>

            <ModeToggle />
          </div>
          <Header />
        </div>
        <ProtectedClient>{children}</ProtectedClient>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
