import React from "react";
import AdminSidebar from "~/components/AdminSidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Separator } from "~/components/ui/separator";
import CreateProjectDialog from "./CreateProjectDialog";
import { RiDownloadLine, RiExternalLinkLine } from "@remixicon/react";
import { Button } from "~/components/ui/button";

export default async function Project() {
  const data = await fetch(
    "http://localhost:3000/api/project/get-all-projects",
    {
      cache: "no-store",
    },
  );
  const projects = await data.json();

  return (
    <main className="flex">
      <AdminSidebar activeLink="project" />
      <div className="h-[100vh] w-full pl-[2rem]">
        <div className="flex flex-col pr-[1rem]">
          <div className="flex w-full items-start pt-5">
            <div className="flex flex-col gap-1">
              <h4>Project</h4>
              <p className="text-sm">Create and Manage all your products</p>
            </div>
            <div className="ml-auto flex items-start">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
          <Separator className="mt-[1rem]" />
          <div className="flex items-center py-5">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">Create a new Project</p>
              <p className="text-sm">
                Click the button on the right to create a new project
              </p>
            </div>
            <CreateProjectDialog />
          </div>
          <div className="flex flex-col gap-4">
            {projects.map((p: any, i: number) => (
              <div
                className="flex flex-col gap-1 rounded-md border border-gray-200 px-4 py-3"
                key={i}
              >
                <div className="flex items-center gap-2">
                  <a
                    href={`/project/${p.id}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    <p className="text-lg font-semibold">{p.name}</p>
                  </a>
                  <RiExternalLinkLine size={17} className="mt-[-0.32rem]" />
                </div>
                <p className="">{p.description}</p>
                <div className="mt-[1rem] flex gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-[#DCDCDC] bg-[#F8F8F8] px-5 py-1 text-sm">
                    Net Balance:
                    <span className="text-lg font-bold">
                      {!!p.balance ? "₹" + p.balance : "-----"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#E2E6C8] bg-[#FBFFE2] px-5 py-1 text-sm">
                    Inflow:
                    <span className="text-lg font-bold">
                      {"₹" + p.inflow ?? "-----"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#EBD2D2] bg-[#FFE9E9] px-5 py-1 text-sm">
                    Outflow:
                    <span className="text-lg font-bold">
                      {"₹" + p.outflow ?? "-----"}
                    </span>
                  </div>
                  <Button variant="outline" className="ml-auto gap-2">
                    Export
                    <RiDownloadLine size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
