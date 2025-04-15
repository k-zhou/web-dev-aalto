<!-- Courses page -->
<!-- Lists all available courses as well as shows a form to add new courses -->

<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  const addr = `${PUBLIC_API_URL}/api/courses`;
  // init
  let courselist = $state(["default placeholder"]); 

  const addCourse = async (e) => {
    let fd = new FormData(e.target);
    const crs = Object.fromEntries(fd);
    const response = await fetch(addr, {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(crs)
    });
    
      e.target.reset();
    e.preventDefault();
  };

  const removeCourse = async (id) => {
    const response = await fetch(addr.concat(`/${id}`, { method: "DELETE" }));
  };

  $effect(async () => {
    const response = await fetch(addr);
    courselist = await response.json();
  });
</script>

<!-- Page -->
<span class="flex flex-col space-y-2 bg-gray-700 rounded-[0.5vw] p-2">
  <h1 class="h1">Courses</h1>
  <!-- List  -->
  <ul>
    {#each courselist as course}
      <li class="flex border-1 preset-filled-surface-500 border-gray-500 rounded-[0.5vw] p-1">
        <a href="/courses/{course.id}" class="grow">{course.name}</a>
        <button onclick={() => removeCourse(course.id)} class="btn preset-tonal-secondary">Remove</button>
      </li>
    {/each}
  </ul>

  <hr>
  <!-- Form  -->
  <form onsubmit={addCourse} class="space-y-2">
    <label for="name" class="h3">Add new course</label>
    <br />
    <input id="name" name="name" type="text" placeholder="Course name" class="w-full dark:text-black"/>
    <br />
    <input type="submit" value="Add course" class="btn preset-filled-secondary-500 w-full"/>
  </form>
</span>