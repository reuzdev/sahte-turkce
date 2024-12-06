<script>
    import { onMount } from "svelte";
    import BottomBar from "./lib/BottomBar.svelte";
    import Display from "./lib/Display.svelte";
    import Header from "./lib/Header.svelte";
    import { generateWord } from "./SahteTurkce.svelte";

    onMount(() => {
        generateWord();
    });
</script>

<div class="main-container">
    <Header/>
    <Display/>
    <BottomBar/>
</div>

<style>
    .main-container {
        background: var(--color-bg-a);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }
</style>
