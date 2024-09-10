import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { validator } from "hono/validator";
import { z } from "zod";
import { safeAwait } from "~/lib/utils";
import { db } from "../db";
import { project } from "../db/schema";
import { createSelectSchema } from "drizzle-zod";

const projectRoute = new Hono();

const cashflowSchema = z.object({
  inflow: z.string().optional(),
  outflow: z.string().optional(),
  projectId: z.string(),
});

const projectInsertionSchema = createSelectSchema(project, {
  id: z.number().optional(),
});

projectRoute.get("/get-all-projects", async (c) => {
  const projects = await db.select().from(project);
  console.log(projects);
  return c.json(projects);
});

projectRoute.get("/get-project/:id", async (c) => {
  const { id } = c.req.param();
  const currentProject = await db
    .select()
    .from(project)
    .where(eq(project.id, parseInt(id)));
  return c.json(currentProject);
});

// updates inflow/outflow and consequently updates the (net) balance of the current project
export async function updateProjectCashflow({
  inflow,
  outflow,
  projectId,
}: z.infer<typeof cashflowSchema>) {
  if (!projectId) {
    console.log(`Invalid project id = ${projectId}!`);
    return Promise.reject(new Error("Invalid projectId"));
  }
  const [err] = await safeAwait(
    db.transaction(async (tx) => {
      if (inflow) {
        await tx
          .update(project)
          .set({
            inflow: sql`CAST(${project.inflow} AS DECIMAL(10,2)) + CAST(${inflow} AS DECIMAL(10,2))`,
          })
          .where(eq(project.id, parseInt(projectId)));
      }
      if (outflow) {
        await tx
          .update(project)
          .set({
            outflow: sql`CAST(${project.outflow} AS DECIMAL(10,2)) + CAST(${outflow} AS DECIMAL(10,2))`,
          })
          .where(eq(project.id, parseInt(projectId)));
      }
      await tx
        .update(project)
        .set({
          balance: sql`CAST(${project.inflow} AS DECIMAL(10,2)) - CAST(${project.outflow} AS DECIMAL(10,2))`,
        })
        .where(eq(project.id, parseInt(projectId)));
    }),
  );
  if (err) return Promise.reject(new Error("Couldnot update inflow data!"));
  console.log("inflow and balance updated");
  return Promise.resolve("successfully updated project cashflow");
}

projectRoute.post(
  "/update-project-cashflow",
  validator("json", (value, c) => {
    const parsedCashflowSchema = cashflowSchema.safeParse(value);
    if (!parsedCashflowSchema.success)
      return c.text("Schema validation Err: Invalid cashflowSchema", 400);
    return parsedCashflowSchema.data;
  }),
  async (c) => {
    const { inflow, outflow, projectId } = c.req.valid("json");
    const [err, res] = await safeAwait(
      updateProjectCashflow({ inflow, outflow, projectId }),
    );
    if (err) return c.text(err.message, 400);
    return c.text(res, 200);
  },
);

export default projectRoute;
