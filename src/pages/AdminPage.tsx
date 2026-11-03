import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import { useEvents } from "../context/useEvents";
import { formatDate } from "../utils/format-date";
import { sortByDate } from "../utils/sort-events";
import { ROUTES } from "../types/pages";
import type { CampusEvent } from "../types/campus-event";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(event: CampusEvent) {
    if (window.confirm(`"${event.title}" silinsin mi?`)) {
      deleteEvent(event.id);
    }
  }

  return (
    <PageLayout title="Etkinlik Yönetimi">
      <p>
        <Link to={ROUTES.add} className="buton">+ Yeni etkinlik</Link>
      </p>

      {events.length === 0 ? (
        <p className="bos-mesaj">Hiç etkinlik yok. Yeni bir etkinlik ekleyin.</p>
      ) : (
        <div className="tablo-kapsayici">
          <table className="yonetim-tablosu">
            <thead>
              <tr>
                <th scope="col">Etkinlik</th>
                <th scope="col">Tarih</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {sortByDate(events).map((event) => (
                <tr key={event.id}>
                  <td data-label="Etkinlik">
                    <Link to={ROUTES.detail(event.id)}>{event.title}</Link>
                  </td>
                  <td data-label="Tarih">{formatDate(event.date)}</td>
                  <td data-label="Kategori">{event.category}</td>
                  <td data-label="İşlemler">
                    <div className="islem-butonlari">
                      <Link to={ROUTES.update(event.id)} className="buton kucuk">Düzenle</Link>
                      <button type="button" className="buton kucuk tehlike"
                        onClick={() => handleDelete(event)}>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  );
}

export default AdminPage;
