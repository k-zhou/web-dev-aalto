import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import postgres from "postgres";

const sql = postgres();

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
  // Takes the user input data, checks it against the database, and returns the result with a JSON and a JWT
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

    // Get all the user's roles
    const rolesResult = await sql`SELECT role FROM user_roles
      WHERE user_id = ${user.id}`;
    const roles = rolesResult.map((r) => r.role);
    console.log("roles", roles);

    const payload = {
      id:   user.id,
      roles,
      name: user.name,
      exp: Math.floor(Date.now()) + 60*60*24*7,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    setCookie(c, process.env.COOKIE_KEY_AUTH, token, {
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

const verifyToken = async (c) => {
  const token = getCookie(c, process.env.COOKIE_KEY_AUTH);
  if (!token) {
    c.status(401);
    return c.json({
      "message": "No token found!"
    });
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    setCookie(c, process.env.COOKIE_KEY_AUTH, token, {
      path: "/",
      httpOnly: "true",
      sameSite: "lax"
    });
    return c.json({"message": "Valid token!"});
  }
  catch (e) {
    c.status(401);
    return c.json({
      "message": "Invalid token!"
    });
  }
};

export { registerUser, loginUser, verifyToken };