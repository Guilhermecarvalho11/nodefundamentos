import { FastifyInstance } from "fastify";
import { knexDB } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function transitionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knexDB("transactions").select();

    return { transactions };
  });

  app.get("/:id", async (req) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(req.params);
    const transactions = await knexDB("transactions").where("id", id).first();

    return { transactions };
  });

  app.post("/", async (req, replay) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { amount, title, type } = createTransactionBodySchema.parse(req.body);

    await knexDB("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return replay.status(201).send();
  });
}
