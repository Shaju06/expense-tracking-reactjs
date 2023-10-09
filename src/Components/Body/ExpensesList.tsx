import React from "react";
import { Expense } from "./types";
import { useMyContextState } from "../../Context";
import useGroupedExpenses from "../../customhook/useGroupedExpenses";

const ExpensesList = () => {

    const {data} = useMyContextState()

    const expenses: Expense[]  = useGroupedExpenses(data.expenses)
       

return (
    <div className="mt-4 max-h-96 overflow-y-auto">
        {expenses.map((group, index) => {
            const [month, year] = group.monthYear.split('/');
            const monthYearString = `${month}/${year}`;

            const expenseItems = group.expenses.map((expense, index) => {
                const textColor = expense.type === 'Cash In' ? 'text-green-500' : 'text-blue-500';
                const borderColor = expense.type === 'Cash In' ? 'border-green-500' : 'border-blue-500';
                return (
                    <>
                    <div key={index} className={`flex justify-between items-center  py-1 ml-2  ${textColor}`}>
                        <span>{expense.category.name}</span>
                        <span>{expense.type === 'Cash In' ? '+' :'-'}{expense.amount}</span>  
                        
                    </div>
                    <hr className={`my-2 border-t ${borderColor} w-full h-1`} />
                    </>
                );
            });

            return (
                <div key={group.monthYear} className="px-3">
                    <div className="flex justify-between items-center py-2  border-b-4 text-blue-500 border-blue-500">
                        <span className={`font-bold `}>{monthYearString}</span>
                        <span className={`font-bold `}>{group.totalNet}</span>
                    </div>
                    <div className="mt-2 px-3">
                        {expenseItems}
                    </div>
                    
                </div>
            );
        })}
    </div>
);
}

export default ExpensesList