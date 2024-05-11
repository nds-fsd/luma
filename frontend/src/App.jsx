import { QueryClient, QueryClientProvider } from 'react-query';
import UserLogin from './components/UserLogin/UserLogin';
import UserCreate from './components/UserCreate/UserCreate';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/*<UserLogin> ya existe el componente pero aún en construcción, tanto el frontend como el backend.*/}
      <UserCreate />
    </>
  );
}

export default App;
