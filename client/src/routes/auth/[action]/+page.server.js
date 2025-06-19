import { PUBLIC_API_URL } from "$env/static/public";
import { PUBLIC_COOKIE_KEY_AUTH as init_key_auth } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

let COOKIE_KEY_AUTH = init_key_auth ?? "auth";

const apiRequest = async (url, data) => {
  return await fetch(`${PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const actions = {

  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const response = await apiRequest(
      "/api/auth/login",
      Object.fromEntries(data)
    );

    if (response.ok) {
      // Take the cookie from the backend and forward it to the browser, and redirect
      const responseCookies = response.headers.getSetCookie();
      const cookie = responseCookies.find((i) => i.startsWith(COOKIE_KEY_AUTH));
      const cookieValue = cookie.split("=")[1].split(";")[0]; // So this looks like it's taking the value part and then it trims off the semicolon
      cookies.set(COOKIE_KEY_AUTH, cookieValue, { path: "/", secure: false });
      throw redirect(302, "/?message=true");
    }
    
    return response.json();
  },

  register: async ({ request }) => {
    // Take the user input data and register them, then redirect
    const data = await request.formData();
    const response = await apiRequest(
      "/api/auth/register",
      Object.fromEntries(data)
    );

    if (response.ok) {
      throw redirect(302, "/auth/login?registered=true");
    }

    return response.json();
  },
};