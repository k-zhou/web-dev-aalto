<!-- Course-specific page  -->

<script>
  import Questions from "$lib/components/Questions.svelte";
  import { load } from "./+page";
  import { useCourseState } from "$lib/states/courseState.svelte";
  const { data } = $props();
  const courseState = useCourseState();
  let course = $state({name:"Loading ..."});
  let loadingCourse = $state("startup");

  $effect( async () => {
    course = await courseState.getOne(data.id) ?? {name:"No such course"};
  });
</script>

<span class="flex flex-col space-y-4">
  <h1 class="h1 bg-gray-700 rounded-[1.0vw]">{course.name}</h1>
  {#if course.id}
    <Questions id={course.id}/>
  {/if}
</span>