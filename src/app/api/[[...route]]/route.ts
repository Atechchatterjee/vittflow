import { Hono } from "hono";
import { handle } from "hono/vercel";
import projectRoute from "~/server/routes/project-route";
import transactionRoute from "~/server/routes/transaction-route";

const app = new Hono().basePath("/api");

app.route("/project", projectRoute);
app.route("/transaction", transactionRoute);

app.get("/", async (c) => {
  return c.json({ msg: "Hono is running!!" });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
