import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  if (events.length === 0) {
    return <p className="bos-mesaj">{emptyText}</p>;
  }

  return (
    <section className="etkinlikler-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
