<script>
    import { global } from "../SahteTurkce.svelte";

    let saved = $state();
    $effect(() => {
        saved = global.savedWords.includes(global.word);
    });

    function updateSave() {
        if (saved && !global.savedWords.includes(global.word)) {
            global.savedWords.push(global.word);
        }
        else if (!saved && global.savedWords.includes(global.word)) {
            global.savedWords.splice(global.savedWords.indexOf(global.word), 1);
        }
        localStorage.setItem("savedWords", JSON.stringify(global.savedWords));
    }
</script>

<div class="word-container">
    <div class="save-checkbox-container">
        <label for="save">
            <i class="fa-regular fa-star" class:hidden={saved}></i>
            <i class="fa-solid fa-star" class:hidden={!saved}></i>
        </label>
        <input class="save-checkbox" type="checkbox" name="save" id="save" bind:checked={saved} onchange={() => updateSave()}/>
    </div>
    <h1 class="word">{global.word}</h1>
</div>

<style>
    .word-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .save-checkbox-container {
        font-size: 4rem;
        color: var(--color-purple-border);
    }

    .save-checkbox-container:active {
        scale: 120%;
    }

    .save-checkbox-container > * {
        cursor: pointer;
    }

    .word {
        color: var(--color-whiteish);
        font-size: 6rem;
        height: auto;
        word-break: break-word;
    }

    .save-checkbox {
        display: none;
    }

    .hidden {
        display: none;
    }

    @media (max-width: 675px) {
        .word-container {
            gap: 0.5rem;
        }

        .word {
            font-size: 4rem;
        }

        .save-checkbox-container {
            font-size: 3rem;
        }
    }
</style>
