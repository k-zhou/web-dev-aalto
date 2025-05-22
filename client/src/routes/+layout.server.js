
// export const prerender = true; // Cannot prerender pages with actions.
export const load = async ({ locals }) => {
  // This exposes the "locals" object as the property "data".
  // If it is unnecessary to expose this on all pages, 
  // you can declare this function separately on every +page.server.js that
  // requires the use of cookies.
  return locals;
};