import accessControlList from "../access-control-list.js"

const aclMiddleware = async (c, next) => {
  const roles = accessControlList[c.req.path];
  if (!roles) {
    await next();
    return;
  }

  if (!c.user?.roles) {
    c.status(401);
    return c.json({ error: "Unauthorized"});
  }

  if (!c.user?.roles.some((r) => roles.includes(r))) {
    c.status(403);
    return c.json({ error: "Forbidden" });
  }

  await next();
};

export default aclMiddleware;