# ✨ Character Warp Speed ✨

This is an unfinished project I made following a dumb idea I had.

This piece of code:

```html
<body style="overflow: hidden;">
    <div id="characterWarp" style="width: 100vw; height: 100vh;"></div>
</body>
```

```js
import { CharacterWarpSpeed } from "character-warp-speed";

let el = document.getElementById("characterWarp");
new CharacterWarpSpeed(el, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
```

produces:

![](example.gif)

## Installation

```bash
npm install character-warp-speed
```
