import { ExpenseTypeEnum } from "./components/pages/Body/types"

export const dummyData = {
    "categories" :  [
        { isMain: true, order: 1, name: "Food" },
        { isMain: true, order: 2, name: "Transportation" },
        { isMain: true, order: 3, name: "Work" },
        { isMain: false, order: 4, name: "Traveling" },
      ],
    "expenses" : [
        {
            type: ExpenseTypeEnum.CashIn,
            category: {
                name: "Salary",
                isMain: true,
                order: 1,
            },
            date: new Date("2023-10-08T12:00:00"),
            amount: 2000,
            description: "Monthly salary payment",
        },
        {
            type: ExpenseTypeEnum.CashOut,
            category: {
                name: "Groceries",
                isMain: true,
                order: 2,
            },
            date: new Date("2023-10-07T15:30:00"),
            amount: 5550,
            description: "Grocery shopping",
        },
        {
            type: ExpenseTypeEnum.CashIn,
            category: {
                name: "Salary",
                isMain: true,
                order: 1,
            },
            date: new Date("2023-11-08T12:00:00"),
            amount: 2000,
            description: "Monthly salary payment",
        },
        
    ]
}