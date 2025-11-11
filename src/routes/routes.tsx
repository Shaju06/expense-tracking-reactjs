// src/routes.tsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AddExpense, CategoryList, Home } from "../components";
import { useAuth } from "../components/context/auth-context";
import Header from "../components/pages/header";
import LoginPage from "../components/pages/Login/login";
import ProtectedRoute from "../components/protected-routes";

const AppRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isLoginPage = location.pathname === "/login" && !isAuthenticated;

  console.log("Current Path:", location.pathname,isAuthenticated, isLoginPage, 'fddsfdfd');

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
        </Routes>
      ) : (
        <div className="App container mx-auto ">
          <div className="border border-sky-400 min-h-screen">
            {isAuthenticated && <Header />}
            <Routes>
              <Route
                index
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
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
              <Route
                path="/addExpense"
                element={
                  <ProtectedRoute>
                    <AddExpense />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

 const ComponentRoutes = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
export default ComponentRoutes
