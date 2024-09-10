"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { organisation } from "~/server/db/schema";

async function clerkUpdateUserForOnboarding(
  userId: string,
  formData: FormData,
) {
  return await clerkClient().users.updateUser(userId, {
    publicMetadata: {
      onboardingComplete: true,
      applicationName: formData.get("applicationName"),
      applicationType: formData.get("applicationType"),
    },
  });
}

async function createNewOrganisation(formData: FormData) {
  const name = formData.get("applicationName");
  if (typeof name === "string") {
    return db.insert(organisation).values({ name: name });
  } else {
    return new Promise((_, reject) =>
      reject(new Error("Invalid application name as organisation")),
    );
  }
}

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    await Promise.all([clerkUpdateUserForOnboarding, createNewOrganisation]);
    return { message: "User metadata Updated" };
  } catch (e) {
    console.log("error", e);
    return { message: "Error Updating User Metadata" };
  }
};
