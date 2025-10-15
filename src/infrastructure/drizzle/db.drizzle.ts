import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "@/shared/config/env.js";

const client = postgres(env.DATABASE_URL);
const db = drizzle({ client });

export default db;
