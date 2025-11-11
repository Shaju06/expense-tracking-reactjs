import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Footer from '../footer';
import MonthYearFilter from "./calendar";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#5DADE2"];

const categoryData = [
  { id: 1, name: "Food", color: "#FF6384" },
  { id: 2, name: "Transport", color: "#36A2EB" },
  { id: 3, name: "Shopping", color: "#FFCE56" },
  { id: 4, name: "Entertainment", color: "#4BC0C0" },
  { id: 5, name: "Bills", color: "#9966FF" },
];


function Dashboard() {
  const expenses = [
  {
    id: 1,
    category: "Food",
    amount: 450,
    date: "2025-11-10",
    description: "Lunch at cafe",
  },
  {
    id: 2,
    category: "Transport",
    amount: 120,
    date: "2025-11-09",
    description: "Uber to office",
  },
  {
    id: 3,
    category: "Shopping",
    amount: 800,
    date: "2025-11-08",
    description: "New shoes",
  },
  {
    id: 4,
    category: "Bills",
    amount: 2000,
    date: "2025-11-05",
    description: "Electricity bill",
  },
  {
    id: 5,
    category: "Entertainment",
    amount: 600,
    date: "2025-11-02",
    description: "Movie night",
  },
];
  return (
    <div
    className='h-900  m-3 flex gap-3 flex-col'
    >
<div
className="w-[100%]"
>
  <MonthYearFilter onChange={() => {
    console.log('changed')
  }} />
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  <div className="bg-green-100 text-green-700 p-4 rounded-xl">
    <p>Total In</p>
    <h2 className="text-xl font-bold">₹25,000</h2>
  </div>
  <div className="bg-red-100 text-red-700 p-4 rounded-xl">
    <p>Total Out</p>
    <h2 className="text-xl font-bold">₹8,200</h2>
  </div>
  <div className="bg-blue-100 text-blue-700 p-4 rounded-xl">
    <p>Net Savings</p>
    <h2 className="text-xl font-bold">₹16,800</h2>
  </div>
  <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl">
    <p>Savings Rate</p>
    <h2 className="text-xl font-bold">67%</h2>
  </div>
</div>
  {
    expenses.length === 0 ? ( <div className="bg-white shadow-sm rounded-lg p-8 text-center text-gray-500">
          <p>No expense data yet — start by adding your first expense!</p>
        </div>) : (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Expense by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
  { name: 'Food', value: 450 },
  { name: 'Transport', value: 120 },
  { name: 'Shopping', value: 800 },
  { name: 'Bills', value: 2000 },
  { name: 'Entertainment', value: 600 },
]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          

          {/* Expense List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Expenses
            </h2>
            <div className="divide-y">
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{exp.description}</p>
                    <p className="text-sm text-gray-500">{exp.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{exp.amount}</p>
                    {/* <p className="text-xs text-gray-400">{exp.date}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )
  }


<Footer activeTab={'Expense'} /> 
    </div>
  )
}

export default Dashboard