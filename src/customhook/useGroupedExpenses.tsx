import { useState, useEffect } from 'react';
import { Expense, ExpenseTypeEnum } from '../Components/Body/types';

const useGroupedExpenses = (expenses: Expense[]) => {
  const [groupedExpenses, setGroupedExpenses] = useState([]);

  useEffect(() => {
    const groupedExpensesWithNet = {};

    expenses.forEach((expense: Expense) => {
      const monthYearKey = `${expense.date.getMonth() + 1}/${expense.date.getFullYear()}`;
      if (!groupedExpensesWithNet[monthYearKey]) {
        groupedExpensesWithNet[monthYearKey] = { monthYear: monthYearKey, expenses: [], totalNet: 0 };
      }
      groupedExpensesWithNet[monthYearKey].expenses.push(expense);
      if (expense.type === ExpenseTypeEnum.CashIn) {
        groupedExpensesWithNet[monthYearKey].totalNet += expense.amount;
      } else if (expense.type === ExpenseTypeEnum.CashOut) {
        groupedExpensesWithNet[monthYearKey].totalNet -= expense.amount;
      }
    });

    // Convert the object back to an array
    const groupedExpensesArray = Object.values(groupedExpensesWithNet);

    // Sorting grouped expenses by month in decreasing order
    groupedExpensesArray.sort((a, b) => {
      const [aMonth, aYear] = a.monthYear.split("/").map(Number);
      const [bMonth, bYear] = b.monthYear.split("/").map(Number);
      // Sort by year first in decreasing order, then by month in decreasing order
      if (bYear - aYear !== 0) {
        return bYear - aYear;
      }
      return bMonth - aMonth;
    });

    setGroupedExpenses(groupedExpensesArray);
  }, [expenses]);

  return groupedExpenses;
};

export default useGroupedExpenses;
