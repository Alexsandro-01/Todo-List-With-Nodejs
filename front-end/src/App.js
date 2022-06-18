import './styles/App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <main className='home'>
      <h1>Welcome to Task Force</h1>
      <h4>Your to do app</h4>
      <section>
        <button
          type='button'
          onClick={ () => navigate('/login')}
        >
          Sign In
        </button>
        <button
          type='button'
          onClick={ () => navigate('/sign-up') }
        >
          Sign Up
        </button>
      </section>
    </main>
  );
}

export default App;
