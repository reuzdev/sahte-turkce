<script>
    import { extendWord, generateWord } from "../SahteTurkce.svelte";
    import SavedMenuContent from "./SavedMenuContent.svelte";
</script>

<div class="bottom-bar">
    <div class="bar-element saved-menu-container">
        <button class="bar-button">Kaydedilenler</button>
        <div class="saved-menu">
            <SavedMenuContent maxItemPerPage=5/>
        </div>
    </div>
    <button class="bar-element bar-button create-new-button" onclick={() => generateWord()}>
        Yeni Oluştur
    </button>
    <button class="bar-element bar-button extend-word-button" onclick={() => extendWord()}>
        Kelimeyi Uzat
    </button>
</div>

<style>
    .bottom-bar {
        background: var(--color-bg-b);
        width: 100%;
        height: 7.875rem;
        display: flex;
        justify-content: center;
        gap: 1.5625rem;
        padding: 1.25rem;
    }

    .bar-element {
        flex: 0 0 auto;
    }

    .bar-button {
        width: 20rem;
        height: 5.3125rem;
        background: var(--color-purple);
        color: var(--color-whiteish);
        font-size: 2.5rem;
        border: 0.25rem solid var(--color-purple-border);
        border-radius: 1.125rem;
    }

    .bar-button:hover {
        background: var(--color-purple-lighter);
    }

    .bar-button:active {
        background: var(--color-purple-darker);
    }

    .saved-menu-container {
        height: calc(5.3125rem + 1.25rem + 20rem);
        width: 20rem;
        transition: transform 0.5s ease;
    }

    .saved-menu-container:hover {
        transform: translateY(calc(-100% + 5.3125rem));
    }

    .saved-menu {
        width: 100%;
        height: 20rem;
        background: var(--color-bg-b);
        border: 0.25rem solid var(--color-bg-b-border);
        margin-top: 1.25rem;
        border-radius: 1.125rem;
    }

    @media (max-width: 1280px) {
        .saved-menu-container {
            display: none;
        }

        .bar-button {
            width: 25.563rem;
        }
    }

    @media (max-width: 675px) {
        .create-new-button {
            width: inherit;
        }

        .extend-word-button {
            display: none;
        }
    }
</style>
