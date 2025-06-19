import postgres from "postgres";

const sql = postgres();

const getPerCourse = async (cId) => {
  const result = await sql`SELECT * FROM questions WHERE course_id = ${cId}`;
  return result;
};
const create = async (cId, question) => {
  const result = await sql`INSERT INTO questions (course_id, title, text)
  VALUES (${cId}, ${question.title}, ${question.text})
  RETURNING *`;
  return result[0];
};
const upvote = async (cId, qId) => {
  const result = await sql`UPDATE questions
  SET upvotes = upvotes + 1
  WHERE course_id = ${cId} AND id = ${qId}
  RETURNING *`;
  return result[0];
};
const remove = async (cId, qId) => {
  const result = await sql`DELETE FROM questions WHERE course_id = ${cId} AND id = ${qId}`;
  return result[0];
};

export { getPerCourse, create, upvote, remove };