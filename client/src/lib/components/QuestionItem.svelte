<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
    let { question } = $props();
</script>
<div>
    <h3>{question.title}</h3>
    <p>{question.details}</p>
    <div>
        <button onclick={() => questionState.upvote(question.id)}>Upvote</button>
        Upvotes: {question.upvotes}
    </div>
    <br />
    <button onclick={() => questionState.remove(question.id)}>Remove Question</button>
</div>
