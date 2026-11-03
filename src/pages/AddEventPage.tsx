import { useNavigate } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/useEvents";
import { ROUTES } from "../types/pages";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <PageLayout title="Etkinlik Ekle">
      <EventForm
        submitLabel="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate(ROUTES.admin);
        }}
      />
    </PageLayout>
  );
}

export default AddEventPage;
