import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  AddExpense,
  CategoryList,
  Home,
} from '../components';
import { useAuth } from '../components/context/auth-context';
import Header from '../components/layout/header';
import AddCategory from '../components/pages/Categories/add-categories';
import Login from '../components/pages/login';
import ProtectedRoute from '../components/protected-routes';

const AppRoutesInner: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const hideHeader = location.pathname === '/login';

  return (
    <>
      {!hideHeader && user && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default function ComponentRoutes() {
  return (
    <BrowserRouter>
      <AppRoutesInner />
    </BrowserRouter>
  );
}
