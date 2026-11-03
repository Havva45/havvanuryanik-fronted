export const ROUTES = {
  home: "/",
  events: "/etkinlikler",
  detail: (id: string) => `/etkinlikler/${id}`,
  admin: "/yonetim",
  add: "/yonetim/ekle",
  update: (id: string) => `/yonetim/guncelle/${id}`,
  login: "/giris",
  register: "/kayit",
  forgot: "/sifremi-unuttum",
} as const;
