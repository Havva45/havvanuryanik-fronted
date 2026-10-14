import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { filterByCategory, searchEvents, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let pageTitle = "Ana Sayfa";
  if (page === "events") pageTitle = "Etkinlikler";
  else if (page === "add") pageTitle = "Ekle";
  else if (page === "update") pageTitle = "Etkinlik Güncelle";
  else if (page === "detail" && selected) pageTitle = selected.title;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
  }, [pageTitle]);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  // KART BİLEŞENİ (Görsel kaldırıldı, afiş kartlarda görünmeyecek)
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori-etiket">{event.category}</p>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav>
          <a
            href="#"
            className={page === "home" ? "aktif" : ""}
            onClick={(e) => { e.preventDefault(); go("home"); }}
          >
            Ana Sayfa
          </a>
          <a
            href="#"
            className={page === "events" ? "aktif" : ""}
            onClick={(e) => { e.preventDefault(); go("events"); }}
          >
            Etkinlikler
          </a>
          <a
            href="#"
            className={page === "add" ? "aktif" : ""}
            onClick={(e) => { e.preventDefault(); go("add"); }}
          >
            Ekle
          </a>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <div>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlikler-grid">
              {upcoming.map(renderCard)}
            </section>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href="#"
                className="buton"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </div>
          </div>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <div>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Etkinlik ara</label>
                <input
                  type="search"
                  placeholder="Örn: atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div>
                <label>Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlikler-grid">
              {filteredEvents.map(renderCard)}
            </section>
          </div>
        )}

        {/* DETAY SAYFASI (Afiş Görseli Yalnızca Burada Gösterilir) */}
        {page === "detail" && (
          <div>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı.</p>
                <a
                  href="#"
                  className="buton"
                  onClick={(e) => { e.preventDefault(); go("events"); }}
                >
                  Listeye dön
                </a>
              </div>
            ) : (
              <div className="detay-kapsayici">
                {selected.image && (
                  <figure className="afis-alani">
                    <img src={selected.image} alt={selected.title} />
                  </figure>
                )}
                <div>
                  <h2>{selected.title}</h2>
                  <p className="kategori-etiket">{selected.category}</p>
                  <dl className="kunye-kutusu">
                    <dt>Tarih:</dt>
                    <dd>{formatDate(selected.date)}, {selected.time}</dd>
                    <dt>Yer:</dt>
                    <dd>{selected.location}</dd>
                    <dt>Kontenjan:</dt>
                    <dd>{selected.capacity} kişi</dd>
                  </dl>
                  <p className="aciklama">{selected.description}</p>
                  <div className="islem-butonlari">
                    <a
                      href="#"
                      className="buton"
                      onClick={(e) => { e.preventDefault(); go("update", selected.id); }}
                    >
                      Bu etkinliği güncelle
                    </a>
                    <a
                      href="#"
                      className="buton"
                      style={{ backgroundColor: "#666" }}
                      onClick={(e) => { e.preventDefault(); go("events"); }}
                    >
                      Listeye dön
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EKLE / GÜNCELLE SAYFASI */}
        {(page === "add" || page === "update") && (
          <div>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input type="text" id="title" maxLength={80} required />

              <label htmlFor="category">Kategori</label>
              <select id="category" required>
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" min={1} required />

              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" required />

              <label htmlFor="time">Saat</label>
              <input type="time" id="time" required />

              <label htmlFor="location">Konum</label>
              <input type="text" id="location" required />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} required />

              <button type="submit" className="buton" style={{ marginTop: "1rem" }}>
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Havva Nur Yanık · 2416501025 · 2026</p>
      </footer>
    </>
  );
}

export default App;