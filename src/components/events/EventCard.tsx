import { Link } from "react-router";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { ROUTES } from "../../types/pages";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>
        <span className="kategori-etiket">{event.category}</span>
      </p>
      <p>
        Tarih: {formatDate(event.date)}, {event.time}
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p className="kart-aciklama">{event.description}</p>
      <Link to={ROUTES.detail(event.id)} className="kart-link">
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;
