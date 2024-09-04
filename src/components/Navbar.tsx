"use client";
import { darker_grotesque } from "~/font";
import { cn } from "~/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex w-[100%] px-[2rem] py-[1rem]">
      <a
        className={cn(
          darker_grotesque.className,
          "text-[1.4rem] font-semibold",
        )}
        href="/"
      >
        <Image
          src="/logo-black.jpg"
          width={110}
          height={100}
          alt="logo"
          className="max-h-[2rem]"
        />
      </a>
      <div className="ml-auto flex items-center gap-10">
        <a
          href="/"
          className={cn(
            "text-[0.95rem]",
            window.location.pathname === "/" ? "font-bold" : "",
          )}
        >
          Home
        </a>
        <a
          href="/"
          className={cn(
            "text-[0.95rem]",
            window.location.pathname === "/features" ? "font-bold" : "",
          )}
        >
          Features
        </a>
        <a
          href="/dashboard"
          className={cn(
            "text-[0.95rem]",
            window.location.pathname === "/dashboard" ? "font-bold" : "",
          )}
        >
          Dashboard
        </a>
        <a
          href="/"
          className={cn(
            "text-[0.95rem]",
            window.location.pathname === "/project" ? "font-bold" : "",
          )}
        >
          Project
        </a>
        <a
          href="/"
          className={cn(
            "text-[0.95rem]",
            window.location.pathname === "/github" ? "font-bold" : "",
          )}
        >
          Github
        </a>
      </div>
      <div className="ml-auto mr-[2rem] flex items-center gap-8">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <a href="/sign-up" className="text-[0.95rem]">
            Sign Up
          </a>
          <a href="/sign-in">
            <Button>Sign In</Button>
          </a>
        </SignedOut>
      </div>
    </nav>
  );
}
