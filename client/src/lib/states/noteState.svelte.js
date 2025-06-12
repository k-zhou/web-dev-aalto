import * as noteApi from "$lib/apis/notes-api.js";
// import { browser } from "$app/environment";

const KEY = "notes_list";
let initialNotes = ["Nothing here!"];
// // Local storage variant
// if (browser && localStorage.hasOwnProperty(KEY)) {
//     initialNotes = JSON.parse(localStorage.getItem(KEY));
// }
let noteState = $state(initialNotes);
// // Local storage variant
// const saveNotes = () => {
//   localStorage.setItem(KEY, JSON.stringify(noteState));
// };

const fetchNotes = async (options) => {
  const response = await noteApi.getAllNotes(options);
  const data = await response.json();
  if (data) {
    noteState = data;
  }
  // console.log("note state .fetch", response);
  // console.log("note state ...", data, noteState);
  return response;
};

const useNoteState = () => {
  return {
    get notes() {
      return noteState;
    },
    add: async (note, options) => {
      const data = await noteApi.postNote(note, options);
      // console.log("note state", data);
      if (data) {
        await fetchNotes(options);
      }
      return data;
    },
    fetch: async (options) => {
      return await fetchNotes(options);
    },
    getOne: async (id, options) => {
      return await noteApi.getOneNote(id, options);
    },
    edit: async (id, note, options) => {
      const data = await noteApi.editNote(id, note, options);
      if (data) {
        await fetchNotes(options);
      }
      return data;
    },
    remove: async (id, options) => {
      const data = await noteApi.deleteNote(id, options);
      if (data) {
        await fetchNotes(options);
      }
      return data;
    },
  };
};

export { useNoteState };