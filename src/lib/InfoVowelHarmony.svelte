<script>
    import { global, VOWELS, VOWELS_BACK, VOWELS_FRONT } from "../SahteTurkce.svelte";
    import InfoPanel from "./InfoPanel.svelte";

    const VOWELS_UNROUNDED = "aeıi";
    const VOWELS_ROUNDED = "oöuü";
    const VOWELS_CAN_FOLLOW_ROUNDED = "aeuü";

    let hasPalatalHarmony = $derived(checkPalatalHarmony(global.word));
    let palatalHarmonyNotation = $derived(generatePalatalHarmonyNotation(global.word));
    let hasLabialHarmony = $derived(checkLabialHarmony(global.word));
    let labialHarmonyNotation = $derived(generateLabialHarmonyNotation(global.word));

    function checkPalatalHarmony(word) {
        let foundBackVowel = false;
        let foundFrontVowel = false;

        for (const c of word) {
            if (VOWELS_BACK.includes(c))
                foundBackVowel = true;
            if (VOWELS_FRONT.includes(c))
                foundFrontVowel = true;
        }

        return foundBackVowel != foundFrontVowel;
    }

    function generatePalatalHarmonyNotation(word) {
        let backVowels = "";
        let frontVowels = "";

        for (const c of word) {
            if (VOWELS_BACK.includes(c) && !backVowels.includes(c))
                backVowels += c;
            if (VOWELS_FRONT.includes(c) && !frontVowels.includes(c))
                frontVowels += c;
        }

        return backVowels + (backVowels.length * frontVowels.length ? "/" : "") + frontVowels;
    }

    function checkLabialHarmony(word) {
        let lastVowel;
        let started = false;

        for (const c of word) {
            if (!VOWELS.includes(c))
                continue;
            if (!started) {
                lastVowel = c;
                started = true;
                continue;
            }

            const isIllegal = (VOWELS_UNROUNDED.includes(lastVowel) && !VOWELS_UNROUNDED.includes(c))
                           || (VOWELS_ROUNDED.includes(lastVowel) && !VOWELS_CAN_FOLLOW_ROUNDED.includes(c))
            if (isIllegal)
                return false;

            lastVowel = c;
        }

        return true;
    }

    function generateLabialHarmonyNotation(word) {
        let notation = ""
        let lastVowel;
        let started = false;

        for (const c of word) {
            if (!VOWELS.includes(c))
                continue;
            if (started == false) {
                lastVowel = c;
                started = true;
                notation += c;
                continue;
            }
            const isIllegal = (VOWELS_UNROUNDED.includes(lastVowel) && !VOWELS_UNROUNDED.includes(c))
                           || (VOWELS_ROUNDED.includes(lastVowel) && !VOWELS_CAN_FOLLOW_ROUNDED.includes(c));
            if (isIllegal)
                notation += "/";
            notation += c;

            lastVowel = c;
        }

        return notation;
    }
</script>

<InfoPanel title="Ünlü Uyumu">
    {#snippet content()}
        <ul class="panel-ul">
            <li class="panel-li">
                Büyük Ünlü Uyumu:
                <i class="icon fa-solid fa-xmark" class:hidden={hasPalatalHarmony}></i>
                <i class="icon fa-solid fa-check" class:hidden={!hasPalatalHarmony}></i>
            </li>
            <li class="panel-li no-bullet">
                <div class="divider-with-info">
                    <div class="divider"></div>
                    <p>{palatalHarmonyNotation}</p>
                    <div class="divider"></div>
                </div>
            </li>
            <li class="panel-li">
                Küçük Ünlü Uyumu:
                <i class="icon fa-solid fa-xmark" class:hidden={hasLabialHarmony}></i>
                <i class="icon fa-solid fa-check" class:hidden={!hasLabialHarmony}></i>
            </li>
            <li class="panel-li no-bullet">
                <div class="divider-with-info">
                    <div class="divider"></div>
                    <p>{labialHarmonyNotation}</p>
                    <div class="divider"></div>
                </div>
            </li>
        </ul>
    {/snippet}
</InfoPanel>

<style>
    .no-bullet {
        width: 100%;
    }

    .divider-with-info {
        color: var(--color-secondary-text-a);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .divider {
        flex: 1;
        width: 100%;
        height: 0.125rem;
        background: var(--color-bg-b-border);
    }

    .hidden {
        display: none;
    }

    .fa-xmark {
        color: var(--color-red);
    }

    .fa-check {
        color: var(--color-green);
    }

    .icon {
        font-size: 1.25rem;
        margin-left: 0.25rem;
    }
</style>
