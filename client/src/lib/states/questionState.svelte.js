import { browser } from "$app/environment";

const QUESTIONS_KEY = "questions_list";
let initialQuestions = [];
if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
    initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
}

let questionState = $state(initialQuestions);

const saveQuestions = () => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
};

const useQuestionState = () => {
  return {
    get questions() {
      return questionState;
    },
    add: (q) => {
      questionState.push(q);
      saveQuestions();
    },
    upvote: (id) => {
      const q = questionState.find((q) => q.id === id);
      q.upvotes++;
      saveQuestions();
    },
    remove: (id) => {
      questionState = questionState.filter((q) => q.id !== id);
      saveQuestions();
    },
  };
};

export { useQuestionState };