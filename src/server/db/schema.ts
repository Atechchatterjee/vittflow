// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  datetime,
  mysqlTableCreator,
  text,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => name);

export const transactions = createTable("transactions", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  sender: text("sender"),
  reciever: text("reciever"),
  description: text("description"),
  amount: text("amount").notNull(),
  type: mysqlEnum("type", ["inflow", "outflow"]),
  createdAt: timestamp("createdAt").defaultNow(),
  projectId: bigint("projectId", { mode: "number" }).references(
    () => project.id,
  ),
});

export const project = createTable("project", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name"),
  description: text("description"),
  outflow: text("outflow").notNull(),
  inflow: text("inflow").notNull(),
  balance: text("balance"),
  organisationId: bigint("organisationId", { mode: "number" }).references(
    () => organisation.id,
  ),
});

export const organisation = createTable("organisation", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name"),
  datetime: datetime("datetime"),
});
