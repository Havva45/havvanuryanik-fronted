import { NavLink } from "react-router";
import { ROUTES } from "../../types/pages";

const links = [
  { to: ROUTES.home, label: "Ana Sayfa", end: true },
  { to: ROUTES.events, label: "Etkinlikler", end: false },
  { to: ROUTES.admin, label: "Yönetim", end: false },
  { to: ROUTES.login, label: "Giriş", end: false },
];

function Navigation() {
  return (
    <nav className="navigasyon" aria-label="Ana menü">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => (isActive ? "aktif" : undefined)}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
