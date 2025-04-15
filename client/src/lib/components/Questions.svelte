<script>
    import QuestionForm from "./QuestionForm.svelte";
    import QuestionList from "./QuestionList.svelte";
    const { id } = $props();
</script>

<h1>Questions</h1>

<h2>Add Question</h2>

<QuestionForm {id}/>

<h2>Existing questions</h2>

<QuestionList {id}/>
