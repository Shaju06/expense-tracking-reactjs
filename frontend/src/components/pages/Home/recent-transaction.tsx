import React from 'react';
import { useCategories } from '../../../api/categories';
import { useRecentExpenses } from '../../../api/recent-transactions';
import Card from '../../ui/card';

const RecentTransaction: React.FC = () => {
  const { data, isLoading } = useRecentExpenses();
  const { data: categories } = useCategories();

  return (
    <Card>
      <h3 className="font-semibold mb-4">
        Recent Transactions (selected month)
      </h3>
      {isLoading && (
        <p className="text-gray-400">Loading...</p>
      )}

      {!isLoading && (!data || data?.length === 0) ? (
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
              {data?.map((t: any) => {
                const cat = categories.find(
                  (c: any) => c.id === t.categoryId,
                );
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-gray-900/40"
                  >
                    <td className="py-3 text-sm text-gray-300">
                      {new Date(t.date).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        },
                      )}
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
  );
};

export default RecentTransaction;
