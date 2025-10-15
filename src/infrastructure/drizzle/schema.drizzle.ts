import { pgTable, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
	id: varchar().primaryKey(),
	orgUrl: varchar().notNull(),
	shortCode: varchar().notNull(),
	name: varchar(),
});
