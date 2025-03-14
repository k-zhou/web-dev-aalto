<script>
  import Spells from "$lib/components/Spells.svelte";
  import PokemonCards from "$lib/components/PokemonCards.svelte";
  import Jokes from "$lib/components/Jokes.svelte";
  import SQLInterface from "$lib/components/SQLInterface.svelte";
</script>
<SQLInterface />
<Jokes />
<br />
<h1>Spells</h1>
<Spells />
<br />
<PokemonCards />