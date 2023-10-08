import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer({activeTab}) {

    const navigate = useNavigate()

  const handlClick = (index) => {

    if(index === 1) {
      navigate('/')
    } else {
      navigate('/categories')
    }

  }


  return (
    <footer>
<div
    className='w-full flex h-10 mt-10'
    >
      {
        ['Expense', 'Category'].map((item, index)=> {

          const bgColor =  activeTab === item ? 'bg-sky-400' : 'bg-sky-200'

          return (
           <button
           key={item}
          className={`w-1/2 ${bgColor}`}
          onClick={() => handlClick(index+1)}
          >
            {item}
          </button>
          )
        })
      }
       
    </div>
</footer>
  )
}

export default Footer