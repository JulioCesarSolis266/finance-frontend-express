export function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return {
    month: `${year}-${month}`, // "2026-03"
    startDate: `${year}-${month}-01`, // "2026-03-01"
    endDate: `${year}-${month}-${day}`, // "2026-03-03"
  };
}
