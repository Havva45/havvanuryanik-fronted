import { Route, Routes } from "react-router";
import "./App.css";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

// 10 route
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/etkinlikler" element={<EventsPage />} />
      <Route path="/etkinlikler/:id" element={<EventDetailPage />} />
      <Route path="/yonetim" element={<AdminPage />} />
      <Route path="/yonetim/ekle" element={<AddEventPage />} />
      <Route path="/yonetim/guncelle/:id" element={<UpdateEventPage />} />
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/kayit" element={<RegisterPage />} />
      <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
