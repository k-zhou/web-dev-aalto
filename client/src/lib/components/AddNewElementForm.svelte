<script>
    import { useElementsContainerState } from "$lib/states/elementsContainerState.svelte.js";
    const elementsContainerState = useElementsContainerState();
    const submitForm = (e) => {
        let fd = new FormData(e.target);
        const newElement = Object.fromEntries(fd);
        newElement.id = crypto.randomUUID();
        elementsContainerState.add(newElement);
        e.target.reset();
        e.preventDefault();
};
</script>

<h2>New Element</h2>
<form onsubmit={submitForm}>
    <input id="elementLabel" name="name" type="text" placeholder="Label for the new element" />
    <label for="elementLabel">Label</label>
    <input id="choice1" name="type" type="radio" value="numerical" />
    <label for="choice1">Numberical</label>
    <input id="choice2" name="type" type="radio" value="checkbox" />
    <label for="choice2">Checkbox</label>
    <input id="choice3" name="type" type="radio" value="radio" />
    <label for="choice3">Multi-choice</label>
    <br />
    <input type="submit" value="Add element" />
    <br />
</form>

<!-- 
<textarea id="name" name="text" placeholder="Describe the question"></textarea> 
 -->
