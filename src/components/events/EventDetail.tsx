import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div className="detay-kapsayici">
      {event.image && (
        <figure className="afis-alani">
          <img src={event.image} alt={event.title} />
        </figure>
      )}
      <div>
        <h2>{event.title}</h2>
        <p className="kategori-etiket">{event.category}</p>
        <dl className="kunye-kutusu">
          <dt>Tarih:</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>Yer:</dt>
          <dd>{event.location}</dd>
          <dt>Kontenjan:</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
        <p className="aciklama">{event.description}</p>
        <div className="islem-butonlari">
          <a
            href="#"
            className="buton"
            onClick={(e) => {
              e.preventDefault();
              onEdit(event.id);
            }}
          >
            Bu etkinliği güncelle
          </a>
          <a
            href="#"
            className="buton"
            style={{ backgroundColor: "#666" }}
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Listeye dön
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;