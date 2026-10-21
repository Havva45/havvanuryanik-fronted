import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  selectedCategory: Category | "";
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>Etkinlik ara</label>
        <input
          type="search"
          placeholder="Örn: atölye, kariyer..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <label>Kategori</label>
        <select
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(e.target.value as Category | "")
          }
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;