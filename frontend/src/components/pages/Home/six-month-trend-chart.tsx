import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLastSixSummary } from '../../../api/useLastSixSummary';
import Card from '../../ui/card';

const SixMonthTrendChart: React.FC = () => {
  const { data: last6, isLoading } = useLastSixSummary();

  if (isLoading) {
    return (
      <Card>
        <h3 className="font-semibold mb-4">
          Last 6 Months
        </h3>
        <p className="text-gray-400">Loading...</p>
      </Card>
    );
  }

  return (
    <>
      <h3 className="font-semibold mb-4">Last 6 Months</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last6}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10B981" />
            <Bar dataKey="expense" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SixMonthTrendChart;
