
// Postgre SQL -related
// - unused

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

//////////////////////////////////////////////

// app.use("/api/users", 
//   jwt.jwt({
//     cookie: process.env.COOKIE_KEY_AUTH,
//     secret: process.env.JWT_SECRET,
// }));