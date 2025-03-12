<script>
    import QuestionItem from "./QuestionItem.svelte";
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
    const handleClick = async () => {
      await questionState.fetch();
      console.log("button clicked");
    };
    $effect(async () => await questionState.fetch());
</script>

<button onclick={handleClick}>get questions</button>

<ul>
{#each questionState.questions as question}
  <li>
    <QuestionItem {question} />
  </li>
{/each}
</ul>
