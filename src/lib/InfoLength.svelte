<script>
    import InfoPanel from "./InfoPanel.svelte";
    import { global } from "../SahteTurkce.svelte";

    const VOWELS = "aeıioöuü";

    let length = $derived(global.word.length);
    let vowelCount = $derived(countVowels(global.word));
    let constantCount = $derived(countConsts(global.word));
    let vowelDensity = $derived(Math.round(vowelCount / length * 100));

    function countVowels(word) {
        let result = 0;
        for (const c of word) {
            if (VOWELS.includes(c))
                result++;
        }
        return result;
    }

    function countConsts(word) {
        let result = 0;
        for (const c of word) {
            if (!VOWELS.includes(c))
                result++;
        }
        return result;
    }
</script>

<InfoPanel title="Uzunluk">
    {#snippet content()}
        <ul class="panel-ul">
            <li class="panel-li">Harf Sayısı: {length}</li>
            <li class="panel-li">Sessiz Harf Sayısı: {constantCount}</li>
            <li class="panel-li">Hece Sayısı: {vowelCount}</li>
            <li class="panel-li">Hece/Harf Oranı: %{vowelDensity}</li>
        </ul>
    {/snippet}
</InfoPanel>
