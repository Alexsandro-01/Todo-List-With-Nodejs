import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <main className='home'>
      <h1>Welcome to Task Force</h1>
      <h4>Your to do app</h4>
      <section>
        <button>
          <Link to='/login'>
            Sign In
          </Link>
        </button>
        <button>
          <Link to='/sign-up'>
            Sign Up
          </Link>
        </button>
      </section>
    </main>
  );
}

export default App;
