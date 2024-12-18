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
- `npm install` - Run once after cloning the repo to install dependencies.
- `npm run model-gen` - Manually generate the model and stats.
- `npm run dev` - Start the development server with hot-reloading enabled.
- `npm run build` - Build the project.

## How it Works
The last three letters of the word being generated are examined. Based on real Turkish words containing this sequence, one of the letters that follow this sequence, or the ')' character indicating the end of the word, is selected according to their frequencies. This process is repeated until the selected character is ')'.
