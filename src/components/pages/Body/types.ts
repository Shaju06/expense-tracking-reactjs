export enum ExpenseTypeEnum  {
    CashIn = "Cash In",
    CashOut = "Cash Out",
    }
    
    type Category = {
      name: string
      isMain: boolean
      order: number
    }
    
   export type Expense = {
      type: ExpenseTypeEnum
      category: Category
      date: Date
      amount: number
      description: string
    }
    