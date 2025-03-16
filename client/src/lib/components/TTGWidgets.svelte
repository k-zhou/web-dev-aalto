<script>
    import List from "./List.svelte";
    import { useElementsContainerState } from "$lib/states/elementsContainerState.svelte.js";
    import { useEditModeState } from "$lib/states/editModeState.svelte.js";
    const elementsContainerState = useElementsContainerState();
    const editModeState = useEditModeState();

    const list1placeholder = {
        "id"  : crypto.randomUUID(),
        "name": "Collection #1 name", 
        "n"   : 3,
        "list": [
            {"label": "Numerical counter", "n": 0, "type": "number", "numvalue": 0, "checked": false}, 
            {"label": "Another counter", "n": 1, "type": "number", "numvalue": 2, "checked": false}, 
            {"label": "Checkbox for stuff", "n": 2, "type": "checkbox", "numvalue": 0, "checked": false}, 
        ],
    };
    const list2placeholder = {
        "id"  : crypto.randomUUID(),
        "name": "List name placeholder 2", 
        "n"   : 3,
        "list": [
            {"label": "Placeholder 2", "n": 0, "type": "number", "numvalue": 0, "checked": false}, 
            {"label": "Stringss", "n": 1, "type": "number", "numvalue": 2, "checked": false}, 
            {"label": ".....", "n": 2, "type": "checkbox", "numvalue": 0, "checked": false}, 
        ],
    };

    elementsContainerState.add(list1placeholder);
    elementsContainerState.add(list2placeholder);
    const item1ID = list1placeholder.id;
    const item2ID = list2placeholder.id;
    // console.log("passing", item1ID, $inspect(elementsContainerState.get(item1ID)));

</script>

<h1>Gaming Widgets</h1>
<!-- Edit Mode: {editModeState.modeStatus()} -- {editModeState.mode} -->
<button onclick={() => editModeState.toggle()}>{editModeState.modeStatus()}</button>
<p>Work in progress ...</p>

<List listObjectID={item1ID}/>
<List listObjectID={item1ID}/>
<List listObjectID={item2ID}/>