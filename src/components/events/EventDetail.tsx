import { Link } from "react-router";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { ROUTES } from "../../types/pages";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <div className={event.image ? "detay-kapsayici" : "detay-kapsayici tek"}>
      <div className="detay-sol">
        {event.image && (
          <figure className="afis-alani">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        {!event.image && <Kunye event={event} />}

        <h2>Açıklama</h2>
        <p className="aciklama">{event.description}</p>

        <div className="islem-butonlari">
          <Link to={ROUTES.events} className="buton">
            ← Listeye dön
          </Link>
          <Link to={ROUTES.update(event.id)} className="buton">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>

      {event.image && <Kunye event={event} />}
    </div>
  );
}

function Kunye({ event }: EventDetailProps) {
  return (
    <aside className="kunye-kart">
      <h2>Etkinlik Künyesi</h2>
      <dl className="kunye-kutusu">
        <dt>Tarih</dt>
        <dd>
          {formatDate(event.date)}, {event.time}
        </dd>
        <dt>Yer</dt>
        <dd>{event.location}</dd>
        <dt>Kategori</dt>
        <dd>{event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>{event.capacity} kişi</dd>
      </dl>
    </aside>
  );
}

export default EventDetail;
