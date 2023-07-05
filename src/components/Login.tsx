import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Home from './Home';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Authenticate user
    try {
      const auth = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, email }),
        headers: { 'Content-type': 'application/json' }
      });
      console.log(auth)
      //Reset email and password fields
      setName('');
      setEmail('');
      navigate("/home")
    } catch (error) {
      console.log(error)      
    }
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
      <br/>
      <Link to='home'>Go Home!</Link>
    </div>
  )
}

export default Login;
