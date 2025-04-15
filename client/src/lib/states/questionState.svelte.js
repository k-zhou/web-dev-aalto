import { browser } from "$app/environment";
import * as questionApi from "$lib/apis/questions-api.js";

const QUESTIONS_KEY = "questions_list";
let initialQuestions = [];
// // Local storage variant
// if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
//     initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
// }
let questionState = $state(initialQuestions);
// // Local storage variant
// const saveQuestions = () => {
//   localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
// };

const fetchQuestions = async (id) => {
  const data = await questionApi.getQuestions(id);
    if (data) {
      questionState = data;
    }
};

const useQuestionState = () => {
  return {
    get questions() {
      return questionState;
    },
    fetch: async () => {
      await fetchQuestions();
    },
    add: async (id, q) => {
      const data = await questionApi.postQuestion(id, q);
      if (data) {
        await fetchQuestions();
      }
    },
    upvote: async (id, qId) => {
      const q = questionState.find((q) => q.id === qId);
      const data = await questionApi.upvoteQuestion(id, q.id);
      if (data) {
        await fetchQuestions();
      }
    },
    remove: async (id, qId) => {
      const data = await questionApi.deleteQuestion(id, qId);
      if (data) {
        await fetchQuestions();
      }
    },
  };
};

export { useQuestionState };