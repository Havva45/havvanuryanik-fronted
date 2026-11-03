export function formatDate(dateStr: string) {
  // "YYYY-MM-DD" yerel saatle okunur, böylece gün kaymaz
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
