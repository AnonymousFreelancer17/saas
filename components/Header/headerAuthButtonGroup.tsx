// "use client"

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const HeaderAuthButtonGroup = () => {
  return (
    <div className="w-auto h-full flex justify-end items-center border-l">
      <SignedOut>
        <div className="w-[200px] flex justify-evenly items-center">
         
            <SignInButton />
          
            <SignUpButton />
          
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-[80px] flex justify-center items-center">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default HeaderAuthButtonGroup;
