import type { PageName } from "../../types/pages";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="navigasyon">
      <button
        type="button"
        className={current === "home" ? "aktif" : ""}
        onClick={() => onNavigate("home")}
      >
        Ana Sayfa
      </button>
      <button
        type="button"
        className={current === "events" ? "aktif" : ""}
        onClick={() => onNavigate("events")}
      >
        Etkinlikler
      </button>
      <button
        type="button"
        className={current === "add" ? "aktif" : ""}
        onClick={() => onNavigate("add")}
      >
        Ekle
      </button>
    </nav>
  );
}

export default Navigation;