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
- `npm install` - Repo'yu klonladıktan sonra bir kez yapın.
- `npm run model-gen` - Model ve istatistikleri oluşturun.
- `npm run dev` - Sıcak geriyüklemeli (hot-reloading) geliştirici sunucusu çalıştırın.
- `npm run build` - Projeyi derleyin.

## Nasıl Çalışır
Gerçek kelime listesindeki tüm kelimeler gezilerek bir model oluşturulur. Bu model önceki belirli sayıdaki harfin oluşturduğu kombinasyonlardan sonra gelebilecek harflerin olasılığıyla ilgili bilgi içerir. Daha sonra bu bilgi oluşturucu tarafından gerçek kelimelerde bulunabilecek harf kombinasyonları bulmak için kullanılır.
