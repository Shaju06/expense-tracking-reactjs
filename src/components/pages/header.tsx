import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";


function Header() {

  const navigate = useNavigate();
  const location = useLocation()

  const pageHeader = React.useMemo(() => {

    const {pathname} = location

    if(pathname === '/') {
      return "Expense Tracking"
    } else if(pathname === '/addExpense') {
      return 'Add Expense'
    } else {
      return "Category List"
    }

  },[location])


  return (
    <header
    className= 'h-14 bg-sky-400'
    >
        <div className='h-full flex justify-between items-center'>
            <div
            className='w-full flex justify-center items-center'
            >
            <h2
        className='text-2xl font-bold text-sky-800'
        >
        {pageHeader}
        </h2>
            </div>
            {
              location.pathname === '/' ? (
                <div className='bg-sky-600 text-white w-20 h-10 flex justify-center items-center mr-2 focus:outline-none'>
    <button
    onClick={() => {
      navigate("/addExpense");
    }}
    >Add</button>
        </div>
              ) : null
            }
        
        </div>
       
        
    </header>
  )
}

export default Header