import { table } from "console";
import fastify from "fastify";
import { knexDB } from "./database";
import { title } from "process";

const app = fastify();

app.get("/hello", async () => {
  const transitions = await knexDB("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "transação teste",
      amount: 1650,
    })
    .returning("*");

  return transitions;
});

app
  .listen({
    port: 3333,
  })
  .then(function () {
    console.log("HTTP Server Running");
  });
