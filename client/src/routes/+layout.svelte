<script>
  import { useUserState } from "$lib/states/userState.svelte.js";
  import "../app.css";

  let { children, data } = $props();

  const userState = useUserState();
  if (data.user) {
    userState.user = data.user;
  }
</script>

<div class="flex flex-col h-full">
  <header class="flex items-center bg-primary-100 p-4 mb-6">
    <h1 class="flex text-xl text-primary-900">Courses and Questions</h1>
    <nav class="flex">
      <ul class="flex space-x-4 ml-4">
        <li><a class="anchor" href="/">Home</a></li>
        <li><a class="anchor" href="/courses">Courses</a></li>
        <!-- <li><a class="anchor" href="/contact">Contact</a></li> -->
        <li> | </li>
        <li><a class="anchor" href="/notes">Notes</a></li>
      </ul>
      <ul class="flex space-x-4 ml-4">
        <li> | </li>
        <li><a class="anchor" href="/auth/login">Login</a></li>
        <li><a class="anchor" href="/auth/register">Register</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="container mx-auto max-w-2xl grow space-y-2">
    {#if data.user?.id}
      <span class="flex flex-col space-y-2 bg-gray-700 rounded-[0.5vw] p-2">
        <p>Hello {data.user?.id}!</p>
      </span>
    {/if}
    {@render children()}
  </main>
  
  <footer class="bg-primary-100 p-4 border-t-2 border-gray-300">
    <p class="text-center text-primary-900">Aalto Web Software Development 2025 Spring</p>
  </footer>  
</div>
