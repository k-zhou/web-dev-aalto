import { PUBLIC_INTERNAL_API_URL } from "$env/static/public";
import { PUBLIC_COOKIE_KEY_AUTH as init_key_auth } from "$env/static/private";
import { decodeJwt } from "jose";

let COOKIE_KEY_AUTH = init_key_auth ?? "auth";

// This runs on each request
export const handle = async ({ event, resolve }) => {
  // It extracts the cookie with the name XYZ and ...
  const authCookie = event.cookies.get(COOKIE_KEY_AUTH);
  if (authCookie) {
    // Verifies the JWT with the backend. 
    // If successful, assigns the payload as the value of the 
    // "user" property
    const response = await fetch(`${PUBLIC_INTERNAL_API_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "cookie": `${COOKIE_KEY_AUTH}=${authCookie}`
      }
    });

    // If response not ok, clear cookie
    if (!response.ok) {
      event.cookies.delete(COOKIE_KEY_AUTH, { path: "/" });
      return await resolve(event);
    }

    // Get the cookie from the response headers and set the it
    const responseCookies = response.headers.getSetCookie();
    const cookie = responseCookies.find((i) => i.startsWith(COOKIE_KEY_AUTH));

    // If no cookie, resolve
    if (!cookie) {
      return await resolve(event);
    }

    const cookieValue = cookie.split("=")[1].split(";")[0];
    event.cookies.set(COOKIE_KEY_AUTH, cookieValue, { path: "/", secure: false });

    // otherwise forward the JWT and set the cookie
    try {
      const payload = decodeJwt(authCookie);
      event.locals.user = payload;
    }
    catch (e) {
      console.log(e);
    }
    
  }
  // This continues with +layout.server.js

  return await resolve(event);
};