import React from "react";
import Image from "next/image";
import {
  RiArrowDropRightLine,
  RiLayout4Fill,
  RiMenu3Fill,
} from "@remixicon/react";
import { Separator } from "./ui/separator";
import { cn } from "~/lib/utils";

type activeLinkType = "dashboard" | "project" | "transactions";

const activeLinkStyle =
  "bg-gradient-to-b from-primary to-[#5B5B5B] text-white shadow-sm hover:opacity-95";

function SidebarLink({
  href,
  activeLink,
  propActiveLink,
  text,
}: {
  href: string;
  activeLink: activeLinkType;
  propActiveLink: activeLinkType;
  text: string;
}) {
  return (
    <a href={href}>
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-2 text-sm",
          activeLink === propActiveLink ? activeLinkStyle : "",
        )}
      >
        <RiLayout4Fill size={18} />
        <p>{text}</p>
        {activeLink === propActiveLink && (
          <RiArrowDropRightLine size={22} className="ml-auto" />
        )}
      </div>
    </a>
  );
}

export default function AdminSidebar({
  activeLink,
}: {
  activeLink: activeLinkType;
}) {
  return (
    <div className="h-[100vh] w-[20rem] border border-gray-200 bg-[#F6F6F6] px-5 py-5">
      <div className="flex items-center gap-4">
        <a href="/">
          <Image src="/logo-black.svg" width={105} height={100} alt="logo" />
        </a>
        <RiMenu3Fill size={20} className="ml-auto cursor-pointer" />
      </div>
      <Separator className="mb-7 mt-5 bg-[#dbdbdb]" />
      <div className="flex h-[87vh] flex-col gap-3 text-gray-700">
        <SidebarLink
          href="/dashboard"
          text="Dashboard"
          activeLink="dashboard"
          propActiveLink={activeLink}
        />
        <SidebarLink
          href="/project"
          text="Project"
          activeLink="project"
          propActiveLink={activeLink}
        />
        <SidebarLink
          href="/transactions"
          text="Transactions"
          activeLink="transactions"
          propActiveLink={activeLink}
        />
      </div>
    </div>
  );
}
