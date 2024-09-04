import React from "react";
import AdminSidebar from "~/components/AdminSidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <main className="flex">
      <AdminSidebar />
      <div className="mr-[1rem] flex h-[100vh] w-full">
        <div className="ml-[1rem] flex h-16 w-full items-center">
          <h4>Dashboard</h4>
          <div className="ml-auto flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </main>
  );
}
