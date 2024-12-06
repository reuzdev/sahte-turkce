<script>
    let { title, content } = $props();
</script>

<div class="panel">
    <h2 class=title>{title}</h2>
    <div class="content">
        {@render content()}
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

    .content {
        font-size: 1.5rem;
        padding: 1rem 1.5rem;
    }

    .title {
        font-size: 2.25rem;
    }

    .content :global(.panel-ul) {
        list-style-position: inside;
    }

    .content :global(.panel-li) {
        margin-bottom: 0.3rem;
    }

    .content :global(.no-bullet) {
        list-style-type: none;
    }

    @media (max-width: 675px) {
        .panel {
            width: 100%;
            margin: 0 1.5rem;
        }
    }
</style>
