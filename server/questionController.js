import { zValidator }      from "zValidator";

import { questionValidator } from "./validators.js";
import * as questionRepository from "./questionRepository.js";

const getQuestions = async (c) => { 
  const { id } = c.req.param();
  return c.json(await questionRepository.getPerCourse(id));
};
const addQuestion  = [
  zValidator("json", questionValidator), 
  async (c) => { 
    const { id } = c.req.param();
    const newQuestion = c.req.valid("json");
    console.log(id, newQuestion);
    return c.json(await questionRepository.create(id, newQuestion));
  }
];
const upvoteQuestion  = async (c) => { 
  const { id, qId } = c.req.param();
  return c.json(await questionRepository.upvote(id, qId)); 
};
const deleteQuestion  = async (c) => { 
  const { id, qId } = c.req.param();
  return c.json(await questionRepository.remove(id, qId));
};


export { getQuestions, addQuestion, upvoteQuestion, deleteQuestion };