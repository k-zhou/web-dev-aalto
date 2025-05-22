import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";

import * as courseController from "./handlers/courseController.js";
import * as questionController from "./handlers/questionController.js";
import * as authenticationController from "./handlers/authenticationController.js";

const app = new Hono();
app.use("/*", cors({
  origin: process.env.PUBLIC_FRONT_URL,
  credentials: true,
}));

const BANNED_WORDS = [
  "delete", "update", "insert", "drop", "alter", "create",
  "truncate", "replace", "merge", "grant", "revoke",
  "transaction", "commit", "rollback", "savepoint", "lock",
  "execute", "call", "do", "set", "comment"
];
const query = async (query) => {
  // check that the query does not do data manipulation
  for (const word of BANNED_WORDS) {
    if (query.toLowerCase().includes(word)) {
      throw new Error(`You cannot ${word} data`);
    }
  }

//   const sql = postgres({
//     max: 2,
//     max_lifetime: 10,
//   });
//   return await sql.unsafe(query);
};

app.get("/", (c) => {
  let count = getCookie(c, "count");
  count = count ? parseInt(count) + 1 : 1;
  setCookie(c, "count", count, {
    path: "/",
    httpOnly: "true",
    sameSite: "lax"
  });
  return c.json(`Hello World! You've visited ${count} ${count == 1 ? "time" : "times"}.`)
});

app.get("/api/courses", courseController.getAllCourses);
app.get("/api/courses/:id", courseController.getOneCourse);
app.post("/api/courses", ...courseController.createCourse);
app.delete("/api/courses/:id", courseController.deleteCourse);

app.get("/api/courses/:id/questions", questionController.getQuestions);
app.post("/api/courses/:id/questions", ...questionController.addQuestion);
app.post("/api/courses/:id/questions/:qId/upvote", questionController.upvoteQuestion);
app.delete("/api/courses/:id/questions/:qId", questionController.deleteQuestion);

//////////////////////////////////////////////

// Authentication

app.post("/api/auth/register", authenticationController.registerUser);
app.post("/api/auth/login", authenticationController.loginUser);

//////////////////////////////////////////////
export default app;
