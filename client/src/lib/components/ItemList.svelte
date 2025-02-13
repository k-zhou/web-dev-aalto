<script>
  let items = $state([]);

  const addItem = (e) => {
    const item = Object.fromEntries(new FormData(e.target));
    // item.id = Crypto.randomUUID();
    items.push(item);
    e.target.reset();
    e.preventDefault();
  };
  const handleClickItem = (item) => {
    if (item.name.length > 3)
      item.name = item.name.substring(0, item.name.length-1);
    else
      items = items.filter(i => i.name !== item.name);
  }
</script>

<form onsubmit={addItem}>
  <label for="name">Type in the item name:</label>
  <input id="name" name="name" type="text" /><br />
  <input type="submit" value="Add" />
</form>

<p>Items:</p>

<ul>
  {#each items as item}
    <li>
      <button onclick={() => handleClickItem(item)}>{item.name}</button>
    </li>
  {/each}
</ul>

<p>The list has {items.length} item{items.length === 1 ? "" : "s"}.</p>

