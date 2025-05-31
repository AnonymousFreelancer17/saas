"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { Input } from "../ui/input";
import HeaderLinks from "./HeaderLinks";
import { ModeToggle } from "../Theme/mode-toggle";
import HeaderAuthButtonGroup from "./headerAuthButtonGroup";
import type { UserResource } from "@clerk/types";
import { Button } from "../ui/button";
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";

type HeaderProps = {
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean;
  user: UserResource | null | undefined;
};

const Header: React.FC<HeaderProps> = ({
  setIsCollapsed,
  isCollapsed,
  user,
}) => {
  return (
    <div className="w-full h-[80px] flex justify-center items-center border-b top-0 left-0 fixed z-50">
      {(!isCollapsed || !user) && (
        <Link href={"/"} className="h-full w-[255px] flex justify-center items-center">
          Logo
        </Link>
      )}
      <div
        className={`flex-1 h-full flex ${
          user ? "justify-between" : "justify-end"
        } items-center mx-2`}
      >
        {user && (
          <SidebarTrigger
            className="w-[36px] h-[36px] border rounded-md flex justify-center items-center ms-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        <HeaderLinks user={user} />

        <div className="flex justify-center items-center">
          {user && (
            <Button className="mx-2 w-[36px] h-[36px] relative cursor-pointer" variant={"outline"}>
              <div className="w-[12px] h-[12px] text-white bg-red-500 rounded-full absolute z-10 right-[8px] top-[5px] animate-pulse">
              </div>
              <div className="w-[10px] h-[10px] text-white bg-red-500 rounded-full absolute z-20 right-[8px] top-[5px]">
                {/* <p className="text-xs">4</p> */}
              </div>
              <FaBell />
            </Button>
          )}

          <ModeToggle />

          <Button variant={"outline"} className="ms-2 me-8 w-[36px] h-[36px] cursor-pointer">
            <FaMagnifyingGlass size={8} />
          </Button>
        </div>
      </div>
      <HeaderAuthButtonGroup />
    </div>
  );
};

export default Header;
