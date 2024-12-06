// TODO: Word.svelte style'ları düzelt lan

import ngramTargetProbs from "./data/model.json"
import stats from "./data/stats.json"

export const global = $state({
    word: "",
    savedWords: [],
});

export const VOWELS = "aeıioöuü";
export const NGRAM_SIZE = stats.ngramSize;
export const WORD_COUNT = stats.wordCount;
export const wordProbabilities = stats.wordProbabilities;

function selectTraget(ngram) {
    const targetRate = Math.random();

    for (let i = NGRAM_SIZE; i > 0; i--) {
        if (!(ngram in ngramTargetProbs))
            continue;

        let completedRate = 0;
        const candidateRates = ngramTargetProbs[ngram];
        for (const candidate in candidateRates) {
            completedRate += candidateRates[candidate];
            if (completedRate > targetRate)
                return candidate;
        }

        ngram = ngram.slice(1);
    }

    return '.';
}

export function extendWord() {
    if (global.word.length >= 120)
        return;

    const prefixedWord = Array.from({length: NGRAM_SIZE}, (_, i) => NGRAM_SIZE - 1 - i).join("") + global.word;
    let ngram = prefixedWord.slice(-3);
    const targetRate = Math.random();

    for (let i = 0; i < NGRAM_SIZE; i++) {
        const candidateRates = ngramTargetProbs[ngram];
        let totalRate = 1;
        if ("." in candidateRates) {
            const dotRate = candidateRates["."];
            if (dotRate == 1)
                continue;
            totalRate -= dotRate;
        }

        let completedRate = 0;
        for (const candidate in candidateRates) {
            if (candidate == ".")
                continue;

            completedRate += candidateRates[candidate] / totalRate;
            if (completedRate > targetRate) {
                global.word += candidate;
                return;
            }
        }
        ngram = ngram.slice(1);
    }
}

export function generateWord() {
    const prefixNgram = Array.from({length: NGRAM_SIZE}, (_, i) => NGRAM_SIZE - 1 - i).join('');
    let ngram = prefixNgram;
    let currWord = "";

    while (true) {
        let target = selectTraget(ngram);
        if (target == '.') {
            if (wordProbabilities.find(pair => pair[0] == currWord) !== undefined) {
                ngram = prefixNgram;
                currWord = "";
                continue;
            }
            else {
                global.word = currWord;
                break;
            }
        }
        currWord += target;
        ngram = ngram.slice(1) + target;
    }
}
