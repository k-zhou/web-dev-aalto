<script>
  let count = $state(0);
</script>

<h1>Count: {count}</h1>
{#if count === 1}
Click, clickiti click click click.
{:else if count === 5}
I know I'll get tired of these clicking exercises.
{/if}
<button onclick={() => count += 1}>Increment</button>
<button onclick={() => count -= 1}>Decrement</button>
<button onclick={() => count = 0}>Reset</button>
