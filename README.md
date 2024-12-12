[Türkçe Görüntüle](./README_tr.md)

# Sahte Türkçe
Sahte Türkçe (en: Fake Turkish) is a web tool for generating fake words that sound Turkish.

## Used in This Project
- [Svelte](https://svelte.dev/)
- [Sorted Collections](https://grantjenks.com/docs/sortedcollections/)

## References
- [N-gram](https://en.wikipedia.org/wiki/N-gram)
- [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain)

## Building and Development
### Requirements
- NodeJS
- Python
- Sorted Collections (`pip install sortedcollections`)

### Quick Start
- `npm install` - Do only once after cloning the repository.
- `npm run model-gen` - Manually generate the model and stats.
- `npm run dev` - Run dev server with hot-reloading.
- `npm run build` - Build the project.

## How it Works
We create a model by iterating over the list of real words. This model contains information about the likelihood of letters occuring after different combinations of a specified amount of previous letters. This information is then used by the generator to find word combinations that could occur in real words.
