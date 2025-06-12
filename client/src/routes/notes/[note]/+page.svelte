<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import { useNoteState } from "$lib/states/noteState.svelte";
  let { data } = $props();
  let note = $state({});
  let error = $state("");
  const noteState = useNoteState();

  const fetchNote = async () => {

    const response = await noteState.getOne(data.note, {credentials: "include"}); 
    if (!response.ok) {
      error = "Failed to fetch note.";
      return;
    }
    note = await response.json();
  };

  $effect(() => {
    fetchNote();
  });
</script>

<p>Viewing note with identifier {data.note}</p>

{#if error && error.length > 0}
  <p class="text-xl">${error}</p>
{/if}
<hr>
<p>{note.text}</p>
<hr>