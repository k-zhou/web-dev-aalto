//<script>
    import QuestionItem from "./QuestionItem.svelte";
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
  </script>
  
  <ul>
    {#each questionState.questions as question}
      <li>
        <QuestionItem {question} />
      </li>
    {/each}
  </ul>
  