import { z } from "zod";

const envSchema = z.object({
	PORT: z.preprocess((val) => Number(val), z.number()),
	URL_HOST: z.string(),
	DATABASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
