import React from 'react'
import ExpensesList from './ExpensesList'
import Footer from '../Footer'

function Body() {


  return (
    <div
    className='h-800  mt-3'
    >
<ExpensesList />
<Footer activeTab={'Expense'} />
    </div>
  )
}

export default Body