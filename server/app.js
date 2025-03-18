import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { zValidator } from "zValidator";
import postgres from "postgres";
import * as todoRepository from "./todoRepository.js";
import * as validators from "./validators.js"

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

app.get("/", (c) => {
  c.json({ message: "Hello world!" })
});
// app.post("/", async (c) => {
//   const { query } = await c.req.json();
//   const result = await sql.unsafe(query);
//   return c.json(result);
// });
/////////////////////////////////////
app.get("/todos", async (c) => {
  return c.json(await todoRepository.readAll());
});
app.post("/todos", zValidator("json", validators.todo), async (c) => {
  const todo = await c.req.valid("json");
  return c.json(await todoRepository.create(todo));
});
app.get("/todos/:id", async (c) => {
  return c.json(await todoRepository.readOne(c.req.param("id")));
});
app.put("/todos/:id", zValidator("json", validators.todo), async (c) => {
  const todo = await c.req.valid("json");
  return c.json(await todoRepository.update(c.req.param("id"), todo));
});
app.delete("/todos/:id", async (c) => {
  return c.json(await todoRepository.remove(c.req.param("id")));
});
// app.get("/courses", (c) => c.json(
//   {"courses": [ {"id": 1, "name": "Web Software Development" }, {"id": 2, "name": "Device-Agnostic Design" } ] }
// ))
// app.get("/courses/:id", (c) => c.json(
//   {"course":{"id":Number(c.req.param("id")), "name": "Course Name"}}
// ))
// app.post("/courses", async (c) => {
//   const obj = await c.req.json();
//   return c.json({"course":{"id": 3, "name": obj.name}})
// })
// app.get("/courses/:id/topics", (c) => c.json(
//   {"topics": [ { "id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] }
// ))
// app.get("/courses/:cId/topics/:tId/posts", (c) => c.json(
//   {"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] }
// ))
// app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => c.json(
//   {"post": {"id": Number(c.req.param("pId")), "title": "Post Title" }, "answers": [ { "id": 1, "content": "Answer 1" }, {"id": 2, "content": "Answer 2" } ] }
// ))

export default app;
