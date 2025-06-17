<!-- Users , authenticated -->
<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  let users = $state([]);
  let error = $state("");

  const fetchUsers = async () => {
    error = "";
    const response = await fetch(`${PUBLIC_API_URL}/api/users`, {
      credentials: "include",
    });

    if (!response.ok) {
      error = "You are not authorized to view the users.";
      return;
    }

    users = await response.json();
  };
// Fetches upon page load
 $effect(async () => {
  fetchUsers();
 });

</script>

<h2 class="text-xl">Notes</h2>

{#if error}
  <p class="text-xl">{error}</p>
{:else}
  <ul>
    {#each users as user}
      <li>{user}</li>
    {/each}
  </ul>
{/if}