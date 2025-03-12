import { browser } from "$app/environment";
import * as questionApi from "$lib/apis/questions-api.js";

const QUESTIONS_KEY = "questions_list";
let initialQuestions = [];
// if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
//     initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
// }
// const res = questionApi.fetch()

let questionState = $state(initialQuestions);

const saveQuestions = () => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const fetchQuestions = async () => {
  const data = await questionApi.getQuestions();
    // console.log(data); // debug
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
      // saveQuestions();
    },
    add: async (q) => {
      const data = await questionApi.postQuestion(q);
      // console.log(data); // debug
      if (data) {
        await fetchQuestions();
      }
      // saveQuestions();
    },
    upvote: async (id) => {
      const q = questionState.find((q) => q.id === id);
      const data = await questionApi.upvoteQuestion(q.id);
      if (data) {
        // questionState.forEach((q) => q.id === data.id ? q = data : {} ); // doesn't change the state apparantly
        // const i = questionState.findIndex((q) => q.id === data.id);
        // questionState[i] = data;
        await fetchQuestions();
      }
      // saveQuestions();
    },
    remove: async (id) => {
      const data = await questionApi.deleteQuestion(id);
      // console.log("remove, data:", data);
      if (data) {
        // questionState = questionState.filter((q) => q.id !== data.id);
        await fetchQuestions();
      }
      // saveQuestions();
    },
  };
};

export { useQuestionState };