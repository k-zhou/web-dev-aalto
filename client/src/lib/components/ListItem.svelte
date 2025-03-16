<script>
    import { useEditModeState } from "$lib/states/editModeState.svelte.js";
    const editModeState = useEditModeState();
    const { itemcontents } = $props();
    let itemState = $state(itemcontents);
</script>

<div>
    {itemState.label}
    {#if itemState.type === "number"}
        [ {itemState.numvalue} ]
        <button onclick={() => itemState.numvalue++}>( +1 )</button>
        <button onclick={() => itemState.numvalue--}>( -1 )</button>
        <button onclick={() => itemState.numvalue = 0}>reset</button>
    {:else if itemState.type === "checkbox"}
        <input type="checkbox" bind:checked={itemState.checked}/>
    {/if}
    {#if editModeState.mode}
        <button onclick={() => confirm(`Remove element [${itemState.label}]? (not implemented)`)}>Remove element</button>
    {/if}
</div>
<!---
<button onclick={() => questionState.upvote(question.id)}>Upvote</button>
<br />
<button onclick={() => questionState.remove(question.id)}>Delete</button>
-->