<script>
    import InfoLength from "./InfoLength.svelte";
    import InfoRarity from "./InfoRarity.svelte";
    import InfoVowelHarmony from "./InfoVowelHarmony.svelte";
    import SavedMenuPanel from "./SavedMenuPanel.svelte";
    import Word from "./Word.svelte";
</script>

<div class="display">
    <Word/>
    <div class="panels">
        <InfoVowelHarmony/>
        <InfoLength/>
        <InfoRarity/>
        <div class="saved-menu-container">
            <SavedMenuPanel/>
        </div>
    </div>
    <p class="footnote">
        Türkçede bulunabilecek harf kombinasyonlarına göre rastgele kelimeler oluşturur.
        Oluşturulan kelimeler daha kapsamlı sözlüklerde bulunan gerçek kelimeler olabilir.
        Tesadüfen uygunsuz ve gücendirici kelimeler oluşturulduğunda bundan geliştiriciler sorumlu değildir.
    </p>
</div>

<style>
    .display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .panels {
        display: flex;
        width: 100%;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .footnote {
        width: 64rem;
        line-height: 1.7rem;
        text-align: center;
        color: var(--color-secondary-text-c);
    }

    .saved-menu-container {
        display: none;
    }

    @media (max-width: 1280px) {
        .display {
            padding: 3rem 0;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        .panels {
            max-width: 55rem;
        }

        .footnote {
            display: none;
        }

        .saved-menu-container {
            display: block;
        }
    }

    @media (max-width: 675px) {
        .saved-menu-container {
            width: 100%;
            padding: 0 1.5rem;
        }
    }
</style>
