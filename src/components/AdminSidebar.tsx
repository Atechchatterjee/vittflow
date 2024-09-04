import React from "react";
import Image from "next/image";
import {
  RiArrowDropRightLine,
  RiArrowLeftRightLine,
  RiBuilding2Fill,
  RiLayout4Fill,
  RiMenu3Fill,
} from "@remixicon/react";
import { Separator } from "./ui/separator";

export default function AdminSidebar() {
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
        <a href="#">
          <div className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-b from-primary to-[#5B5B5B] p-2 text-sm text-white shadow-sm">
            <RiLayout4Fill size={18} />
            <p>Dashboard</p>
            <RiArrowDropRightLine size={22} className="ml-auto" />
          </div>
        </a>
        <a href="#">
          <div className="flex w-full items-center gap-3 rounded-md p-2 text-sm">
            <RiBuilding2Fill size={18} />
            Project
          </div>
        </a>
        <a href="#">
          <div className="flex w-full items-center gap-3 rounded-md p-2 text-sm">
            <RiArrowLeftRightLine size={18} />
            Transactions
          </div>
        </a>
      </div>
    </div>
  );
}
