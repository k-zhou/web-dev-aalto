// <script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
    
    const addQuestion = (e) => {
        let fd = new FormData(e.target);
        fd.append("upvotes", 1);
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
        <input id="name" name="details" type="text" placeholder="Describe the question" />
        <br />
        <input type="submit" value="Add Question" />
        <br />
    </form>
