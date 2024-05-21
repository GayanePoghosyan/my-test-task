import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { UserProvider, WatchlistProvider } from './contexts';
import { getAuthenticationToken} from './services/user';
import Watchlist from './pages/WatchList';
import Register from './pages/Register';
import Login from './pages/Login';

const App: React.FC = () => {

  useEffect(() => {
    const token = getAuthenticationToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <WatchlistProvider>
      <UserProvider>
        <BrowserRouter>
         <ToastContainer />  
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={true ? '/home' : '/login'} />
              }
            />
            <Route path="/home" element={<Watchlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </WatchlistProvider>
  );
};

export default App;