import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCategories } from '../../context/category-context';
import { useExpenses } from '../../context/expense-context';
import PageWrapper from '../../layout/page-wrapper';
import Card from '../../ui/card';

const COLORS = [
  '#10B981',
  '#3B82F6',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#FBBF24',
];

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

export default function Dashboard() {
  const { expenses } = useExpenses();
  const { categories } = useCategories();
  const [selectedMonth, setSelectedMonth] =
    useState<string>(() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(
        d.getMonth() + 1,
      ).padStart(2, '0')}`;
    });

  // filter by selectedMonth
  const filtered = useMemo(
    () =>
      expenses.filter((e) =>
        e.date.startsWith(selectedMonth),
      ),
    [expenses, selectedMonth],
  );

  const totalIncome = filtered
    .filter((f) => f.type === 'in')
    .reduce((a, b) => a + b.amount, 0);
  const totalOut = filtered
    .filter((f) => f.type === 'out')
    .reduce((a, b) => a + b.amount, 0);
  const savings = totalIncome - totalOut;

  // Pie data: aggregate per category name
  const pieData = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of filtered) {
      const cat =
        categories.find((c) => c.id === e.categoryId)
          ?.name ?? 'Uncategorized';
      map.set(
        cat,
        (map.get(cat) || 0) + Math.abs(e.amount),
      );
    }
    return Array.from(map.entries()).map(
      ([name, value]) => ({ name, value }),
    );
  }, [filtered, categories]);

  // last 6 months bar chart
  const last6 = useMemo(() => {
    const arr: {
      month: string;
      income: number;
      expense: number;
    }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(
        d.getMonth() + 1,
      ).padStart(2, '0')}`;
      const list = expenses.filter((x) =>
        x.date.startsWith(key),
      );
      const income = list
        .filter((l) => l.type === 'in')
        .reduce((a, b) => a + b.amount, 0);
      const expense = list
        .filter((l) => l.type === 'out')
        .reduce((a, b) => a + b.amount, 0);
      arr.push({
        month: d.toLocaleString(undefined, {
          month: 'short',
        }),
        income,
        expense,
      });
    }
    return arr;
  }, [expenses]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-300">
              Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
              className="bg-card-dark border border-border-dark rounded px-3 py-2 text-text-dark"
            />
          </div>
        </div>

        {/* Summary cards */}
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
            value={`${categories.length}`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-4">
              Category Breakdown (selected month)
            </h3>
            {pieData.length === 0 ? (
              <div className="text-center text-gray-400 py-16">
                No data for selected month.
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={90}
                      label
                    >
                      {pieData.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={COLORS[idx % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">
              Last 6 Months
            </h3>
            <div className="h-64">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
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
          </Card>
        </div>

        {/* Recent transactions */}
        <Card>
          <h3 className="font-semibold mb-4">
            Recent Transactions (selected month)
          </h3>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No transactions for this month.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400">
                  <tr>
                    <th className="py-2">Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((t) => {
                    const cat = categories.find(
                      (c) => c.id === t.categoryId,
                    );
                    return (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-900/40"
                      >
                        <td className="py-3 text-sm text-gray-300">
                          {t.date}
                        </td>
                        <td className="py-3 text-sm">
                          {cat?.name ?? 'Uncategorized'}
                        </td>
                        <td className="py-3 text-sm text-gray-400">
                          {t.description}
                        </td>
                        <td
                          className={`py-3 text-right font-semibold ${
                            t.type === 'in'
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {t.type === 'in' ? '+' : '-'}₹
                          {t.amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </PageWrapper>
  );
}
