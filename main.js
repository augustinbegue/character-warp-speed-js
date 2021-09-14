import { CharacterWarp } from "./character-warp-speed.js";

window.onload = () => {
    let el = document.getElementById("characterWarp");

    if (el) {
        new CharacterWarp(el, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    }
};