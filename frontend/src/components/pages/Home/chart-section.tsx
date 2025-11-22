import { PieChart } from 'lucide-react';
import {
  Pie,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Card from '../../ui/card';
import SixMonthTrendChart from './six-month-trend-chart';

const ChartSection = ({
  selectedMonth,
}: {
  selectedMonth: string;
}) => {
  //   const { data: pieData, isLoading } =
  //     useSummary(selectedMonth);

  //   if (isLoading) {
  //     return <p className="p-6 text-gray-400">Loading...</p>;
  //   }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="font-semibold mb-4">
          Category Breakdown (selected month)
        </h3>
        {/* {!isLoading && !pieData?.byCategory ? (
          <div className="text-center text-gray-400 py-16">
            No data for selected month.
          </div>
        ) : ( */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'A1', value: 100 },
                  { name: 'A2', value: 300 },
                  { name: 'B1', value: 100 },
                  { name: 'B2', value: 80 },
                  { name: 'B3', value: 40 },
                  { name: 'B4', value: 30 },
                  { name: 'B5', value: 50 },
                  { name: 'C1', value: 100 },
                  { name: 'C2', value: 200 },
                  { name: 'D1', value: 150 },
                  { name: 'D2', value: 50 },
                ]}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                label
              />

              {/* {pieData?.byCategory.map(
                  (category: any) => (
                    <Cell
                      key={category.name}
                      fill={category.color}
                    />
                  ),
                )} */}

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* )} */}
      </Card>

      <SixMonthTrendChart />
    </div>
  );
};

export default ChartSection;
