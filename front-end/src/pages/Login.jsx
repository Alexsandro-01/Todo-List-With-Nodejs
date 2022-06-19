import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/services';
import '../styles/login.css';

function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    disabled: true
  });

  const [warning, setWarning] = useState({
    validUser: true
  });

  const navigate = useNavigate();

  function validation() {
    const { email, password } = loginState;

    const MAX_LENGTH = 6;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && password.length >= MAX_LENGTH) {
      setLoginState({ ...loginState, disabled: false });
    }
    else {
      setLoginState({ ...loginState, disabled: true });
    }
  }

  const { email, password, disabled } = loginState;

  function saveUser(user) {
    const userJson = JSON.stringify(user);
    localStorage.setItem('taskUser', userJson);

    navigate('/tasks');
  }
  
  async function stopSubmit(event) {
    event.preventDefault();
    
    const data = {
      email,
      password
    }

    const user = await requestLogin(data);

    if (user.message) {
      setWarning({ validUser: false })
    }
    else {
      setWarning({ validUser: true })
      saveUser(user);
    }
  }


  useEffect(() => {
    validation();
  }, [email, password]);

  return (
    <main className='login-page'>
      <section>
        <h1>Login</h1>
        <form>
          <div>
            <input
              type='email'
              placeholder='E-mail'
              value={ email }
              onChange={ ({ target }) => {
                setLoginState({ ...loginState, email: target.value});
              }}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              value={ password }
              onChange={ ({ target }) => {
                setLoginState({ ...loginState, password: target.value });
              }}
            />
          </div>
            {
              !warning.validUser && (
                <p className='warning'>Usuário não encontrado, verifique os seus dados!</p>
              )
            }
          <div>
            <button
              type='submit'
              disabled={ disabled }
              onClick={ (event) => stopSubmit(event) }  
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login;