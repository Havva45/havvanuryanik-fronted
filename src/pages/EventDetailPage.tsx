import { useParams } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import EventDetail from "../components/events/EventDetail";
import NotFoundBox from "../components/layout/NotFoundBox";
import { useEvents } from "../context/useEvents";
import { ROUTES } from "../types/pages";

function EventDetailPage() {
  const { id = "" } = useParams();
  const event = useEvents().getEvent(id);

  if (!event) {
    return (
      <PageLayout title="Etkinlik Bulunamadı">
        <NotFoundBox text="Aradığınız etkinlik silinmiş ya da hiç olmamış olabilir."
          to={ROUTES.events} linkText="← Listeye dön" />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={event.title} text={`${event.category} · ${event.location}`}>
      <EventDetail event={event} />
    </PageLayout>
  );
}

export default EventDetailPage;
