<script>
import { useQuestionState } from "$lib/states/questionState.svelte.js";
let questionState = useQuestionState();

const addQuestion = (e) => {
    let fd = new FormData(e.target);
    const q = Object.fromEntries(fd);
    q.id = crypto.randomUUID();
    q["upvotes"] = 0;
    questionState.add(q);
    e.target.reset();
    e.preventDefault();
};
</script>

<form onsubmit={addQuestion}>
    <label for="name">New Question</label>
    <br />
    <input id="name" name="title" type="text" placeholder="Entitle your question" />
    <br />
    <textarea id="name" name="text" placeholder="Describe the question"></textarea>
    <br />
    <input type="submit" value="Add Question" />
    <br />
</form>
