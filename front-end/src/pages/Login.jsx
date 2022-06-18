import '../styles/login.css';

function Login() {
  return (
    <main className='login-page'>
      <section>
        <h1>Login</h1>
        <form>
          <div>
            <input type='email' placeholder='E-mail' />
          </div>
          <div>
            <input type='password' placeholder='Password' />
          </div>
          <div>
            <button type='submit'>
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login;