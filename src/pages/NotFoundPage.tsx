import PageLayout from "../components/layout/PageLayout";
import NotFoundBox from "../components/layout/NotFoundBox";
import { ROUTES } from "../types/pages";

function NotFoundPage() {
  return (
    <PageLayout title="Sayfa Bulunamadı" text="404">
      <NotFoundBox text="Aradığınız sayfa mevcut değil." to={ROUTES.home} linkText="Ana sayfaya dön" />
    </PageLayout>
  );
}

export default NotFoundPage;
