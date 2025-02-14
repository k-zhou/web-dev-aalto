// <script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
    
    const addQuestion = (e) => {
        let fd = new FormData(e.target);
        fd.append("count", 0);
        const q = Object.fromEntries(fd);
        q.id = crypto.randomUUID();
        questionState.add(q);
        e.target.reset();
        e.preventDefault();
    };
    </script>

    <form onsubmit={addQuestion}>
        <label for="name">Question</label>
        <br />
        <input id="name" name="title" type="text" placeholder="Entitle your question" />
        <br />
	<textarea id="name" name="details" placeholder="Describe the question"></textarea>
        <br />
        <input type="submit" value="Add Question" />
        <br />
    </form>
