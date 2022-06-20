import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestUserTasks } from '../services/services';
import { FiLogOut } from 'react-icons/fi';
import '../styles/tasks.css';


function Tasks() {
  const [user, setUser] = useState({});
  const [userTasks, setUserTasks] = useState([]);

  const navigate = useNavigate();
  
  function logout() {
    localStorage.removeItem('taskUser');
    navigate('/');
  }

  async function receivedTasks(id) {
    const resposeTasks = await requestUserTasks(id);
    setUserTasks(resposeTasks);
  }

  
  useEffect(() => {
    function isLoged() {
      const logedUser = localStorage.getItem('taskUser');
      if (!logedUser) {
        navigate('/login');
      }
      else {
        const userObj = JSON.parse(logedUser);
        setUser(userObj);
        receivedTasks(userObj.id);
      }
    }

    isLoged();
  }, [navigate]);

  const { name } = user;
  return (
    <div className='tasks-page'>
      <header>
        <h2>Task Force</h2>
        <div>
          <p>
            Olá, <strong>{ name }</strong>
          </p>
          <button
            onClick={() =>  logout()}
          >
            <abbr title='logout'>
              <FiLogOut />
            </abbr>
          </button>
        </div>
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
