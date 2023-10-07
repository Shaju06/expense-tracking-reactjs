import React from 'react'

function Header() {
  return (
    <header
    className= 'h-14 bg-sky-400'
    >
        <div className='h-full  flex justify-between items-center'>
            <div
            className='w-full flex justify-center items-center'
            >
            <h2
        className='font-bold'
        >
        Header
        </h2>
            </div>
        <div className='bg-sky-600 text-white w-20 h-10 flex justify-center items-center mr-2 focus:outline-none'>
    <button>Add</button>
        </div>
        </div>
       
        
    </header>
  )
}

export default Header