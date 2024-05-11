import { QueryClient, QueryClientProvider } from 'react-query';
import UserLogin from './components/UserLogin/UserLogin';
import UserCreate from './components/UserCreate/UserCreate';
import EventFormContainer from "./EventFormContainer/EventFormContainer";
import Styles from './App.module.css'
const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/*<UserLogin> ya existe el componente pero aún en construcción, tanto el frontend como el backend.*/}
      {/* <UserCreate /> */}
          <div className={Styles.container}>
            <EventFormContainer />
        </div>
    </>
  );
}

export default App;
