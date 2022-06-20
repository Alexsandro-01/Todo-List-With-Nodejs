import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestUserTasks } from '../services/services';
import '../styles/tasks.css';


function Tasks() {
  const [user, setUser] = useState({});
  const [userTasks, setUserTasks] = useState([]);

  const navigate = useNavigate();
  const logedUser = localStorage.getItem('taskUser');

  useEffect(() => {
    function isLoged() {
      if (!logedUser) {
        navigate('/login');
      }
      else {
        const userObj = JSON.parse(logedUser);
        setUser(userObj);
      }
    }

    isLoged();
  }, [logedUser, navigate]);

  useEffect(() => {
    async function receivedTasks() {
      const resposeTasks = await requestUserTasks(user.id);
      
      setUserTasks(resposeTasks);
    }

    receivedTasks();
  }, [user]);

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
            {
              userTasks.length > 0 && userTasks.map((value) => (
                <li key={ value.id }>
                  <input type="checkbox" id={ value.id } />
                  <label htmlFor={ value.id }>
                    { value.task }
                  </label>
                </li>
              ))
            }
            {
              userTasks.length === 0 && (
                <li>Nenhuma tarefa encontrada</li>
              )
            }
          </ul>
        </section>
      </main>
    </div>
      
  )
}

export default Tasks;
