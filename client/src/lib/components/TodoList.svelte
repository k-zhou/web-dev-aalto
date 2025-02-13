<script>
  import TodoItem from "./TodoItem.svelte";
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  let todoState = useTodoState();
</script>

<ul>
  {#each todoState.todos as todo}
    <li>
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
