import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddExpense, CategoryList, Home } from "./Components/Body";
import Header from "./Components/Header";


const ComponentRoutes = () => {
    return (
        <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />  
          <Route path='categories' element={<CategoryList />} />  
          <Route path='addExpense' element={<AddExpense />} />  
        </Routes>
        </BrowserRouter>
    )
}

export default ComponentRoutes