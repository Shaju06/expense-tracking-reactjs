import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Expense {
  id: string;
  categoryId: string;
  type: 'in' | 'out';
  amount: number;
  date: string; // YYYY-MM-DD
  description?: string;
}

interface Ctx {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    data: Partial<Expense>,
  ) => void;
}

const ExpenseContext = createContext<Ctx | undefined>(
  undefined,
);

export const ExpenseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(
    () => {
      const raw = localStorage.getItem('expenses');
      if (raw) return JSON.parse(raw);
      // initial demo expenses referencing category ids from CategoryContext initial values
      return [
        {
          id: 'e1',
          categoryId: 'c1',
          type: 'out',
          amount: 450,
          date: '2025-11-01',
          description: 'Lunch',
        },
        {
          id: 'e2',
          categoryId: 'c2',
          type: 'out',
          amount: 900,
          date: '2025-11-03',
          description: 'Cab',
        },
        {
          id: 'e3',
          categoryId: 'c1',
          type: 'out',
          amount: 350,
          date: '2025-10-15',
          description: 'Dinner',
        },
        {
          id: 'e4',
          categoryId: 'c3',
          type: 'out',
          amount: 1200,
          date: '2025-11-05',
          description: 'Shoes',
        },
        {
          id: 'e5',
          categoryId: 'c2',
          type: 'in',
          amount: 12000,
          date: '2025-11-02',
          description: 'Salary',
        },
      ];
    },
  );

  useEffect(() => {
    localStorage.setItem(
      'expenses',
      JSON.stringify(expenses),
    );
  }, [expenses]);

  const addExpense = (e: Omit<Expense, 'id'>) => {
    const newEx: Expense = {
      ...e,
      id: crypto.randomUUID(),
    };
    setExpenses((p) => [newEx, ...p]);
  };

  const deleteExpense = (id: string) =>
    setExpenses((p) => p.filter((x) => x.id !== id));
  const updateExpense = (
    id: string,
    data: Partial<Expense>,
  ) =>
    setExpenses((p) =>
      p.map((x) => (x.id === id ? { ...x, ...data } : x)),
    );

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx)
    throw new Error(
      'useExpenses must be used within ExpenseProvider',
    );
  return ctx;
};
