<script>
    let ghUserName = "reuzdev";
    let ghRepoName = "sahte-turkce";
</script>

<div class="header">
    <a class="link" href="https://www.github.com/{ghUserName}/{ghRepoName}">
        <div class="icon">
            <i class="fa-brands fa-github-alt"></i>
        </div>
        {ghUserName}/{ghRepoName}
    </a>
</div>

<style>
    .header {
        margin-left: auto;
        margin-right: auto;
        font-size: 2.25rem;
        padding: 0.75rem 1.2rem;
        background: var(--color-bg-b);
        border-radius: 0 0 1rem 1rem;
    }

    .icon {
        font-size: 2rem;
        color: var(--color-bg-b);
        background: var(--color-purple-border);
        aspect-ratio: 1 / 1;
        height: 2.75rem;
        display: grid;
        place-items: center;
        border-radius: 50%;
    }

    .link {
        color: var(--color-purple-border);
        text-decoration: none;
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }
</style>
