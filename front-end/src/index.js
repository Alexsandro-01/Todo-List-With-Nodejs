import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tasks from './pages/Tasks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <App /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/tasks' element={ <Tasks /> } />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
