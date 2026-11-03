import { useState, type FormEvent } from "react";
import { CATEGORIES, type Category } from "../../types/campus-event";
import type { NewEvent } from "../../context/event-context";
import { hasErrors, type Errors } from "../../utils/validate";
import FormField from "./FormField";

type Field = "title" | "category" | "date" | "time" | "location" | "capacity" | "description";

interface FormValues {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

interface EventFormProps {
  initial?: NewEvent;
  submitLabel: string;
  onSubmit: (data: NewEvent) => void;
}

function toValues(e?: NewEvent): FormValues {
  return {
    title: e?.title ?? "",
    category: e?.category ?? "",
    date: e?.date ?? "",
    time: e?.time ?? "",
    location: e?.location ?? "",
    capacity: e ? String(e.capacity) : "",
    description: e?.description ?? "",
  };
}

function validate(v: FormValues): Errors<Field> {
  const errors: Errors<Field> = {};
  const title = v.title.trim();
  if (!title) errors.title = "Etkinlik adı zorunludur.";
  else if (title.length < 3) errors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
  else if (title.length > 80) errors.title = "Etkinlik adı en fazla 80 karakter olabilir.";

  if (!v.category) errors.category = "Bir kategori seçin.";
  if (!v.date) errors.date = "Tarih zorunludur.";
  if (!v.time) errors.time = "Saat zorunludur.";
  if (!v.location.trim()) errors.location = "Yer zorunludur.";

  const cap = Number(v.capacity);
  if (!v.capacity) errors.capacity = "Kontenjan zorunludur.";
  else if (!Number.isInteger(cap) || cap < 1) errors.capacity = "Kontenjan 1 veya daha büyük bir tam sayı olmalıdır.";
  else if (cap > 1000) errors.capacity = "Kontenjan en fazla 1000 olabilir.";

  const desc = v.description.trim();
  if (!desc) errors.description = "Açıklama zorunludur.";
  else if (desc.length < 10) errors.description = "Açıklama en az 10 karakter olmalıdır.";
  return errors;
}

function EventForm({ initial, submitLabel, onSubmit }: EventFormProps) {
  const [values, setValues] = useState<FormValues>(() => toValues(initial));
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validate(values) : {};

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors(validate(values))) return;
    onSubmit({
      title: values.title.trim(),
      category: values.category as Category,
      date: values.date,
      time: values.time,
      location: values.location.trim(),
      capacity: Number(values.capacity),
      description: values.description.trim(),
      image: initial?.image,
    });
  }

  const invalid = (f: Field) =>
    errors[f] ? { "aria-invalid": true, "aria-describedby": `${f}-hata` } : {};

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <FormField id="title" label="Etkinlik Adı" error={errors.title}>
        <input id="title" type="text" value={values.title}
          onChange={(e) => set("title", e.target.value)} {...invalid("title")} />
      </FormField>

      <FormField id="category" label="Kategori" error={errors.category}>
        <select id="category" value={values.category}
          onChange={(e) => set("category", e.target.value as Category | "")} {...invalid("category")}>
          <option value="">Seçiniz</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </FormField>

      <FormField id="date" label="Tarih" error={errors.date}>
        <input id="date" type="date" value={values.date}
          onChange={(e) => set("date", e.target.value)} {...invalid("date")} />
      </FormField>

      <FormField id="time" label="Saat" error={errors.time}>
        <input id="time" type="time" value={values.time}
          onChange={(e) => set("time", e.target.value)} {...invalid("time")} />
      </FormField>

      <FormField id="location" label="Yer" error={errors.location}>
        <input id="location" type="text" value={values.location}
          onChange={(e) => set("location", e.target.value)} {...invalid("location")} />
      </FormField>

      <FormField id="capacity" label="Kontenjan" error={errors.capacity}>
        <input id="capacity" type="number" min={1} value={values.capacity}
          onChange={(e) => set("capacity", e.target.value)} {...invalid("capacity")} />
      </FormField>

      <FormField id="description" label="Açıklama" error={errors.description}>
        <textarea id="description" rows={6} value={values.description}
          onChange={(e) => set("description", e.target.value)} {...invalid("description")} />
      </FormField>

      <button type="submit" className="buton">{submitLabel}</button>
    </form>
  );
}

export default EventForm;
