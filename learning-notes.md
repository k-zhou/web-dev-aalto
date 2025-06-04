# Markdown 

https://www.markdownguide.org/basic-syntax/

https://markdown.land/markdown-code-block 

# Svelte

## Sharing State

So the idea behind this is to use *JS object methods* and ... declaring a global variable AFAIK.
https://svelte.dev/docs/svelte/$state#Passing-state-across-modules

- Name file with suffix *.svelte.js*
  - https://svelte.dev/docs/svelte/svelte-js-files
- Declare state variable at top-level in the separate file
- Use the naming convention: *useFuncState()*
- Use a getter
- Export the useFuncState within curly brackets

##### Example

```javascript
let initialValue = 0;
let funcState = $state(initialValue);
const useFuncState = () => {
    return {
        get f() {
            return funcState;
        },
        // possibly
        // set b() {
        // funcState = newValue;
        // },
        foo: () => {

        },
        bar: () => {
        },
    }
}
export { useFuncState };
```
## Pages

Each new page goes under a new folder. The name of the page is written as the folder name, and inside the folder a +page.svelte then holds all the content of the page.

If a page is under a dynamic path denoted with a parameter, its parameter is written within square brackets [param] as the folder name. It also requires a +page.js file

```Javascript
// +page.js
export function load({ params }) {
  return {
    ...params,
  };
}
```
```Javascript
// +page.svelte
// As an example for a page displaying notes with the path /note/[index], the parameter is called "index" and the page would the use data.index to access it.
<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  let { data } = $props();
  let note = $state({});

  $effect(() => {
    const response = await fetch(`${PUBLIC_API_URL}/api/note/${data.index}`);
    note = await response.json();
  });
</script>

<p>Note #{data.index}</p>
{#if note.hasOwnProperty("title")}
  <p>{note.title}</p>
{:else}
  <p>No such note #{data.index}</p>
{/if}
```
If you have content that you would display over every page, move it to a file +layout.svelte

## Storing data locally

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

- All data is stored as UTF-16
- localStorage
  - getItem()
  - setItem()
  - removeItem()
- use parsers when necessary
  - parseInt()
  - JSON.parse()
  - JSON.stringify() for storing

> We also need to check whether we are running the code in a browser environment, which comes with localstorage. This can be done by checking the browser variable exported by Svelte through “$env/environment”. The browser variable is a boolean that is true when the code is running in a browser environment.

##### Example
```javascript
import { browser } from "$app/environment";
const VAR_KEY = "count";
let initialVal = 0;
if (browser && localStorage.hasOwnProperty(VAR_KEY)) {
  initialVal = localStorage.getItem(VAR_KEY);
}

let to_save = 0
localStorage.setItem(VAR_KEY, to_save);
```

## HTML Forms

- binding values
- onchange, onclick, on ...

https://developer.mozilla.org/en-US/docs/Web/API/FormData

##### Example
```html
<!-- This is a comment -->

```
```html
<!-- the "name" field is used for labeling the form field -->
<!-- the for field matches the id field -->
<!--
  Many types exist
-->
<label for="name">Question</label>
<input id="name" name="title" type="text" placeholder="Entitle your question" />
```

## Environment variables

Currently using process.env.[VARIABLE] . Svelte's documentation has mentioned this but the backend runs on Deno and Hono on top of that though. I wonder which framework it is using.

https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/

https://docs.docker.com/reference/compose-file/services/#env_file

https://docs.docker.com/compose/how-tos/use-secrets/

https://svelte.dev/tutorial/kit/env-static-private

https://docs.deno.com/runtime/reference/env_variables/