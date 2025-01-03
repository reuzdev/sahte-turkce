from json import dumps as to_json_str
from sortedcollections import ValueSortedDict
from sys import path

CHAR_STARTING = '('
CHAR_ENDING = ')'

CHAR_A_VARIANT = 'A'
CHAR_I_VARIANT = 'I'
CHAR_O_VARIANT = 'O'
CHAR_U_VARIANT = 'U'

VOWELS = 'aeıioöuü'
VOWELS_BACK = 'aıou'
VOWELS_FRONT = 'eiöü'

vowel_to_variant = {
    'a': CHAR_A_VARIANT,
    'e': CHAR_A_VARIANT,
    'ı': CHAR_I_VARIANT,
    'i': CHAR_I_VARIANT,
    'o': CHAR_O_VARIANT,
    'ö': CHAR_O_VARIANT,
    'u': CHAR_U_VARIANT,
    'ü': CHAR_U_VARIANT,
}

NGRAM_SIZE = 3
SCRIPTS_DIR = path[0] + '\\';
ngram_occurrences: dict[str, int] = {}                          # ngram -> occurrence count
trans_occurrences: dict[tuple[str, str], int] = {}              # (ngram, target) -> occurrence count
ngram_target_probabilities: dict[str, dict[str, float]] = {}    # ngram -> {target -> probability}
word_probabilities: dict[str, float] = ValueSortedDict()        # word -> total probability

def register_transitions(word, ngram_size):
    word = CHAR_STARTING + word + CHAR_ENDING
    last_vowel = ''

    for i in range(len(word) - ngram_size):
        ngram = word[i:i+ngram_size]
        target = word[i+ngram_size]
        contains_vowels = False

        for c in ngram:
            if c in VOWELS:
                last_vowel = c
                contains_vowels = True

        if not contains_vowels and last_vowel != '' and target in VOWELS:
            in_harmony = (last_vowel in VOWELS_BACK) == (target in VOWELS_BACK)
            if in_harmony:
                target = vowel_to_variant[target]

        transition = (ngram, target)
        if ngram not in ngram_occurrences:
            ngram_occurrences[ngram] = 1
        else:
            ngram_occurrences[ngram] += 1

        if transition not in trans_occurrences:
            trans_occurrences[transition] = 1
        else:
            trans_occurrences[transition] += 1

def calc_trans_probabilities():
    for transition, occurrences in trans_occurrences.items():
        ngram, target = transition
        probability = occurrences / ngram_occurrences[ngram]

        if ngram not in ngram_target_probabilities:
            ngram_target_probabilities[ngram] = {}
        ngram_target_probabilities[ngram][target] = probability

def calc_word_prob(word):
    padded_word = CHAR_STARTING + word + CHAR_ENDING
    probability = 1
    last_vowel = ''

    for i in range(len(padded_word) - NGRAM_SIZE):
        ngram = padded_word[i:i+NGRAM_SIZE]
        target = padded_word[i+NGRAM_SIZE]
        contains_vowel = False

        for c in ngram:
            if c in VOWELS:
                last_vowel = c
                contains_vowel = True

        if not contains_vowel and last_vowel != '' and target in VOWELS:
            in_harmony = (last_vowel in VOWELS_BACK) == (target in VOWELS_BACK)
            if in_harmony:
                target = vowel_to_variant[target]

        probability *= ngram_target_probabilities[ngram][target]

    word_probabilities[word] = probability

if __name__ == '__main__':
    f = open(f'{SCRIPTS_DIR}/../data/words.txt', 'r', encoding='utf-8')
    for line in f:
        for word in line.split():
            word = word.strip().replace('I', 'ı').lower()
            for i in range(1, NGRAM_SIZE + 1):
                register_transitions(word, i)
    calc_trans_probabilities()

    f.seek(0)
    for line in f:
        for word in line.split():
            word = word.strip().replace('I', 'ı').lower()
            if ' ' in word:
                continue
        calc_word_prob(word)
    f.close()

    f = open(f'{SCRIPTS_DIR}/../data/model.json', 'w', encoding='utf-8')
    f.write(to_json_str(ngram_target_probabilities, separators=(',',':')))
    f.close()

    f = open(f'{SCRIPTS_DIR}/../data/stats.json', 'w', encoding='utf-8')
    json_structure = {
        'ngramSize': NGRAM_SIZE,
        'wordProbabilities': word_probabilities.items()[::-1],
        'wordCount': len(word_probabilities),
    }
    f.write(to_json_str(json_structure, separators=(',',':')))
    f.close()
