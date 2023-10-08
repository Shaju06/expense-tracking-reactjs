import React from 'react'
import { useMyContextState } from '../../Context';
import {useNavigate} from 'react-router-dom'

function AddExpense() {

    const [activeTab, setActiveTab] = React.useState(1)
    const [inputVal, setInputVal] = React.useState('')
    const [selectedCatg, setSelectedCatg] = React.useState('Food')
    const [description, setDescription] = React.useState('')
    const today = new Date().toISOString().split('T')[0];
    const {data, setData} = useMyContextState()
    const navigate = useNavigate()

    const TabLayout = React.useMemo(() => (
        ['Cash in',"Cash out"].map((data, index) => {
            const bgColor = index + 1 === activeTab ? 'bg-sky-400' : 'bg-sky-200'
            return  <button key={data} onClick={() => setActiveTab(index+1)} className={`w-1/2  ${bgColor}`}>{data}</button>
        }) 
    ),[activeTab])

    const  handleSubmit = (evt) => {
        evt.preventDefault()
        const type = activeTab === 1 ? 'Cash In' : 'Cash Out'
        const expenseObj = {
            type,
            category: {
                name: selectedCatg.toString(),
                isMain: true,
                order: 1,
            },
            date: new Date(today),
            amount: parseInt(inputVal),
            description: description,
        }
        data.expenses.push(expenseObj)
        setData(data)
        navigate('/')
    }


  return (
    <div
    className='mx-auto  mt-6'
    >
        <h2 className='text-2xl px-10'>Type</h2>
        <div className='w-full px-10 flex h-10 mt-3'>
           { TabLayout}
        </div>
<div className='form mt-2 px-10'>
<form >
    <div className='mb-4'>
        <label className='mb-2 block'>Category</label>
        <select className='w-full h-8 border border-gray-300' value={selectedCatg} onChange={(evt) => setSelectedCatg(evt.target.value)}>
            {
                data.categories.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                ))
            }
        </select>
    </div>
    <div className='mb-4'>
        <label className='mb-2 block'>Amount</label>
        <input 
        type="number"
        className='w-full border border-gray-400'
        value={inputVal}
        onChange={(evt) => {
            setInputVal(evt.target.value)
        }}
        required
          />
    </div>
    <div className='mb-4'>
        <label className='mb-2 block'>Date</label>
       <input
       type="date"
       className='w-full h-8 border border-gray-300'
       value={today}
       readOnly  />
    </div>
    <div className='mb-4'>
        <label className='mb-2 block'>Description</label>
       <textarea rows={6} value={description} onChange={(evt)=> setDescription(evt.target.value)} cols={4} className='w-full h-8 border border-gray-300' />
    </div>
</form>
</div>
<footer>
    <div className='w-full flex px-1 py-1 h-12'>
<button className='w-1/2 border border-sky-400' onClick={()=> navigate('/')}>Cancel</button>
<button type='submit' onClick={handleSubmit} className='w-1/2 bg-sky-400'>Add</button>
    </div>
</footer>
    </div>
  )
}

export default AddExpense