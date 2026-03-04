import BalanceSection from "./components/BalanceSection";
import CategorySection from "./components/CategorySection";
import MonthlySection from "./components/MonthlySection";
import DateRangeSection from "./components/DateRangeSection";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <BalanceSection />
      <CategorySection />
      <MonthlySection />
      <DateRangeSection />
    </div>
  );
}
