import { table } from "console";
import fastify from "fastify";
import { knexDB } from "./database";

const app = fastify();

app.get("/hello", async () => {
  const test = await knexDB("sqlite_schema").select("*");

  return test;
});

app
  .listen({
    port: 3333,
  })
  .then(function () {
    console.log("HTTP Server Running");
  });
