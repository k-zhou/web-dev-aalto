<script>
  import TodoForm from "$lib/components/TodoForm.svelte";
  import TodoList from "$lib/components/TodoList.svelte";

  let todos = $state([]);

  const addTodo = (e) => {
    const todo = Object.fromEntries(new FormData(e.target));
    todo.id = crypto.randomUUID();
    todos.push(todo);
    e.target.reset();
    e.preventDefault();
  };

  const removeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
  };
</script>

<h1>Todos</h1>

<h2>Add Todo</h2>

<TodoForm {addTodo} />

<h2>Existing todos</h2>

<TodoList {todos} {removeTodo} />