import { getCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

// The user, if it exists, is set to the context regardless.

const userMiddleware = async (c, next) => {
  const token = getCookie(c, process.env.COOKIE_KEY_AUTH);
  if (!token) {
    await next();
    return;
  }
  const { payload } = jwt.decode(token, process.env.JWT_SECRET);
  c.user = payload;
  await next();
};

export default userMiddleware;