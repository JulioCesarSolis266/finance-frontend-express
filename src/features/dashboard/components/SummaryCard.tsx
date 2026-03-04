import Card from "../../../shared/components/ui/Card";
import { formatCurrency } from "@/shared/utils/format";

interface Props {
  title: string;
  value: number;
}

export default function SummaryCard({ title, value }: Props) {
  const isNegative = value < 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium text-slate-500">{title}</h4>

        <p
          className={`text-2xl font-semibold ${
            isNegative ? "text-red-600" : "text-slate-900"
          }`}
        >
          {formatCurrency(value)}
        </p>
      </div>
    </Card>
  );
}
