// Formats a number as currency in the "es-AR" locale with 2 decimal places.
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Formats a number in a compact form (e.g., 1.2K, 3.4M) in the "es-AR" locale with 1 decimal place.
export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("es-AR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
