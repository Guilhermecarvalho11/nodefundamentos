import fastify from "fastify";

const app = fastify();

app.get("/hello", () => {
  return "hello word";
});

app
  .listen({
    port: 3333,
  })
  .then(function () {
    console.log("HTTP Server Running");
  });
