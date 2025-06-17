import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

import * as courseController from "./handlers/courseController.js";
import * as questionController from "./handlers/questionController.js";
import * as authenticationController from "./handlers/authenticationController.js";
import * as noteController from "./handlers/noteController.js";

import userMiddleware from "./middleware/userMiddleware.js"

import originList from "./origin-list.js";

const app = new Hono();
app.use("/*", cors({
  origin: originList,
  credentials: true,
}));

//////////////////////////////////////////////

///// Non-authenticated routes /////

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
app.post("/api/auth/verify", authenticationController.verifyToken);

const appProtectRoute = (route,
  cookie=process.env.COOKIE_KEY_AUTH,
  secret=process.env.JWT_SECRET
  ) => {
  app.use(route,jwt.jwt({cookie: cookie, secret: secret}))
};

//////////////////////////////////////////////

///// Authenticated routes /////

// Users

appProtectRoute("/api/users");
app.get("/api/users", async (c) => {
  return c.json(["This", "is", "a", "placeholder", "list."]);
});

// Notes

appProtectRoute("/api/notes/*");
app.use("/api/notes/*", userMiddleware);

app.post("/api/notes", ...noteController.addNote);
app.get("/api/notes", noteController.getAllNotes);
app.get("/api/notes/:id", noteController.getNote);
app.post("/api/notes/:id", ...noteController.updateNote);
app.delete("/api/notes/:id", noteController.deleteNote);

//////////////////////////////////////////////

export default app;
