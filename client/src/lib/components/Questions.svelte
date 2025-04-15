<script>
  import QuestionForm from "./QuestionForm.svelte";
  import QuestionList from "./QuestionList.svelte";
  const { id } = $props();
</script>
<span class="flex flex-col space-y-2 border-2 border-gray rounded-[1.0vw] p-2">
  <h2 class="h2">Questions</h2> 
  <h3 class="h3">Existing questions</h3>
  <QuestionList {id}/>

  <QuestionForm {id}/>
</span>