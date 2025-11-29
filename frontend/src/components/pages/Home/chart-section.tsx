import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useSummary } from '../../../api/summary';
import Card from '../../ui/card';
import SixMonthTrendChart from './six-month-trend-chart';

const ChartSection = ({
  selectedMonth,
}: {
  selectedMonth: string;
}) => {
  const { data: pieData, isLoading } =
    useSummary(selectedMonth);

  if (isLoading) {
    return <p className="p-6 text-gray-400">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="font-semibold mb-4">
          Category Breakdown (selected month)
        </h3>
        {!isLoading && pieData?.byCategory?.length === 0 ? (
          <div className="flex justify-center items-center h-[100%] text-gray-400 py-16">
            No data for selected month.
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData?.byCategory}
                  dataKey="total"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  label
                  fill="#82ca9d"
                  isAnimationActive={true}
                >
                  {pieData?.byCategory.map(
                    (category: any) => (
                      <Cell
                        key={category.id}
                        fill={category.color}
                      />
                    ),
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
      <Card>
        <SixMonthTrendChart />
      </Card>
    </div>
  );
};

export default ChartSection;
