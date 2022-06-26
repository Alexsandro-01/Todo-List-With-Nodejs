import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tasks from './pages/Tasks';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/tasks' element={ <Tasks /> } />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
