import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import FormField from "../components/forms/FormField";
import { hasErrors, validateEmail, validatePassword } from "../utils/validate";
import { ROUTES } from "../types/pages";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = submitted
    ? { email: validateEmail(email), password: validatePassword(password) }
    : {};

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const result = { email: validateEmail(email), password: validatePassword(password) };
    setSuccess(!hasErrors(result));
  }

  return (
    <PageLayout title="Giriş Yap">
      <form className="form" noValidate onSubmit={handleSubmit}>
        <FormField id="email" label="E-posta" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={email}
            aria-invalid={!!errors.email}
            onChange={(e) => { setEmail(e.target.value); setSuccess(false); }} />
        </FormField>
        <FormField id="password" label="Şifre" error={errors.password}>
          <input id="password" type="password" autoComplete="current-password" value={password}
            aria-invalid={!!errors.password}
            onChange={(e) => { setPassword(e.target.value); setSuccess(false); }} />
        </FormField>
        <button type="submit" className="buton">Giriş yap</button>
      </form>

      {success && (
        <p className="mesaj-kutusu basari" role="status">Giriş başarılı. Hoş geldiniz!</p>
      )}

      <p className="form-linkleri">
        <Link to={ROUTES.forgot}>Şifremi unuttum</Link>
        <Link to={ROUTES.register}>Hesabın yok mu? Kayıt ol</Link>
      </p>
    </PageLayout>
  );
}

export default LoginPage;
