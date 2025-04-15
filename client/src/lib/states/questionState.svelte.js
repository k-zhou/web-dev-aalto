import * as questionApi from "$lib/apis/questions-api.js";
// import { browser } from "$app/environment";

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

const useQuestionState = (id) => {
  return {
    get questions() {
      return questionState;
    },
    fetch: async () => {
      await fetchQuestions(id);
    },
    add: async (q) => {
      const data = await questionApi.postQuestion(id, q);
      if (data) {
        await fetchQuestions(id);
      }
    },
    upvote: async (qId) => {
      const q = questionState.find((q) => q.id === qId);
      const data = await questionApi.upvoteQuestion(id, q.id);
      if (data) {
        await fetchQuestions(id);
      }
    },
    remove: async (qId) => {
      const data = await questionApi.deleteQuestion(id, qId);
      if (data) {
        await fetchQuestions(id);
      }
    },
  };
};

export { useQuestionState };