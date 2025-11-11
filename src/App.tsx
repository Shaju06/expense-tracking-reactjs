import { AuthProvider } from "./components/context/auth-context";
import { ContextStateProvider } from "./components/context/expenses";
import ComponentRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
    <ContextStateProvider>
          <ComponentRoutes />
    </ContextStateProvider>
    </AuthProvider>
  );
}

export default App;