<script>
    import { onMount } from "svelte";
    import SavedMenuContent from "./SavedMenuContent.svelte";

    const DEFAULT_MAX_ITEMS = 2;
    let maxItemPerPage = $state(DEFAULT_MAX_ITEMS);

    function decideMaxItemPerPage() {
        if (window.innerWidth <= 675)
            maxItemPerPage = Number.MAX_SAFE_INTEGER;
        else
            maxItemPerPage = DEFAULT_MAX_ITEMS;
    }

    $inspect(maxItemPerPage);

    onMount(() => decideMaxItemPerPage());

    addEventListener("resize", decideMaxItemPerPage);
</script>

<div class="panel">
    <h2 class=title>Kaydedilenler</h2>
    <div class="menu">
        <SavedMenuContent {maxItemPerPage} showControls={maxItemPerPage == DEFAULT_MAX_ITEMS}/>
    </div>
</div>

<style>
    .panel {
        color: var(--color-whiteish);
        width: 25.563rem;
        height: 15.063rem;
        padding: 1.6rem;
        background: var(--color-bg-b);
        border: 0.25rem solid var(--color-bg-b-border);
        border-radius: 1.125rem;
    }

    .title {
        font-size: 2.25rem;
    }

    .menu {
        height: 100%;
        padding-bottom: 0.75rem;
    }

    @media (max-width: 675px) {
        .panel {
            width: 100%;
            height: fit-content;
            padding-bottom: 0;
        }
    }
</style>
