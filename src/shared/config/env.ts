import { z } from "zod";

const envSchema = z.object({
	PORT: z.preprocess((val) => Number(val), z.number()),
	URL_HOST: z.url(),
	DATABASE_URL: z.url(),
});

const env = envSchema.parse(process.env);

export default env;
