import ngramTargetProbs from "./data/model.json"
import stats from "./data/stats.json"

export const global = $state({
    rawWord: "",
    word: "",
    savedWords: [],
});

export const CHAR_A_VARIANT = "A";
export const CHAR_I_VARIANT = "I";
export const CHAR_O_VARIANT = "O";
export const CHAR_U_VARIANT = "U";
export const CHAR_BEGINNING = "(";
export const CHAR_ENDING = ")";

export const VOWELS = "aeıioöuü";
export const VOWELS_BACK = "aıou";
export const VOWELS_FRONT = "eiöü";

export const NGRAM_SIZE = stats.ngramSize;
export const WORD_COUNT = stats.wordCount;
export const wordProbabilities = stats.wordProbabilities;

const variantToVowels = new Map([
    [CHAR_A_VARIANT, "ae"],
    [CHAR_I_VARIANT, "ıi"],
    [CHAR_O_VARIANT, "oö"],
    [CHAR_U_VARIANT, "uü"],
]);

function finalizeTarget(lastVowel, rawTarget) {
    if (!variantToVowels.has(rawTarget))
        return rawTarget;
    const candidates = variantToVowels.get(rawTarget);
    return VOWELS_BACK.includes(lastVowel) ? candidates[0] : candidates[1];

}

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

    return CHAR_ENDING;
}

export function extendWord() {
    if (global.word.length >= 120)
        return;

    const ngram = (CHAR_BEGINNING + global.word).slice(-NGRAM_SIZE);
    const targetRate = Math.random();
    let lastVowel = VOWELS[Math.floor(Math.random() * VOWELS.length)]

    for (let i = global.word.length - 1; i >= 0; i--) {
        if (VOWELS.includes(global.word[i])) {
            lastVowel = global.word[i];
            break;
        }
    }

    for (let i = 0; i < Math.min(NGRAM_SIZE, ngram.length); i++) {
        const candidateRates = ngramTargetProbs[ngram];
        let totalRate = 1;
        if (CHAR_ENDING in candidateRates) {
            const endRate = candidateRates[CHAR_ENDING];
            if (endRate == 1)
                continue;
            totalRate -= endRate;
        }

        let completedRate = 0;
        for (const candidate in candidateRates) {
            if (candidate == CHAR_ENDING)
                continue;

            completedRate += candidateRates[candidate] / totalRate;
            if (completedRate > targetRate) {
                const rawTarget = candidate;
                const target = finalizeTarget(lastVowel, rawTarget);
                global.word += target;
                global.rawWord += rawTarget;
                return;
            }
        }
    }
}

export function generateWord() {
    let word = CHAR_BEGINNING;
    let rawWord = word;
    let lastVowel = VOWELS[Math.floor(Math.random() * VOWELS.length)];

    while (true) {
        const ngram = word.slice(-NGRAM_SIZE);
        let rawTarget = selectTraget(ngram);
        let target = finalizeTarget(lastVowel, rawTarget);

        if (rawTarget == CHAR_ENDING) {
            if (wordProbabilities.find(wordData => wordData[0] == word.slice(1)) !== undefined) {
                word = CHAR_BEGINNING;
                rawWord = word;
                continue;
            }
            else {
                global.word = word.slice(1);
                global.rawWord = rawWord.slice(1);
                break;
            }
        }

        if (VOWELS.includes(target))
            lastVowel = target;
        word += target;
        rawWord += rawTarget;
    }
}
