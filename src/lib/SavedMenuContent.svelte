<script>
    import { onMount } from "svelte";
    import { global } from "../SahteTurkce.svelte";

    onMount(() => {
        global.savedWords = JSON.parse(localStorage.getItem("savedWords"));
        global.savedWords = global.savedWords === null ? [] : global.savedWords;
    });

    let { maxItemPerPage, showControls = true } = $props();

    let pageCount = $derived(Math.ceil(global.savedWords.length / maxItemPerPage));
    let currentPage = $state(0);

    function itemCountInCurrPage() {
        return Math.min(maxItemPerPage, global.savedWords.length - currentPage * maxItemPerPage);
    }

    function getItem(inPageIdx) {
        return global.savedWords[currentPage * maxItemPerPage + inPageIdx];
    }

    function updateCurrentPage(targetPage) {
        currentPage = Math.max(0, Math.min(targetPage, pageCount - 1));
    }
</script>

<div class="saved-menu">
    {#if !itemCountInCurrPage()}
        <p class="placeholder-note">Kaydettiğiniz kelimeler burada gözükecek</p>
    {/if}
    <ul class="menu-ul">
        {#each {length: itemCountInCurrPage()} as _, inPageIdx}
            <li class="menu-li">
                <button class="li-button" onclick={() => {global.word = getItem(inPageIdx)}}>
                    {getItem(inPageIdx)}
                </button>
            </li>
        {/each}
    </ul>
    <div class="menu-controls" class:hidden={!showControls}>
        <button class="control-button" onclick={() => updateCurrentPage(currentPage-1)}>{"<"}</button>
        <p class="controls-info">{Math.min(currentPage+1, pageCount)}/{pageCount}</p>
        <button class="control-button" onclick={() => updateCurrentPage(currentPage+1)}>{">"}</button>
    </div>
</div>

<style>
    .saved-menu {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
    }

    .menu-ul {
        text-decoration: underline;
        list-style: none;
        font-size: 1.5rem;
        height: fit-content;
    }

    .menu-li {
        margin-bottom: 1rem;
    }

    .li-button {
        width: 100%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: none;
        outline: none;
        border: none;
        color: var(--color-secondary-text-b);
        text-decoration: underline;
        cursor: pointer;
    }

    .menu-controls {
        display: flex;
        justify-content: center;
        place-items: center;
        gap: 1rem;
        color: var(--color-whiteish);
    }

    .control-button {
        border: 0.25rem solid var(--color-purple-border);
        border-radius: 1.125rem;
        height: 100%;
        background: var(--color-purple);
        color: var(--color-whiteish);
        cursor: pointer;
        text-align: center;
    }

    .control-button:hover {
        background: var(--color-purple-lighter);
    }

    .control-button:active {
        background: var(--color-purple-darker);
    }

    .hidden {
        display: none;
    }

    .placeholder-note {
        color: var(--color-secondary-text-b);
        line-height: 1.5rem;
    }
</style>
