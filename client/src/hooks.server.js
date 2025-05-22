import { COOKIE_KEY_AUTH as init_key_auth } from "$env/static/private";

let COOKIE_KEY_AUTH = init_key_auth ?? "auth";

// This runs on each request
export const handle = async ({ event, resolve }) => {
  // It extracts the cookie with the name XYZ and ...
  const authCookie = event.cookies.get(COOKIE_KEY_AUTH);
  // ... then passes the cookie to the browser under the variable "user"
  if (authCookie) {
    event.locals.user = authCookie;
  }
  // This continues with +layout.server.js

  return await resolve(event);
};