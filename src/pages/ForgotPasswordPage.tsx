import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import FormField from "../components/forms/FormField";
import { validateEmail } from "../utils/validate";
import { ROUTES } from "../types/pages";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const error = submitted ? validateEmail(email) : undefined;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(!validateEmail(email));
  }

  return (
    <PageLayout title="Şifremi Unuttum">
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <FormField id="email" label="E-posta" error={error}>
          <input id="email" type="email" autoComplete="email" value={email}
            aria-invalid={!!error}
            onChange={(e) => { setEmail(e.target.value); setSuccess(false); }} />
        </FormField>
        <button type="submit" className="buton">Bağlantı gönder</button>
      </form>

      {success && (
        <p className="mesaj-kutusu basari" role="status">
          {email.trim()} adresine şifre yenileme bağlantısı gönderildi.
        </p>
      )}

      <p className="form-linkleri">
        <Link to={ROUTES.login}>← Girişe dön</Link>
      </p>
    </PageLayout>
  );
}

export default ForgotPasswordPage;
