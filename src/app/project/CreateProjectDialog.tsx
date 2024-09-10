"use client";
import React, { useRef } from "react";
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
import { RiAddFill } from "@remixicon/react";
import { Textarea } from "~/components/ui/textarea";
import { handleProjectCreation } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

export default function CreateProjectDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const initialFormState: {
    error: string | null;
  } = {
    error: null,
  };
  const [state, formAction] = useFormState(
    handleProjectCreation,
    initialFormState,
  );
  const { pending } = useFormStatus();

  return (
    <Dialog>
      <DialogTrigger className="ml-auto" asChild>
        <Button className="gap-2">
          <RiAddFill size={20} />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          <DialogDescription>
            Fill this form to create a new project
          </DialogDescription>
          <div className="flex flex-col gap-5">
            <form
              ref={formRef}
              action={async (formData: FormData) => {
                formAction(formData);
                if (!state.error) {
                  formRef.current?.reset();
                } else {
                  alert("Something went wrong!!");
                }
              }}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col items-start gap-4 pt-[1rem]">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input placeholder="Name" name="projectName" required />
              </div>
              <div className="flex flex-col items-start gap-2 pt-[0.5rem]">
                <Label htmlFor="projectName" className="">
                  Project Description (optional)
                </Label>
                <Textarea
                  placeholder="Description"
                  name="projectDescription"
                  required
                />
              </div>
              <Button
                className="ml-auto mt-[1rem] w-[5rem]"
                type="submit"
                disabled={pending}
              >
                Create
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
