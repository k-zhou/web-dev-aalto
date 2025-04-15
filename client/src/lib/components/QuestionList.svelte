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

<button onclick={handleClick}>Get questions</button>

<ul>
{#each questionState.questions as question}
  <li>
    <QuestionItem {id} {question} />
  </li>
{/each}
</ul>
