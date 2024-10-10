import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

export const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid envirorment variable!", _env.error.format());
  throw new Error("Invalid envirorment variable!");
}

export const env = _env.data;
