// "use client"

import React from "react";
import {
  ClerkProvider,
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
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
