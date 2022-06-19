import { useState, useEffect } from 'react';
import '../styles/login.css';

function stopSubmit(event) {
  event.preventDefault();
  console.log('Barrei o submit');
}

function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    disabled: true
  });

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