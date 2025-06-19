import postgres from "postgres";

const sql = postgres();

const create = async (userID, text) => {
  const result = await sql`
    INSERT INTO notes (user_id, text)
    VALUES (${userID}, ${text})
    RETURNING *`;
  return result[0];
};

const getAll = async (userID) => {
  const result = await sql`
    SELECT id, text FROM notes 
    WHERE user_id = ${userID}`;
  // console.log("note repo result", result, result.length);
  if (result.length > 0)
    return result;
  else
    return [{ id:0, text:"No notes found." }];
};

const getOne = async (noteID, userID) => {
  const result = await sql`
    SELECT id, text FROM notes 
    WHERE id = ${noteID} AND user_id = ${userID}`;
  if (result.length > 0)
    return result[0];
  else
    return { id:0, text:"No such note found." };
};

const update = async (noteID, userID, text) => {
  const result = await sql`
    UPDATE notes
    SET text = ${text}
    WHERE id = ${noteID} AND user_id = ${userID}
    RETURNING *`;
  return result[0];
};

const remove = async (noteID, userID) => {
  const result = await sql`
    DELETE FROM notes
    WHERE id = ${noteID} AND user_id = ${userID}`;
  return result[0];
};

export { 
  create,
  getAll,
  getOne,
  update,
  remove
};