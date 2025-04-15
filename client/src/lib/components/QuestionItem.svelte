<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  let { question, id } = $props();
  let questionState = useQuestionState(id);
</script>
<span class="flex flex-col space-y-1">
  <span class="flex space-x-2 p2">
    <h3 class="h3 grow">{question.title}</h3>
    <p>Upvotes: {question.upvotes}</p>
    <button onclick={() => questionState.upvote(question.id)} class="btn preset-outlined-primary-500">Upvote</button>
    <br />
    <button onclick={() => questionState.remove(question.id)} class="btn preset-outlined-error-500">Delete</button>
  </span>
  <p class="w-full preset-filled-surface-500 rounded-[0.5vw] p-2">{question.text}</p>
  <hr>
</span>
