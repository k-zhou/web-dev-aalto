import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

import * as courseController from "./handlers/courseController.js";
import * as questionController from "./handlers/questionController.js";

const app = new Hono();
app.use("/*", cors());

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

app.get("/api/courses", courseController.getAllCourses);
app.get("/api/courses/:id", courseController.getOneCourse);
app.post("/api/courses", ...courseController.createCourse);
app.delete("/api/courses/:id", courseController.deleteCourse);

app.get("/api/courses/:id/questions", questionController.getQuestions);
app.post("/api/courses/:id/questions", ...questionController.addQuestion);
app.post("/api/courses/:id/questions/:qId/upvote", questionController.upvoteQuestion);
app.delete("/api/courses/:id/questions/:qId", questionController.deleteQuestion);

export default app;
