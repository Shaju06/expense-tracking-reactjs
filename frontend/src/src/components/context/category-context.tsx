import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface Ctx {
  categories: Category[];
  addCategory: (c: Omit<Category, 'id'>) => void;
  updateCategory: (
    id: string,
    data: Partial<Category>,
  ) => void;
  deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<Ctx | undefined>(
  undefined,
);

export const CategoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(
    () => {
      const raw = localStorage.getItem('categories');
      if (raw) return JSON.parse(raw);
      // initial demo categories
      return [
        {
          id: 'c1',
          name: 'Food',
          color: '#EF4444',
          description: 'Meals & snacks',
        },
        {
          id: 'c2',
          name: 'Travel',
          color: '#3B82F6',
          description: 'Transport',
        },
        {
          id: 'c3',
          name: 'Shopping',
          color: '#F59E0B',
          description: 'Purchases',
        },
      ];
    },
  );

  useEffect(() => {
    localStorage.setItem(
      'categories',
      JSON.stringify(categories),
    );
  }, [categories]);

  const addCategory = (c: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...c,
      id: crypto.randomUUID(),
    };
    setCategories((p) => [newCat, ...p]);
  };

  const updateCategory = (
    id: string,
    data: Partial<Category>,
  ) => {
    setCategories((p) =>
      p.map((c) => (c.id === id ? { ...c, ...data } : c)),
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((p) => p.filter((c) => c.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx)
    throw new Error(
      'useCategories must be used within CategoryProvider',
    );
  return ctx;
};
