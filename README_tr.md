[View in English](./README.md)

# Sahte Türkçe
Sahte Türkçe kulağa Türkçe gelen sahte kelimeler oluşturmaya yarayan bir web aracıdır.

## Projede Kullanılanlar
- [Svelte](https://svelte.dev/)
- [Sorted Collections](https://grantjenks.com/docs/sortedcollections/)

## Referanslar
- [N-gram](https://tr.wikipedia.org/wiki/N-gram)
- [Markov Zinciri](https://tr.wikipedia.org/wiki/Markov_zinciri)

## Derleme ve Geliştirme
### Gereksinimler
- NodeJS
- Python
- Sorted Collections (`pip install sortedcollections`)

### Hızlı Başlangıç
- `npm install` - Repoyu klonladıktan sonra bağımlılıkları indirmek için bir kez çalıştırın.
- `npm run model-gen` - Model ve istatistikleri oluşturun.
- `npm run dev` - Hot-reloading destekli geliştirme sunucusunu çalıştırın.
- `npm run build` - Projeyi derleyin.

## Nasıl Çalışır
Oluşturulmakta olan kelimenin son üç harflik bölümüne bakılır. Bu bölümü bulunduran gerçek Türkçe kelimelerde bu bölümden sonra gelen harflerden biri, veya kelimenin sonunu ifade eden ")" karakteri, gelme sıklıklarına göre seçilir. Seçilen karakter ")" olana dek bu işlem yinelenir.
