// "use client"

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-auto h-[80px] flex justify-end items-center">
      <SignedOut>
        <div className="w-[200px] flex justify-evenly items-center">
          <div className="cursor-pointer">
            <SignInButton />
          </div>
          <div className="cursor-pointer">
            <SignUpButton />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-[100px] h-full flex justify-evenly items-center">
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
