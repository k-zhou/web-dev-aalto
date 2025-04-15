<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  const { id } = $props();
  let questionState = useQuestionState(id);
  
  
  const addQuestion = (e) => {
    let fd = new FormData(e.target);
    const q = Object.fromEntries(fd);
    // q.id = crypto.randomUUID();
    // q["upvotes"] = 0;
    questionState.add(q);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addQuestion} class="flex flex-col space-y-0.5">
  <label for="name" class="h3">New Question</label>
  <br />
  <input id="name" name="title" type="text" placeholder="Entitle your question" class="w-full dark:text-black rounded-[0.5vw]"/>
  <br />
  <textarea id="name" name="text" placeholder="Describe the question" class="w-full dark:text-black rounded-[0.5vw]"></textarea>
  <br />
  <input type="submit" value="Add Question" class="btn w-full preset-filled-primary-500"/>
  <br />
</form>
