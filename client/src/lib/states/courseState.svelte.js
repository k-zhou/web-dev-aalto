import * as courseApi from "$lib/apis/courses-api.js";
// import { browser } from "$app/environment";

const COURSES_KEY = "courses_list";
let initialCourses = [];
// // Local storage variant
// if (browser && localStorage.hasOwnProperty(COURSES_KEY)) {
//     initialCourses = JSON.parse(localStorage.getItem(COURSES_KEY));
// }
let courseState = $state(initialCourses);
// // Local storage variant
// const saveCourses = () => {
//   localStorage.setItem(COURSES_KEY, JSON.stringify(courseState));
// };

const fetchCourses = async () => {
  const data = await courseApi.getAllCourses();
    if (data) {
      courseState = data;
    }
};

const useCourseState = (id) => {
  return {
    get courses() {
      return courseState;
    },
    getOne: async (id) => {
      return await courseApi.getOneCourse(id);
    },
    fetch: async () => {
      await fetchCourses();
    },
    add: async (c) => {
      const data = await courseApi.postCourse(c);
      if (data) {
        await fetchCourses();
      }
    },
    remove: async (id) => {
      const data = await courseApi.deleteCourse(id);
      if (data) {
        await fetchCourses();
      }
    },
  };
};

export { useCourseState };