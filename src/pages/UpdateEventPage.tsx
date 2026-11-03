import { useNavigate, useParams } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import EventForm from "../components/forms/EventForm";
import NotFoundBox from "../components/layout/NotFoundBox";
import { useEvents } from "../context/useEvents";
import { ROUTES } from "../types/pages";

function UpdateEventPage() {
  const { id = "" } = useParams();
  const { getEvent, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = getEvent(id);

  if (!event) {
    return (
      <PageLayout title="Etkinlik Bulunamadı">
        <NotFoundBox text="Güncellenecek etkinlik bulunamadı."
          to={ROUTES.admin} linkText="← Yönetime dön" />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={event.title} text={`${event.category} · ${event.location}`}>
      <h2>Etkinlik Güncelle</h2>
      <EventForm
        key={event.id}
        initial={event}
        submitLabel="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate(ROUTES.detail(event.id));
        }}
      />
    </PageLayout>
  );
}

export default UpdateEventPage;
