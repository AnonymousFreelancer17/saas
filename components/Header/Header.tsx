"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { Input } from "../ui/input";
import HeaderLinks from "./HeaderLinks";
import { ModeToggle } from "../Theme/mode-toggle";
import HeaderAuthButtonGroup from "./headerAuthButtonGroup";
import type { UserResource } from "@clerk/types";

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
          <div className="flex-1 h-full flex justify-between items-center px-2 mx-2 ">
            <div className="w-1/2 h-[40px] rounded-md flex justify-start items-center ">
              {/* // <FaMagnifyingGlass />
                // <Input 
                //   value={""}
                //   onChange={() => {}}
                //   className="flex-1 border-0 outline-0 focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 shadow-none"
                //   placeholder="Search your projects here"
                // /> */}
            </div>
            {/*  header links */}
            <HeaderLinks />
          </div>
        </div>

        <ModeToggle />
      </div>
      <HeaderAuthButtonGroup />
    </div>
  );
};

export default Header;
