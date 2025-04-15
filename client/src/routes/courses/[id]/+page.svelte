<!-- Course-specific page  -->

<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import Questions from "$lib/components/Questions.svelte";
    import { load } from "./+page";
  const { data } = $props();
  const addr = `${PUBLIC_API_URL}/api/courses/${data.id}`;

  let course = $state({name:"Loading ..."});
  // let questions = $state([{title: "Placeholder q title", text: "Placeholder q text"}]);
  let loadingCourse = $state("startup");

  $effect( async () => {
    course = await (await fetch(addr)).json();
    if (course.id)
      loadingCourse = "finished";
    else
      loadingCourse = "not found";
  });
</script>

<span class="flex flex-col space-y-4">
  <h1 class="h1 bg-gray-700 rounded-[1.0vw]">{course.name}</h1>
  {#if loadingCourse === "finished"}
    <Questions id={course.id}/>
  {:else if loadingCourse === "not found"}
    <p>No such course</p>
  {/if}
</span>