from json import dumps as to_json_str
from random import random
from sortedcollections import ValueSortedDict
from sys import path
from hashlib import sha256

NGRAM_SIZE = 3
SCRIPTS_DIR = path[0] + '\\';
ngram_occurrences: dict[str, int] = {}                          # ngram -> occurrence count
trans_occurrences: dict[tuple[str, str], int] = {}              # (ngram, target) -> occurrence count
ngram_target_probabilities: dict[str, dict[str, float]] = {}    # ngram -> {target -> probability}
word_probabilities: dict[str, float] = ValueSortedDict()        # word -> total probability

def register_transitions(word, ngram_size):
    word = ''.join([str(i - 1) for i in range(ngram_size, 0, -1)]) + word + '.'
    for i in range(len(word) - ngram_size):
        ngram = word[i:i+ngram_size]
        target = word[i+ngram_size]
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
    padded_word = ''.join([str(i - 1) for i in range(NGRAM_SIZE, 0, -1)]) + word + '.'
    probability = 1
    for i in range(len(padded_word) - NGRAM_SIZE):
        full_ngram = padded_word[i:i+NGRAM_SIZE]
        target = padded_word[i+NGRAM_SIZE]

        for off in range(NGRAM_SIZE):
            ngram = full_ngram[off:]
            if ngram in ngram_target_probabilities:
                probability *= ngram_target_probabilities[ngram][target]
                break
    word_probabilities[word] = probability

def select_target(full_ngram):
    select = random()
    completed_rate = 0

    for i in range(NGRAM_SIZE, 0, -1):
        ngram = full_ngram[-i:]
        if ngram not in ngram_target_probabilities:
            continue
        space = ngram_target_probabilities[ngram]

        for target, probability in space.items():
            if completed_rate + probability > select:
                return target
            completed_rate += probability

    return '.'

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
