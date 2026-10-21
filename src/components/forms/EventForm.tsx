interface EventFormProps {
  page: "add" | "update";
  onSubmit: () => void;
}

function EventForm({ page, onSubmit }: EventFormProps) {
  return (
    <>
      <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title">Etkinlik Adı</label>
        <input type="text" id="title" maxLength={80} required />

        <label htmlFor="category">Kategori</label>
        <select id="category" required>
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>

        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" min={1} required />

        <label htmlFor="date">Tarih</label>
        <input type="date" id="date" required />

        <label htmlFor="time">Saat</label>
        <input type="time" id="time" required />

        <label htmlFor="location">Konum</label>
        <input type="text" id="location" required />

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5} required />

        <button
          type="submit"
          className="buton"
          style={{ marginTop: "1rem" }}
        >
          {page === "add" ? "Kaydet" : "Güncelle"}
        </button>
      </form>
    </>
  );
}

export default EventForm;