import { useState } from 'react';
import PageWrapper from '../../layout/page-wrapper';
import MonthPicker from '../../ui/month-picker';
import ChartSection from './chart-section';
import RecentTransaction from './recent-transaction';
import StatisticCardSummary from './stats-summary';

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] =
    useState<string>(() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(
        d.getMonth() + 1,
      ).padStart(2, '0')}`;
    });

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="w-full">
          <MonthPicker
            value={selectedMonth}
            onChange={(v) => setSelectedMonth(v)}
          />
        </div>

        {/* Summary cards */}
        <StatisticCardSummary
          selectedMonth={selectedMonth}
        />

        {/* Charts */}
        <ChartSection selectedMonth={selectedMonth} />

        {/* Recent transactions */}
        <RecentTransaction />
      </div>
    </PageWrapper>
  );
}
