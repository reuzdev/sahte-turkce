<script>
    import InfoPanel from "./InfoPanel.svelte";
    import { global, wordProbabilities, NGRAM_SIZE, WORD_COUNT } from "../SahteTurkce.svelte";
    import ngramTargetProbs from "../data/model.json";

    let rankSectionData = $derived(createRankSectionData(global.word));
    let rankAsRatio = $derived(findRank(calculateProbability(global.word)) / WORD_COUNT);

    function createRankSectionData(focusWord) {
        const datas = [];
        let focusProbability = calculateProbability(focusWord);
        let focusRank = findRank(focusProbability);
        const bottomIndex = focusRank - 2;
        const topIndex = bottomIndex + 1;

        datas.push({
            word: focusWord,
            rank: focusRank,
        });

        if (bottomIndex >= 0) {
            datas.unshift({
                word: wordProbabilities[bottomIndex][0],
                rank: focusRank-1,
            });
        }

        if (topIndex < WORD_COUNT) {
            datas.push({
                word: wordProbabilities[topIndex][0],
                rank: focusRank+1,
            })
        }

        return datas;
    }

    function calculateProbability(word) {
        word = Array.from({length: NGRAM_SIZE}, (_, i) => NGRAM_SIZE - 1 - i).join('') + word + ".";
        let probability = 1;

        for (let i = 0; i < word.length - NGRAM_SIZE; i++) {
            const fullNgram = word.substring(i, i+NGRAM_SIZE);
            const target = word[i+NGRAM_SIZE];

            for (let offset = 0; offset < NGRAM_SIZE; offset++) {
                const ngram = fullNgram.substring(offset);
                if (ngram in ngramTargetProbs) {
                    probability *= ngramTargetProbs[ngram][target];
                    break;
                }
            }
        }

        return probability;
    }

    function findRank(probability) {
        let bottomIdx = 0;
        let topIdx = WORD_COUNT - 1;

        while (topIdx - bottomIdx > 2) {
            let centerIdx = Math.floor((topIdx + bottomIdx) / 2);
            let centerProb = wordProbabilities[centerIdx][1];

            if (centerProb < probability)
                topIdx = centerIdx;
            else if (centerProb > probability)
                bottomIdx = centerIdx;
            else
                return centerIdx + 1;
        }

        return bottomIdx + 2;
    }
</script>

<InfoPanel title="Enderlik">
    {#snippet content()}
        <ul class="panel-ul">
            <li class="panel-li">
                En {rankAsRatio > 0.5 ? "nadir" : "yaygın"}
                %{Math.round((rankAsRatio > 0.5 ? 1 - rankAsRatio : rankAsRatio) * 1000) / 10}
            </li>
        </ul>
        <div class="divider"></div>
        <div class="rank-container">
            <ol class="panel-ol">
                {#each rankSectionData as data}
                    <li class="panel-li" value={data.rank}>{data.word}</li>
                {/each}
            </ol>
            <div class="rank-cover">
            </div>
        </div>
    {/snippet}
</InfoPanel>

<style>
    .panel-ol {
        list-style-position: inside;
    }

    .rank-container {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }

    .divider {
        margin: 0.7rem 0;
        background: var(--color-bg-b-border);
        height: 0.125rem;
        width: 100%;
    }

    .rank-cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(var(--color-bg-b), rgba(27, 25, 34, 0), var(--color-bg-b));
    }
</style>
