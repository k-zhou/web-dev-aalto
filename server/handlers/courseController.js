import { zValidator }      from "zValidator";

import { courseValidator } from "./validators.js";
import * as courseRepository from "./courseRepository.js";

const getAllCourses = async (c) => { 
  return c.json(await courseRepository.getAll());
};
const getOneCourse  = async (c) => { 
  const { id } = c.req.param();
  return c.json(await courseRepository.getOne(id));
};
const createCourse  = [
  zValidator("json", courseValidator), 
  async (c) => { 
    const { name } = await c.req.valid("json");
    return c.json(await courseRepository.create(name)); 
  }
];
const deleteCourse  = async (c) => { 
  const { id } = c.req.param();
  return c.json(await courseRepository.remove(id));
};

export { getAllCourses, getOneCourse, createCourse, deleteCourse };