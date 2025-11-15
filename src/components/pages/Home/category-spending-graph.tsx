import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CategorySpendingGraph = ({ categoryData }: any) => {
  const COLORS = [
    '#10B981',
    '#3B82F6',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#14B8A6',
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex  justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Category Breakdown
        </h2>
        <input
          id="month"
          type="month"
          value={''}
          onChange={() => {}}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      {categoryData.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          No data for this month.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategorySpendingGraph;
