import React from "react";
import AdminSidebar from "~/components/AdminSidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <main className="flex">
      <AdminSidebar activeLink={"dashboard"} />
      <div className="mr-[1rem] flex h-[100vh] w-full">
        <div className="ml-[1rem] flex h-16 w-full items-center">
          <h4>
            <div className="flex gap-4">
              <span>Dashboard</span>
              <span className="font-medium text-gray-700">
                - {user?.publicMetadata.applicationName ?? ""}
              </span>
            </div>
          </h4>
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
