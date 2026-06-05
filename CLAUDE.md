# ApexFlow — Proje Rehberi (Claude Code için)

Gamified İngilizce sınav hazırlık (IELTS/TOEFL/YDS/YÖKDİL) ve başlangıç İngilizcesi
öğrenme uygulaması. Arayüz dili **Türkçe**.

## Mimari
- Vite + React 18 + lucide-react. **Tailwind YOK.**
- `vite-plugin-singlefile` ile TEK bir `dist/index.html` üretir (her şey gömülü,
  offline çalışır, file:// ve Netlify'da çalışır). Teslim edilen çıktı budur.
- **Veri koddan ayrıdır:**
  - `src/catalog.js` — tüm içerik (kelimeler, sorular, seviyeler, modül tanımları).
  - Uygulama açılışta uzak bir `content.json` çeker ve içeriği **BİRLEŞTİRİR**
    (asla silmez, id ile tekilleştirir, bozuk kayıtları sessizce eler). Yeni
    kelime/makale eklemek için KOD DEĞİŞMEZ; sadece content.json güncellenir.
- `src/lib.js` — durum + persistence (localStorage), SRS (SM-2), TTS, AI puanlama.
- `src/modules.jsx` — tüm React bileşenleri.
- `src/styles.jsx` — tema (koyu + açık).

## Kurallar
- Çıktı her zaman tek `index.html` olmalı; `npm run build` hatasız çalışmalı.
- Tarayıcı depolaması (localStorage/sessionStorage) YALNIZCA `src/lib.js` persistence
  katmanında kullanılır; bileşenlerde kullanma.
- Cevap mekaniği: tıklama değiştirilebilir → "Kontrol et" → doğru/yanlış + açıklama.
- İçerik şeması: vocab {id, lv, w, pos, tr, ex}; lv A1–C2; çoktan seçmeli `ans` 0'dan başlar.
- Kelime kartı `ex` (örnek cümle) alanını her zaman tırnak içinde gösterir → `ex` boş bırakılmamalı.
- Mobil okunur, sade biçimlendirme. Bileşen metinlerinde akıcı, sade Türkçe.

## Build & Yayın
```
npm install
npm run build      # -> dist/index.html
```
Netlify bu repoya bağlı: build komutu `npm run build`, yayın klasörü `dist`.
`main`'e her push = otomatik yayın.
