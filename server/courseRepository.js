import postgres from "postgres";

const sql = postgres();
// note that all queries return an array even if it only contains one entry

const getAll = async () => {
    const result = await sql`SELECT * FROM courses`;
    return result;
};

const getOne = async (id) => {
    const result = await sql`SELECT * FROM courses WHERE id = ${id}`;
    return result[0];
};

const create = async (name) => {
    const result = await sql`INSERT INTO courses (name) VALUES (${name}) RETURNING *`
    return result[0];
};


const remove = async (id) => {
    const result = await sql`DELETE FROM courses WHERE id = ${id} RETURNING *`
    return result[0];
};

export { getAll, getOne, create, remove };