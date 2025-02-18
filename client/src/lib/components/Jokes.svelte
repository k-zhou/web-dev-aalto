<script>
    import * as jokeApi from "$lib/apis/joke-api.js";
    let joke = $state({});
    const loadJoke = () => {
        joke = jokeApi.getJoke();
    };
</script>

<h1>Jokes</h1>
<button onclick={loadJoke}>Load joke</button>
{#await joke}
<p>Loading a joke...</p>
{:then joke}
<p>{joke.setup}</p>
<p>{joke.punchline}</p>
{/await}