import { z } from "zod";

const todo = z.object({name: z.string().min(3).max(30), done: z.coerce.boolean().default(false)});

export { todo };