export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "E-posta zorunludur.";
  if (!EMAIL_RE.test(value.trim())) return "Geçerli bir e-posta adresi girin.";
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Şifre zorunludur.";
  if (value.length < 6) return "Şifre en az 6 karakter olmalıdır.";
}

export function hasErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}
