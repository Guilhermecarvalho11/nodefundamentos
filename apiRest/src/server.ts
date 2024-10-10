import fastify from "fastify";
import { transitionsRoutes } from "./routes/transitions";
import { env } from "./env";

const app = fastify();

app.register(transitionsRoutes, {
  prefix: "transactions",
});

app
  .listen({
    port: env.PORT,
  })
  .then(function () {
    console.log("HTTP Server Running");
  });
