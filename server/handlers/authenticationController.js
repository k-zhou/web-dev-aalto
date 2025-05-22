import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

const registerUser = async (c) => {
  const data = await c.req.json();
  try {
    const result = await sql`INSERT INTO users (email, password_hash)
      VALUES (${data.email.trim().toLowerCase()},
      ${hash(data.password.trim())}) RETURNING *`;
  }
  finally {
    return c.json({ "message": `Confirmation email sent to address ${data.email.trim().toLowerCase()??""}.` });
  }
};

const loginUser = async (c) => {
  let validationSuccess = false;
  const data = await c.req.json();
  const result = await sql`SELECT * FROM users
    WHERE email = ${data.email.trim().toLowerCase()}`;
  if (result.length > 0) {
    const user = result[0];
    const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {
      validationSuccess = true;
    }
  }
  if (validationSuccess) {
    const user = result[0];
    // console.log("server", user, process.env.COOKIE_KEY_AUTH);
    setCookie(c, process.env.COOKIE_KEY_AUTH, user.id, {
      path: "/",
      httpOnly: "true",
      sameSite: "lax"
    });
    return c.json({
      "message": `Logged in as user with id ${user.id}`,
    });
  } 
  else 
  {
    c.status(401);
    return c.json({
      "message": "Invalid email or password!"
    });
  }
};

export { registerUser, loginUser };