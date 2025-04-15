<script>
  import QuestionItem from "./QuestionItem.svelte";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  const { id } = $props();
  let questionState = useQuestionState(id);
  const handleClick = async () => {
    await questionState.fetch();
    console.log("Fetching questions");
  };
  $effect(async () => await questionState.fetch());
</script>

<span class="space-y-2">
  <button onclick={handleClick} class="btn preset-outlined-primary-500">Get questions</button>
  <hr>
  <ul>
  {#each questionState.questions as question}
    <li>
      <QuestionItem {id} {question} />
    </li>
  {/each}
  {#if questionState.questions.length == 0}
    <li>No questions yet!</li>
  {/if}
  </ul>
  <hr>
</span>
