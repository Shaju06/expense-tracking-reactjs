import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const MonthlyExpenseGraph = () => {
  const monthlyData = [
    { month: 'Jan', expense: 7000, income: 10000 },
    { month: 'Feb', expense: 6000, income: 9500 },
    { month: 'Mar', expense: 8000, income: 11000 },
    { month: 'Apr', expense: 7500, income: 10500 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Last 6 Months Trend
      </h2>
      {monthlyData.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          No data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10B981" />
            <Bar dataKey="expense" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyExpenseGraph;
