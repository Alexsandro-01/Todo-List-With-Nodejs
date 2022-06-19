import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tasks.css';


function Tasks() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logedUser = localStorage.getItem('taskUser');

  function isLoged() {
    if (!logedUser) {
      navigate('/login');
    }
    else {
      const userObj = JSON.parse(logedUser);
      setUser(userObj);
    }
  }

  useEffect(() => {
    isLoged();
  }, []);
  const { name } = user;
  return (
    <div className='tasks-page'>
      <header>
        <h2>Task Force</h2>
        <p>
          Olá <strong>{ name }</strong>
        </p>
      </header>
      <main>
        <div className='new-task'>
          <input type="text" placeholder='new task' />
          <button>+</button>
        </div>
        <section>
          <ul>
            <li>
              <input type="checkbox" id="1" />
              <label htmlFor="1">
                Tarefa 1
              </label>
            </li>
            <li>
              <input type="checkbox" id="2" />
              <label htmlFor="2">
                Tarefa 1
              </label>
            </li>
            <li>
              <input type="checkbox" id="3" />
              <label htmlFor="3">
                Tarefa 1
              </label>
            </li>
            <li>
              <input type="checkbox" id="4" />
              <label htmlFor="4">
                Tarefa 1
              </label>
            </li>
          </ul>
        </section>
      </main>
    </div>
      
  )
}

export default Tasks;
