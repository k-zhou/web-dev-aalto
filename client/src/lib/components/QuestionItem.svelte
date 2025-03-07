<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
    let { question } = $props();
</script>

<h3>{question.title}</h3>
<p>{question.details}</p>
<p>Upvotes: {question.count}</p>
<button onclick={() => questionState.upvote(question.id)}>Upvote</button>
<br />
<button onclick={() => questionState.remove(question.id)}>Delete</button>
