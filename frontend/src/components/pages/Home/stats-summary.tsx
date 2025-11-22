import { useSummary } from '../../../api/summary';
import Card from '../../ui/card';

function SummaryCard({
  title,
  value,
  className = '',
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </Card>
  );
}

const StatisticCardSummary: React.FC<{
  selectedMonth: string;
}> = ({ selectedMonth }) => {
  const {
    isLoading,
    data: statsData,
    error,
  } = useSummary(selectedMonth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading summary</div>;
  }

  const {
    totalIn: totalIncome,
    totalOut,
    byCategory: categories,
  } = statsData;

  const savings = totalIncome - totalOut;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Total Income"
        value={`₹${totalIncome}`}
      />
      <SummaryCard
        title="Total Expense"
        value={`₹${totalOut}`}
      />
      <SummaryCard
        title="Net Savings"
        value={`₹${savings}`}
      />
      <SummaryCard
        title="Categories"
        value={`${categories?.length}`}
      />
    </div>
  );
};

export default StatisticCardSummary;
