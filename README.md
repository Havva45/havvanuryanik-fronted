# Kampüs Etkinlikleri

Fakültedeki seminer, atölye, söyleşi ve yarışmaları tek yerden takip etmek için React + TypeScript + Vite ile geliştirilmiş bir uygulama.

**Canlı adres:** [https://havvanuryanik-frontend.vercel.app](https://havvanuryanikfronted.vercel.app)
## Özellikler

- React Router ile 10 sayfa (route)
- Context API (`EventProvider` + `useEvents`) ile tüm sayfalar aynı etkinlik verisini kullanır; veriler `localStorage`'da saklanır
- Etkinlik ekleme, güncelleme ve silme; silmeden önce onay sorulur. Değişiklikler ana sayfa, liste ve detay sayfasında hemen görünür
- Başlık/açıklamada arama ve kategoriye göre filtreleme
- Form doğrulama: etkinlik formu, giriş, kayıt ve şifremi unuttum
- Mobil uyumlu tasarım

## Sayfalar

| Yol | Sayfa |
| --- | --- |
| `/` | Ana sayfa (yaklaşan 2 etkinlik) |
| `/etkinlikler` | Tüm etkinlikler, arama ve filtre |
| `/etkinlikler/:id` | Etkinlik detayı |
| `/yonetim` | Etkinlik yönetimi (düzenle / sil) |
| `/yonetim/ekle` | Etkinlik ekle |
| `/yonetim/guncelle/:id` | Etkinlik güncelle |
| `/giris` | Giriş yap |
| `/kayit` | Kayıt ol |
| `/sifremi-unuttum` | Şifremi unuttum |
| `*` | 404 sayfası |

## Klasör yapısı

```
src/
  components/
    events/   EventCard, EventList, EventFilter, EventDetail
    forms/    EventForm, FormField
    layout/   Header, Navigation, Footer, PageLayout, NotFoundBox
  context/    event-context, EventProvider, useEvents
  data/       başlangıç etkinlikleri
  pages/      10 sayfa bileşeni
  types/      tipler ve route yolları
  utils/      arama/filtre, sıralama, tarih biçimi, doğrulama
```

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi
```

`vercel.json`, sayfa yenilendiğinde de route'ların çalışması için tüm istekleri `index.html`'e yönlendirir.
