import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../index.css";

export default function Login() {
  const [countDown, setCountDown] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    invalidEmail: '',
  })

  const emailCheck = /.+\@.+\..+/;
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setErrors({...errors});
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
      if (auth.status === 200) {
        localStorage.setItem('user', name)
        navigate("/home", { state: { name } });
      } 
    } catch (error) {
      navigate("/error")    
    }
  }

  //Check if session exists
  const setTimer = (name: string): void => {
    if (countDown === 0) navigate("/home", { state: { name } });
    setTimeout(() => {
      setCountDown(countDown-1);
    }, 1000)
  }

  const user = localStorage.getItem('user'); 
  if (user) {
    setTimer(user);
    return (
      <div className='pageLayout'>
        <h4>Welcome to Fetch Dogs, {user}!</h4><br/>
        <Link to={'/home'}>Search Dogs</Link><br/>
        <p>You will be redirected in.....<b>{countDown}s</b></p>
      </div>
    )
  }
  
  
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

