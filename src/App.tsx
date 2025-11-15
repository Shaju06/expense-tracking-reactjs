import { AuthProvider } from './components/context/auth-context';
import { CategoryProvider } from './components/context/category-context';
import { ExpenseProvider } from './components/context/expense-context';
import ComponentRoutes from './routes/routes';

function App() {
  return (
    <div className="dark">
      <div className="dark">
        <AuthProvider>
          <CategoryProvider>
            <ExpenseProvider>
              <ComponentRoutes />
            </ExpenseProvider>
          </CategoryProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
