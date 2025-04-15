<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  let { question, id } = $props();
  let questionState = useQuestionState(id);
</script>
<span class="flex flex-col space-y-1">
  <span class="flex space-x-2 p2">
    <h3 class="h3 grow">{question.title}</h3>
    <p>Upvotes: {question.upvotes}</p>
    <button onclick={() => questionState.upvote(question.id)}>Upvote</button>
    <br />
    <button onclick={() => questionState.remove(question.id)}>Delete</button>
  </span>
  <p class="w-full">{question.text}</p>
  <hr>
</span>
