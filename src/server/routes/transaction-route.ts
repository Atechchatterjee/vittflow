import { Hono } from "hono";
import { validator } from "hono/validator";
import { db } from "../db";
import { transactions } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { safeAwait } from "~/lib/utils";
import { updateProjectCashflow } from "./project-route";

const transactionRoute = new Hono();

const transactionSchema = z.object({
  sender: z.string(),
  reciever: z.string(),
  amount: z.string(),
  description: z.string().optional(),
  projectId: z.string(),
  type: z.enum(["inflow", "outflow"]),
});

transactionRoute.get("/fetch-project-transactions", async (c) => {
  const projectId = c.req.query("projectid");
  if (!projectId) return c.text("Invalid project Id", 400);
  const [err, res] = await safeAwait(
    db
      .select()
      .from(transactions)
      .where(eq(transactions.projectId, parseInt(projectId))),
  );
  if (!err) {
    console.log(res);
    return c.json(res);
  }
  return c.text("Failed to fetch transaction", 400);
});

transactionRoute.post(
  "/create-transaction",
  validator("json", (value, c) => {
    const parsedTransaction = transactionSchema.safeParse(value);
    if (!parsedTransaction.success) {
      console.error(parsedTransaction.error);
      return c.text("Invalid transaction!", 401);
    }
    return parsedTransaction.data;
  }),
  async (c) => {
    const { sender, reciever, amount, description, projectId, type } =
      c.req.valid("json");
    const [err] = await safeAwait(
      db.insert(transactions).values({
        sender,
        reciever,
        amount: amount ?? "0",
        type,
        description: description ?? "",
        projectId: parseInt(projectId),
      }),
    );
    if (err) {
      return c.text(err.message, 400);
    }

    if (type === "inflow") {
      console.log("updating cashflow for inflow");
      const [err] = await safeAwait(
        updateProjectCashflow({
          inflow: amount,
          projectId,
        }),
      );
      if (err) {
        console.error(err);
        return c.text(err.message, 400);
      }
      return c.text("inflow updated", 200);
    } else if (type === "outflow") {
      console.log("updating cashflow for outflow");
      const [err] = await safeAwait(
        updateProjectCashflow({
          outflow: amount,
          projectId,
        }),
      );
      if (err) {
        console.error(err);
        return c.text(err.message, 400);
      }
      return c.text("outflow updated", 200);
    } else {
      console.log("neither inflow nor outflow");
      return c.text("neither inflow nor outflow", 200);
    }
  },
);

export default transactionRoute;
