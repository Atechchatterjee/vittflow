"use client";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RiArrowLeftDownLine } from "@remixicon/react";
import { Textarea } from "~/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "~/components/LoadingSpinner";

type Inputs = {
  sender: string;
  reciever: string;
  amount: string;
  description: string;
};

export default function RecieveDialog({ projectId }: { projectId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();

  const [transactionCreated, setTransactionCreated] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: {
    [_: string]: string;
  }) => {
    const modifiedData = {
      ...data,
      reciever: user?.fullName ?? "",
      projectId,
      type: "inflow",
    };
    console.log(modifiedData);
    try {
      await fetch("http://localhost:3000/api/transaction/create-transaction", {
        method: "POST",
        body: JSON.stringify(modifiedData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      formRef.current?.reset();
      setTransactionCreated(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        // the project/[id] page reloads once the modal is closed and if transactions are created
        if (!open && transactionCreated) {
          router.refresh();
        }
      }}
    >
      <DialogTrigger className="" asChild>
        <Button className="gap-2 rounded-full px-[2rem]" variant="outline">
          Recieve
          <RiArrowLeftDownLine size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receive</DialogTitle>
          <DialogDescription>
            Fill this form to create a new receive-transaction
          </DialogDescription>
          <div className="flex flex-col gap-5">
            <form
              ref={formRef}
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start gap-4 pt-[1rem]">
                <Label htmlFor="sender">Sender *</Label>
                <Input
                  placeholder="Sener Name"
                  required
                  {...register("sender")}
                />
              </div>
              <div className="flex flex-col items-start gap-4 pt-[1rem]">
                <Label htmlFor="reciever">Reciever *</Label>
                <Input
                  placeholder="Receiver Name"
                  value={user?.fullName ?? ""}
                  defaultValue={user?.fullName ?? ""}
                  disabled
                  {...register("reciever")}
                />
              </div>

              <div className="flex flex-col items-start gap-4 pt-[1rem]">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  placeholder="Amount"
                  {...register("amount")}
                  required
                  type="number"
                />
              </div>

              <div className="flex flex-col items-start gap-2 pt-[0.5rem]">
                <Label htmlFor="projectName" className="">
                  Payment Description (optional)
                </Label>
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
              </div>
              <Button className="ml-auto mt-[1rem] w-[5rem]" type="submit">
                {isLoading ? <LoadingSpinner size={20} /> : "Create"}
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
