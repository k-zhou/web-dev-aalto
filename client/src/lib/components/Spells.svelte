<script>
    import { PUBLIC_HARRY_POTTER_API } from "$env/static/public";
  
    let spells = $state([]);
    const getSpells = async () => {
      const response = await fetch(`${PUBLIC_HARRY_POTTER_API}/en/spells`);
      spells = await response.json();
    };
  
</script>

<button onclick={getSpells}>Accio</button>
<ul>
{#each spells as entry}
<li>{entry.spell}</li>
{/each}
</ul>