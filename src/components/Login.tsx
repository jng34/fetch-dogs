import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import "../index.css";

interface User {
  name: string,
  email: string
}

interface Props {
  user: User, 
  setUser: (user: User) => void
}

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
  
  useEffect(() => {
    const checkForAuth = async () => {
      const data = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(data.status)
      if (data.status === 200) navigate('/home');
    };
    checkForAuth().catch(console.error);
  },[]);


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) setErrors({ ...errors, name: 'Name is required' });
    if (!email) setErrors({ ...errors, email: 'Email is required' });
    if (!emailCheck.test(email)) setErrors({ ...errors, invalidEmail: 'Invalid email' });

    //Authenticate user
    try {
      const auth = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, email }),
        headers: { 'Content-type': 'application/json' }
      });
      if (auth.status === 200) navigate("/home", { state: { name }}); 
    } catch (error) {
      navigate("/error")    
    }
  }

  //Check if user auth exists
  // if (user.name) navigate('/home');

  return (
    <div className='pageLayout'>
      <h1>Fetch Dog</h1>
      <h3>Save and bring home a dog today!</h3>
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
    </div>
  )
}

