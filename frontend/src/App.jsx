// App.jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from './components/UserCreate/UserCreate';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <UserCreate/>
      </div>
    </QueryClientProvider>
  );
}

export default App;










