import Navbar from "~/components/Navbar";
import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInComponent() {
  return (
    <main>
      <Navbar />
      <div className="flex w-[100%] justify-center pt-[9rem]">
        <SignIn signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}
