import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import FormField from "../components/forms/FormField";
import { hasErrors, validateEmail, validatePassword } from "../utils/validate";
import { ROUTES } from "../types/pages";

interface Values {
  name: string;
  email: string;
  password: string;
  password2: string;
}

function validate(v: Values) {
  const name = v.name.trim();
  return {
    name: !name
      ? "Ad soyad zorunludur."
      : name.length < 3
        ? "Ad soyad en az 3 karakter olmalıdır."
        : undefined,
    email: validateEmail(v.email),
    password: validatePassword(v.password),
    password2: !v.password2
      ? "Şifre tekrarı zorunludur."
      : v.password2 !== v.password
        ? "Şifreler eşleşmiyor."
        : undefined,
  };
}

function RegisterPage() {
  const [values, setValues] = useState<Values>({ name: "", email: "", password: "", password2: "" });
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const errors: Partial<Record<keyof Values, string>> = submitted ? validate(values) : {};

  function set(key: keyof Values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(!hasErrors(validate(values)));
  }

  return (
    <PageLayout title="Kayıt Ol">
      <form className="form" noValidate onSubmit={handleSubmit}>
        <FormField id="name" label="Ad Soyad" error={errors.name}>
          <input id="name" type="text" autoComplete="name" value={values.name}
            aria-invalid={!!errors.name} onChange={(e) => set("name", e.target.value)} />
        </FormField>
        <FormField id="email" label="E-posta" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={values.email}
            aria-invalid={!!errors.email} onChange={(e) => set("email", e.target.value)} />
        </FormField>
        <FormField id="password" label="Şifre" error={errors.password}>
          <input id="password" type="password" autoComplete="new-password" value={values.password}
            aria-invalid={!!errors.password} onChange={(e) => set("password", e.target.value)} />
        </FormField>
        <FormField id="password2" label="Şifre (tekrar)" error={errors.password2}>
          <input id="password2" type="password" autoComplete="new-password" value={values.password2}
            aria-invalid={!!errors.password2} onChange={(e) => set("password2", e.target.value)} />
        </FormField>
        <button type="submit" className="buton">Kayıt ol</button>
      </form>

      {success && (
        <p className="mesaj-kutusu basari" role="status">
          Kayıt başarılı. Artık giriş yapabilirsiniz.
        </p>
      )}

      <p className="form-linkleri">
        <Link to={ROUTES.login}>Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </PageLayout>
  );
}

export default RegisterPage;
