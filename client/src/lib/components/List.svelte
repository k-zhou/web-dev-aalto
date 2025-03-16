<script>
    import ListItem from "./ListItem.svelte";
    import { useElementsContainerState } from "$lib/states/elementsContainerState.svelte.js";
    import { useEditModeState } from "$lib/states/editModeState.svelte.js";
    import { derived } from "svelte/store";
    
    const ALL_SUB_ELEMENT_TYPES = ["number", "checkbox"];
    const ALL_SUB_ELEMENT_TYPES_DEFAULT_LABELS = { "number": "Numerical counter", "checkbox": "Checkbox"};

    const elementsContainerState = useElementsContainerState();
    const editModeState = useEditModeState();
    let   lastClickedAddElementState = $state("closed");
    // $derived.by(() => {
    //   if (!editModeState.mode) "none";
    //   console.log("derived"); $inspect(editModeState.mode);
    // });

    const { listObjectID } = $props();
    const listobject = elementsContainerState.get(listObjectID);

    const promptChangeListName = () => {
      const i = prompt("Enter a new title:", listobject.name);
      listobject.name = i ? i : listobject.name;
    };
    const promptRemoveThis = () => {
      confirm(`Remove element [${listobject.name}]? (not implemented)`)
    };
    const handleClickAddElement = (clickedtype) => {
      lastClickedAddElementState = clickedtype;
      if (ALL_SUB_ELEMENT_TYPES.find((e) => e === clickedtype)) {
        // console.log("found", clickedtype);
        const newElement = {"label": ALL_SUB_ELEMENT_TYPES_DEFAULT_LABELS[clickedtype], "n": listobject.n, "type": clickedtype, "numvalue": 0, "checked": false};
        listobject.n++;
        elementsContainerState.add_sub(listObjectID, newElement);
      } // else console.log("not found", clickedtype);
    };

    // $effect(async () => await questionState.fetch());
</script>

<div>
  <h2>
    <!-- Title of this bigger element -->
    {listobject.name}
    <!-- Handles showing the editing options -->
    {#if editModeState.mode}
      <button onclick={promptChangeListName}>Change list name</button>
      <!-- Shows the list of possible sub-elements to add, or the button to open the menu to add new sub-elements -->
      <div>
        {#if lastClickedAddElementState === "closed"}
          <button onclick={() => handleClickAddElement("open")}>Add sub-element</button>
        {:else}

          <!-- 
          This disabled section uses the logic that whichever option was 
          clicked previously gets shifted to the front of the shown list. 
          The downside of this is the user needs to shift their cursor after 
          every single click, making the process actually more frustrating than 
          the intended convenience it had been planned to bring. 
          -->
          <!-- 
          {#if lastClickedAddElementState !== "open"}
            <button onclick={() => handleClickAddElement(lastClickedAddElementState)}>{lastClickedAddElementState}</button>
          {/if}
          {#each ALL_SUB_ELEMENT_TYPES as type}
            {#if type !== lastClickedAddElementState}
              <button onclick={() => handleClickAddElement(type)}>{type}</button>
            {/if}
          {/each} 
          -->

          <button onclick={() => handleClickAddElement("closed")}>Close menu</button>
          {#each ALL_SUB_ELEMENT_TYPES as type}
            <button onclick={() => handleClickAddElement(type)}>{type}</button>
          {/each} 
        {/if}
      </div>
      <button onclick={promptRemoveThis}>Remove this element</button>
    {/if}
  </h2>
  <!-- Shows the contents of this bigger element -->
  <ul>
  {#each listobject.list as itemcontents}
    <li>
      <ListItem {itemcontents} />
    </li>
  {/each}
  </ul>
</div>