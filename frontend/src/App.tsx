import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AuthProvider } from './components/context/auth-context';
import ComponentRoutes from './routes/routes';

function App() {
  const client = new QueryClient();

  return (
    <div className="dark">
      <div className="dark">
        <QueryClientProvider client={client}>
          <AuthProvider>
            <ComponentRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
