![GitHub Workflow Status](https://img.shields.io/github/workflow/status/augustinbegue/character-warp-speed-js/Build?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/augustinbegue/character-warp-speed-js?style=flat-square)
![npm](https://img.shields.io/npm/v/character-warp-speed?style=flat-square)
![npm](https://img.shields.io/npm/dt/character-warp-speed?style=flat-square)

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
