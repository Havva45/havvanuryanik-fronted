import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="form-alani">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="hata-mesaji" id={`${id}-hata`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
