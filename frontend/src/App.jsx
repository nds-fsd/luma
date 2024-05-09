// App.jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import UserLogin from "./components/UserLogin/UserLogin";
import UserCreate from './components/UserCreate/UserCreate';

const queryClient = new QueryClient();

function App() {
  return (
      <>
        <UserCreate/>
      </>
  );
}

export default App;










