import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

let questionsList = [];
// test examples
// const ex1 = { "id": 1, "title": "Question 1 title", "text": "Question 1 text", "upvotes": 0 };
// const ex2 = { "id": 2, "title": "Question 2 title", "text": "Question 2 text", "upvotes": 2 };
// questionsList.push(ex1);
// questionsList.push(ex2);

app.use("/*", cors());
app.use("/*", logger());

app.get("/courses", (c) => {
  return c.json({"courses": [ {"id": 1, "name": "Web Software Development" }, {"id": 2, "name": "Device-Agnostic Design" } ] });
});

app.get("/courses/:id", (c) => {
  return c.json({"course":{"id":Number(c.req.param("id")), "name": "Course Name"}});
});

app.post("/courses", async (c) => {
  const obj = await c.req.json();
  return c.json({"course":{"id": 3, "name": obj.name}});
});

app.get("/courses/:id/questions", (c) => {
  return c.json(questionsList);
});

// Receives a new question, adds it to the list, and responds with the new entry
app.post("/courses/:id/questions", async (c) => {
  const received = await c.req.json();
  // NOTICE this could currently lead to repeated id:s
  let newQuestion = {
    "id": questionsList.length + 1, 
    "title": received.title,
    "text": received.text,
    "upvotes": 0
  };
  questionsList.push(newQuestion);
  return c.json(newQuestion);
});

// Receives an upvote to a question, records the upvote and responds with the updated question
app.post("/courses/:id/questions/:qId/upvote", (c) => {
  const i = questionsList.findIndex((q) => q.id === Number(c.req.param("qId")));
  questionsList[i]["upvotes"]++;
  return c.json(questionsList[i]);
});

// NOTICE this could currently lead to repeated id:s
// Removes the question pointed to by qID
app.delete("/courses/:id/questions/:qId", (c) => {
  const removed = questionsList.find((q) => q.id === Number(c.req.param("qId")));
  questionsList = questionsList.filter((q) => q.id !== Number(c.req.param("qId")));
  return c.json(removed);
});

// This section is for an exercise round
import * as feedbackRepository from "./feedbackRepository.js";

app.get("/feedbacks/:grading", async (c) => {
  return c.json({ "count": await feedbackRepository.get(c.req.param("grading")) });
});

app.post("/feedbacks/:grading", async (c) => {
  return c.json({ "count": await feedbackRepository.update(c.req.param("grading")) });
});


// Template
// app.get("", (c) => {

// });

export default app;
