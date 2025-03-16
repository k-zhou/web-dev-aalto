import { browser } from "$app/environment";
import * as ttgwidgetsApi from "$lib/apis/ttgwidgets-api.js";

let editModeState = $state(false);

const useEditModeState = () => {
  return {
    get mode() {
      return editModeState;
    },
    modeStatus: () => {
      return editModeState ? "Edit mode ON" : "Edit mode OFF";
    },
    toggle: () => {
      editModeState = !editModeState;
      return editModeState;
    },
  };
};

// const QUESTIONS_KEY = "questions_list";
// let initialQuestions = [];
// if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
//     initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
// }
// let questionState = $state(initialQuestions);

// const saveQuestions = () => {
//   localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
// };

// const fetchQuestions = async () => {
//   const data = await questionApi.getQuestions();
//     if (data) {
//       questionState = data;
//     }
// };

// const useQuestionState = () => {
//   return {
//     get questions() {
//       return questionState;
//     },
//     fetch: async () => {
//       await fetchQuestions();
//     },
//     add: async (q) => {
//       const data = await questionApi.postQuestion(q);
//       if (data) {
//         await fetchQuestions();
//       }
//     },
//     upvote: async (id) => {
//       const q = questionState.find((q) => q.id === id);
//       const data = await questionApi.upvoteQuestion(q.id);
//       if (data) {
//         await fetchQuestions();
//       }
//     },
//     remove: async (id) => {
//       const data = await questionApi.deleteQuestion(id);
//       if (data) {
//         await fetchQuestions();
//       }
//     },
//   };
// };

export { useEditModeState };