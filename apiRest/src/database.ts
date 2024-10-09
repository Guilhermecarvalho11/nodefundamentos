import { knex } from "knex";

export const knexDB = knex({
  client: "sqlite",
  connection: {
    filename: "./tmp/app.db",
  },
});
