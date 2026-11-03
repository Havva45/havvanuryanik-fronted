import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/useEvents";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import { sortByDate } from "../utils/sort-events";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const filtered = filterByCategory(searchEvents(sortByDate(events), searchText), category);

  return (
    <PageLayout title="Tüm Etkinlikler" text="Kasım ayında kampüste düzenlenen etkinlikler.">
      <EventFilter
        searchText={searchText}
        selectedCategory={category}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <p id="sonuc" aria-live="polite">
        {filtered.length === 0
          ? "Aramanıza uygun etkinlik bulunamadı."
          : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      {filtered.length > 0 && <EventList events={filtered} />}
    </PageLayout>
  );
}

export default EventsPage;
