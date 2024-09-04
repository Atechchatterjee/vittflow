import Navbar from "~/components/Navbar";
import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpComponent() {
  return (
    <main>
      <Navbar />
      <div className="flex w-[100%] justify-center pt-[9rem]">
        <SignUp signInUrl="/sign-in" />
      </div>
    </main>
  );
}
