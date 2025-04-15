<script>
  import "../app.css";
  let { children } = $props();
  export const prerender = true;
</script>

<div class="flex flex-col h-full">
  <header class="flex items-center bg-primary-100 p-4 mb-6">
    <h1 class="flex text-xl text-primary-900">Courses and Questions</h1>
    <nav>
      <ul class="flex space-x-4 ml-4">
        <li><a class="anchor" href="/">Home</a></li>
        <li><a class="anchor" href="/courses">Courses</a></li>
        <!-- <li><a class="anchor" href="/contact">Contact</a></li> -->
      </ul>
    </nav>
  </header>
  
  <main class="container mx-auto max-w-2xl grow">
    {@render children()}
  </main>
  
  <footer class="bg-primary-100 p-4 border-t-2 border-gray-300">
    <p class="text-center text-primary-900">Aalto Web Software Development 2025 Spring</p>
  </footer>  
</div>
