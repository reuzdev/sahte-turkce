import ngramTargetProbs from "./data/model.json"
import stats from "./data/stats.json"

export const global = $state({
    word: "",
    savedWords: [],
});

export const START_CHAR = "("
export const END_CHAR = ")"
export const VOWELS = "aeıioöuü";
export const NGRAM_SIZE = stats.ngramSize;
export const WORD_COUNT = stats.wordCount;
export const wordProbabilities = stats.wordProbabilities;

function selectTraget(ngram) {
    const targetRate = Math.random();

    while (ngram.length) {
        if (!(ngram in ngramTargetProbs)) {
            ngram.slice(1);
            continue;
        }

        let completedRate = 0;
        const candidateRates = ngramTargetProbs[ngram];
        for (const candidate in candidateRates) {
            completedRate += candidateRates[candidate];
            if (completedRate > targetRate)
                return candidate;
        }
    }

    return END_CHAR;
}

export function extendWord() {
    if (global.word.length >= 120)
        return;

    const word = (START_CHAR + global.word).slice(-NGRAM_SIZE);
    const ngram = word.slice(-NGRAM_SIZE);
    const targetRate = Math.random();

    for (let i = 0; i < Math.min(NGRAM_SIZE, word.length); i++) {
        const candidateRates = ngramTargetProbs[ngram];
        let totalRate = 1;
        if (END_CHAR in candidateRates) {
            const endRate = candidateRates[END_CHAR];
            if (endRate == 1)
                continue;
            totalRate -= endRate;
        }

        let completedRate = 0;
        for (const candidate in candidateRates) {
            if (candidate == END_CHAR)
                continue;

            completedRate += candidateRates[candidate] / totalRate;
            if (completedRate > targetRate) {
                global.word += candidate;
                return;
            }
        }
    }
}

export function generateWord() {
    let word = START_CHAR;

    while (true) {
        const ngram = word.slice(-NGRAM_SIZE);
        const target = selectTraget(ngram);

        if (target == END_CHAR) {
            if (wordProbabilities.find(wordData => wordData[0] == word.slice(1)) !== undefined) {
                word = START_CHAR;
                continue;
            }
            else {
                global.word = word.slice(1);
                break;
            }
        }

        word += target;
    }
}

export function generateWordOLD() {
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
