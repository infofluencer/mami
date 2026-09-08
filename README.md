# Mami & Betül — Nişan Davetiyesi

Lüks, animasyonlu dijital nişan davetiyesi. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Başlatma

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Yapılandırma

Tüm düzenlenebilir içerik **`invitation.config.ts`** dosyasında:

| Alan | Açıklama |
|------|----------|
| `couple` | İsimler, monogram |
| `event` | Tarih gösterimi + ISO geri sayım tarihi |
| `texts` | Tüm Türkçe metinler |
| `venue` | Mekan, adres, harita linkleri |
| `schedule` | Etkinlik akışı |
| `assets` | Görsel, video ve müzik yolları |
| `rsvp.endpoint` | LCV API URL (boş = `console.log`) |

## Değiştirilecek varlıklar

| Dosya | Kullanım | Öneri |
|-------|----------|-------|
| `public/baslangic.mp4` | Açılış videosu (`assets.introVideo`) | 720×1280, ~5s |
| `public/envelope-poster.jpg` | Video poster (`assets.introPoster`) | Frame 0 |
| `public/couple.jpg` | Kapanış çift fotoğrafı (`assets.couple` / `couplePhoto`) | 860×1120px |
| `public/floral-*.webp` | Köşe / alt çiçek overlay’leri | Transparent |
| `public/assets/hero-bg.svg` → `.jpg` | Hero arka planı (bahçe/kemer) | 860×1400px, dikey |
| `public/assets/swan-lake.svg` → `.jpg` | Hero altı kuğu/göl | 800×600px |
| `public/assets/venue.svg` → `.png` | Mekan çizimi/fotoğrafı | 600×600px |
| `public/assets/couple.svg` → `.jpg` | Kapanış çift fotoğrafı | 860×1120px |
| `public/assets/music.mp3` | Arka plan müziği | Kısa döngü, ~2–4 MB |

Dosya yolunu değiştirirseniz `invitation.config.ts` → `assets` bölümünü güncelleyin.

## Bileşenler

```
src/components/invitation/
├── Invitation.tsx            # Kaydırılabilir davetiye (zarf sonrası içerik)
├── InvitationExperience.tsx  # Zarf overlay + Invitation orchestrator
├── Envelope.tsx              # Kapalı zarf + glow açılış
├── Hero.tsx … Closing.tsx    # Bölümler (1–8)
├── MusicToggle.tsx           # Sağ alt play/pause
├── TornPaperCard.tsx         # Yırtık kağıt kart
├── FloralCorner.tsx          # Köşe çiçek motifleri
├── GoldDivider.tsx           # Altın süs ayırıcı
├── WaxSeal.tsx               # Mum mühür (LCV)
└── SectionReveal.tsx         # whileInView animasyon
```

`<Invitation />` tek başına da kullanılabilir (ör. zarf olmadan önizleme).

## RSVP

`rsvp.endpoint` alanına POST URL yazın. Gönderilen JSON:

```json
{
  "name": "Ad Soyad",
  "attending": true,
  "guestCount": 2
}
```

Endpoint boşsa form konsola yazılır.

## Özellikler

- Mobil öncelikli, max genişlik ~430px, krem zemin (`#F3EDDB`)
- Kaydırınca fade/slide (`prefers-reduced-motion` destekli)
- Canlı geri sayım, LCV modal, harita iframe
- İlk dokunuştan sonra müzik autoplay + play/pause

## Build

```bash
npm run build
npm start
```
