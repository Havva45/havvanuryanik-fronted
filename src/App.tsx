import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import { filterByCategory, searchEvents, findEventById } from "./utils/filter-events";
import type { PageName } from "./types/pages";

// Layout Bileşenleri
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

// Etkinlik Bileşenleri
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";

// Form Bileşeni
import EventForm from "./components/forms/EventForm";

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

  return (
    <>
      {/* Header ve Navigation mor üst banner içine alındı */}
      <header className="ust-banner">
        <Header
          title="Kampüs Etkinlikleri"
          text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
        />
        <Navigation current={page} onNavigate={(next) => go(next)} />
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <div>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
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
            <EventFilter
              searchText={searchText}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <EventList
              events={filteredEvents}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Etkinlik bulunamadı."
            />
          </div>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <div>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı.</p>
                <a
                  href="#"
                  className="buton"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  Listeye dön
                </a>
              </div>
            ) : (
              <EventDetail
                event={selected}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </div>
        )}

        {/* EKLE / GÜNCELLE SAYFASI */}
        {(page === "add" || page === "update") && (
          <EventForm
            page={page}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;