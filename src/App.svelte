<script lang="ts">
    import CharacterWarpSpeed from "character-warp-speed";
    import { onMount } from "svelte";

    onMount(() => {
        let el = document.getElementById("characterWarpSpeed");
        let cws = new CharacterWarpSpeed(el, [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
        ]);
    });
</script>

<main>
    <h1>✨ Character Warp Speed ✨</h1>

    <section>
        <div id="characterWarpSpeed" />
    </section>
</main>

<style>
    section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #characterWarpSpeed {
        width: 90vw;
        height: 90vh;
        overflow: hidden;
    }

    main {
        text-align: center;
        margin: 0;
        overflow: hidden;
    }

    h1 {
        color: rgb(37, 37, 37);
        text-transform: uppercase;
        font-size: 3em;
        font-weight: 700;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
