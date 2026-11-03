import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/useEvents";
import { sortByDate } from "../utils/sort-events";
import { ROUTES } from "../types/pages";

function HomePage() {
  const { events } = useEvents();
  const upcoming = sortByDate(events).slice(0, 2);

  return (
    <PageLayout
      title="Kampüs Etkinlikleri"
      text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
    >
      <h2>Yaklaşan {upcoming.length} Etkinlik</h2>
      <EventList events={upcoming} emptyText="Henüz etkinlik eklenmedi." />
      <p className="alt-aksiyon">
        <Link to={ROUTES.events} className="buton">
          Tüm etkinlikleri gör
        </Link>
      </p>
    </PageLayout>
  );
}

export default HomePage;
