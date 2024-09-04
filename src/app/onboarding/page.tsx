"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Button } from "~/components/ui/button";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await completeOnboarding(formData);
    await user?.reload();
    router.push("/dashboard");
  };
  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900">Welcome!</h3>
        </div>
        <form action={handleSubmit}>
          <div className="space-y-4 px-8 pb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                {" "}
                Organisation Name{" "}
              </label>
              <p className="text-xs text-gray-500">
                Enter the name of your organisation
              </p>
              <input
                type="text"
                name="applicationName"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
