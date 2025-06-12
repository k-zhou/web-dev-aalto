<!-- Notes, authenticated -->
<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import { useNoteState } from "$lib/states/noteState.svelte";

  let error = $state("");
  let text  = $state("");
  const noteState = useNoteState();

  // Fetches all the user's notes
  const fetchNotes = async () => {
    error = "";
    const response = await noteState.fetch({credentials: "include"});
    // console.log("notes page", response);
    if (!response.ok) {
      error = "You are not authorized to view notes.";
      return;
    }
  };

  // Handles the user creating a new note with the form.
  const addNote = async (e) => {
    let fd = new FormData(e.target);
    const newNote = Object.fromEntries(fd);
    await noteState.add(newNote, {credentials: "include"});

    e.target.reset();
    e.preventDefault();
  };

  // Fetches all notes upon page load
 $effect(async () => {
  fetchNotes();
 });

</script>

<h2 class="text-xl">Notes</h2>

{#if error}
  <p class="text-xl">{error}</p>
{:else}
  <p>Welcome to the notes page.</p>
  <hr>
  <ul>
    {#each noteState.notes as note}
      <li><a href="/notes/{note.id}">{note.text}</a></li>
    {/each}
    <!-- <li>Length {noteState.notes.length}</li> -->
    <li class="flex items-center">
    </li>
  </ul>
  <hr>
  <form onsubmit={addNote} class="space-y-2">
    <label for="name" class="h3">Add a new note</label>
    <br />
    <input id="name" name="text" type="text" placeholder="Note text" bind:value={text} class="w-full dark:text-black"/>
    <br />
    <input type="submit" value="Add note" class="btn preset-filled-secondary-500 w-full"/>
  </form>
  <hr>
{/if}