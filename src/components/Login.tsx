import { FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Home from './Home';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    invalidEmail: '',
  })
  const emailCheck = /.+\@.+\..+/;
  const navigate = useNavigate();

  useEffect(()=>{},[errors])
  
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({...errors});

    if (!name) setErrors({ ...errors, name: 'Name is required' });
    if (!email) setErrors({ ...errors, email: 'Email is required' });
    if (!emailCheck.test(email)) setErrors({ ...errors, invalidEmail: 'Invalid email' });
    console.log(errors)

    //Authenticate user
    try {
      const auth = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, email }),
        headers: { 'Content-type': 'application/json' }
      });
      console.log(auth)
      if (auth.status === 200) {
        // //Reset email and password fields
        // setName('');
        // setEmail('');
        navigate("/home");
      } 
    } catch (error) {
      console.log(error)  
      navigate("/error")    
    }
  }

  return (
    <div>
      <header>Fetch a dog today!</header>
      <form onSubmit={handleLogin}>
        <label>Name</label><br/>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        {!errors.name ? <span style={{ color: 'red' }}>{errors.name}</span> : <></>}<br/>
        <label>Email</label><br/>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        {!errors.email ? <span style={{ color: 'red' }}>{errors.email}</span> : <></>}
        {!errors.invalidEmail ? <span style={{ color: 'red' }}>{errors.invalidEmail}</span> : <></>}<br/>
        <button type='submit'>Submit</button>
      </form>
      <br/>
      <Link to='home'>Go Home!</Link>
    </div>
  )
}

