import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

app.get("/", (c) => c.json({ message: "Hello world!" }));
app.get("/todos", async (c) => {
  const todos = await sql`SELECT * FROM todos`;
  return c.json(todos);
});
app.get("/courses", (c) => c.json(
  {"courses": [ {"id": 1, "name": "Web Software Development" }, {"id": 2, "name": "Device-Agnostic Design" } ] }
))
app.get("/courses/:id", (c) => c.json(
  {"course":{"id":[c.req.param("id")], "name": "Course Name"}}
))
app.post("/courses", async (c) => {
  const obj = await c.req.json();
  return c.json({"course":{"id": 3, "name": obj.name}})
})
app.get("/courses/:id/topics", (c) => c.json(
  {"topics": [ { "id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] }
))
app.get("/courses/:cId/topics/:tId/posts", (c) => c.json(
  {"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] }
))
app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => c.json(
  {"post": {"id": [c.req.param("pId")], "title": "Post Title" }, "answers": [ { "id": 1, "content": "Answer 1" }, {"id": 2, "content": "Answer 2" } ] }
))

export default app;
