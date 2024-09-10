import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  RiArrowLeftDownLine,
  RiArrowLeftRightLine,
  RiArrowRightUpLine,
  RiArrowUpDownLine,
  RiFileList3Fill,
} from "@remixicon/react";
import React from "react";
import AdminSidebar from "~/components/AdminSidebar";
import { Separator } from "~/components/ui/separator";
import SendDialog from "./SendDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { parseDateTime } from "~/lib/utils";
import RecieveDialog from "./RecieveDialog";

export default async function ProjectPage({ params }: { params: any }) {
  const data = await fetch(
    `http://localhost:3000/api/project/get-project/${params.id}`,
    { cache: "no-store" },
  );
  const currentProject = await data.json();

  const transactionData = await fetch(
    `http://localhost:3000/api/transaction/fetch-project-transactions?projectid=${params.id}`,
    { cache: "no-store" },
  );
  const transactions = await transactionData.json();

  return (
    <main className="flex">
      <AdminSidebar activeLink="project" />
      <div className="h-[100vh] w-full pl-[2rem]">
        <div className="h-[100vh] w-full pl-[2rem] pr-[2rem]">
          <div className="flex flex-col pr-[1rem]">
            <div className="flex w-full items-start pt-5">
              <div className="flex flex-col gap-1">
                <h4>Project - {currentProject[0].name}</h4>
                <p className="text-sm">Manage your finances for this project</p>
              </div>
              <div className="ml-auto flex items-start">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <Separator className="mt-[1rem]" />
            <div className="mt-[1rem] flex items-center gap-3">
              <RiArrowUpDownLine size={18} />
              <p className="mt-[0.05rem] text-lg font-semibold">Cash Flow</p>
            </div>
            <div className="mt-5 flex w-full gap-4">
              <div className="flex h-[10rem] flex-1 flex-col rounded-lg border border-[#DCDCDC] bg-[#F8F8F8] px-4 py-4">
                <div className="flex">
                  <p className="text-md">Net Balance</p>
                  <RiArrowLeftRightLine className="ml-auto" size={18} />
                </div>
                <p className="mt-auto text-[2.5rem] font-semibold">
                  {parseInt(currentProject[0].balance) !== 0 &&
                  currentProject[0].balance !== null
                    ? "₹" + currentProject[0].balance
                    : "--- ---"}
                </p>
              </div>
              <div className="flex h-[10rem] flex-1 flex-col rounded-lg border border-[#E2E6C8] bg-[#FBFFE3] px-4 py-4">
                <div className="flex">
                  <p className="text-md flex gap-2">
                    Inflow <span className="text-gray-500">(You get)</span>
                  </p>
                  <RiArrowLeftDownLine className="ml-auto" size={20} />
                </div>
                <p className="mt-auto text-[2.5rem] font-semibold">
                  {parseInt(currentProject[0].inflow) !== 0
                    ? "₹" + currentProject[0].inflow
                    : "--- ---"}
                </p>
              </div>
              <div className="flex h-[10rem] flex-1 flex-col rounded-lg border border-[#EBD2D2] bg-[#FFE9E9] px-4 py-4">
                <div className="flex">
                  <p className="text-md flex gap-2">
                    Outflow <span className="text-gray-500">(You give)</span>
                  </p>
                  <RiArrowRightUpLine className="ml-auto" size={20} />
                </div>
                <p className="mt-auto text-[2.5rem] font-semibold">
                  {parseInt(currentProject[0].outflow) !== 0
                    ? "₹" + currentProject[0].outflow
                    : "--- ---"}
                </p>
              </div>
            </div>
            <div className="mt-[1rem] flex gap-2">
              <SendDialog projectId={params.id} />
              <RecieveDialog projectId={params.id} />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-0">
              <div className="mt-[2rem] flex items-center gap-2">
                <RiFileList3Fill size={18} />
                <p className="mt-[0.05rem] text-lg font-semibold">
                  Transactions
                </p>
              </div>
              <p className="text-sm text-gray-700">
                See all your project related transactions
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl No.</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Reciever</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Datetime</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{transaction.sender}</TableCell>
                    <TableCell>{transaction.reciever}</TableCell>
                    <TableCell>₹{transaction.amount}</TableCell>
                    <TableCell>
                      {parseDateTime(transaction.createdAt).join(" ")}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
