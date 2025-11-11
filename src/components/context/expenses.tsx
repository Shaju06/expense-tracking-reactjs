import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext } from 'react';
import { dummyData } from '../../data';

interface Data {
    categories: string[];
    expenses:  { 
        type: string; 
        category: { name: string; isMain: boolean; order: number; }; 
        date: string; 
        amount: number; 
        description: string;
     }[];
}

interface ContextProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const ContextState = createContext<ContextProps | undefined>(undefined);

export const ContextStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = React.useState<Data>(dummyData as any);

  const contextValue: ContextProps = {
    data,
    setData,
  };

  return <ContextState.Provider value={contextValue}>{children}</ContextState.Provider>;
};

export const useMyContextState = (): ContextProps => {
  const context = useContext(ContextState);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
