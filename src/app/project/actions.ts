"use server";
import { db } from "~/server/db";
import { project } from "~/server/db/schema";

export async function handleProjectCreation(_: any, formData: FormData) {
  const [projectName, projectDescription] = [
    formData.get("projectName"),
    formData.get("projectDescription"),
  ];

  if (
    typeof projectName !== "string" ||
    typeof projectDescription !== "string"
  ) {
    console.error(`Invalid project name: type: ${typeof projectName}`);
    return { error: `Invalid project name: type: ${typeof projectName}` };
  }

  try {
    await db
      .insert(project)
      .values({
        name: projectName,
        description: projectDescription,
        outflow: "0",
        inflow: "0",
      })
      .then(() => {
        console.log("created a new project");
      });
    return { error: null };
  } catch (err) {
    return { error: err };
  }
}
