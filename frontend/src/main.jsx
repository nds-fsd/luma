import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import io from 'socket.io-client'
import { getUserToken} from './utils/localStorage.utils';

const queryClient = new QueryClient();
const token = getUserToken();

const socket = io('ws://localhost:3001', {
  auth: {
    token: token
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App socket={socket} token={token}/>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
