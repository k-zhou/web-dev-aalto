import { zValidator }      from "zValidator";

import { noteValidator } from "./validators.js";
import * as noteRepository from "./noteRepository.js";

// CRUD

const addNote = [
  zValidator("json", noteValidator),
  async (c) => {
    const { text } = await c.req.valid("json");
    return c.json(await noteRepository.create(c.user.id, text));
}];

const getAllNotes = async (c) => {
  // console.log("note controller", c.user.id, typeof(c.user.id));
  return c.json(await noteRepository.getAll(c.user.id));
};

const getNote = async (c) => {
  return c.json(await noteRepository.getOne(c.req.param("id"), c.user.id));
};

const updateNote = [
  zValidator("json", noteValidator),
  async (c) => {
    const { text } = await c.req.valid("json");
    return c.json(await noteRepository.update(c.req.param("id"), c.user.id, text));
}];

const deleteNote = async (c) => {
  return c.json(await noteRepository.remove(c.req.param("id"), c.user.id));
};

export {
  addNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote
};