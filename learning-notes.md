# Markdown 

https://www.markdownguide.org/basic-syntax/
https://markdown.land/markdown-code-block 

# Svelte

## Sharing State

- Name file with suffix *.svelte.js*
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
        foo: () => {

        },
        bar: () => {
        },
    }
}
export { useFuncState };
```

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