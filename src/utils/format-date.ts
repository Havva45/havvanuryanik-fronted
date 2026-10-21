export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}