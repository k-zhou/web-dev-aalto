<!-- Courses page -->
<!-- Lists all available courses as well as shows a form to add new courses -->

<script>
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  const courseState = useCourseState();
  
  // handles the form
  const addCourse = async (e) => {
    let fd = new FormData(e.target);
    const crs = Object.fromEntries(fd);
    courseState.add(crs);

    e.target.reset();
    e.preventDefault();
  };
  // loads page
  $effect(async () => {
    courseState.fetch();
  });
</script>

<!-- Page -->
<span class="flex flex-col space-y-2 bg-gray-700 rounded-[0.5vw] p-2">
  <h1 class="h1">Courses</h1>
  <!-- List  -->
  <ul>
    {#each courseState.courses as course}
      <li class="flex border-1 preset-filled-surface-500 border-gray-500 rounded-[0.5vw] p-1">
        <a href="/courses/{course.id}" class="grow">{course.name}</a>
        <button onclick={() => courseState.remove(course.id)} class="btn preset-tonal-secondary">Remove</button>
      </li>
    {/each}
  </ul>

  <hr>
  <!-- Form  -->
  <form onsubmit={addCourse} class="space-y-2">
    <label for="name" class="h3">Add a new course</label>
    <br />
    <input id="name" name="name" type="text" placeholder="Course name" class="w-full dark:text-black"/>
    <br />
    <input type="submit" value="Add course" class="btn preset-filled-secondary-500 w-full"/>
  </form>
</span>