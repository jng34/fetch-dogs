import { FormEvent, useState } from 'react';
import { Link, redirect } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  type RedirectFunction = (
    url: string,
    init?: number | ResponseInit
  ) => Response;

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Reset email and password fields
    setName('');
    setEmail('');
    //Authenticate user
    fetch('https://frontend-take-home-service.fetch.com/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => console.log(res))
    .then(() => redirect("/home"))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Name</label><br/>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        <br/>
        <label>Email</label><br/>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login;
