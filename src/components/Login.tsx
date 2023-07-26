import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";


export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [badEmailErr, setBadEmailErr] = useState('');

  const emailCheck = /.+\@.+\.[a-zA-Z]{2,}/;
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
      if (data.status === 200) navigate('/home');
    };
    checkForAuth().catch(console.error);
  },[]);


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameErr('');
    setEmailErr('');
    setBadEmailErr('');
    //Authenticate user
    try {
      const auth = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, email }),
        headers: { 'Content-type': 'application/json' }
      });
      if (auth.status === 200) {
        navigate("/home", { state: { name }});
      } else {
        if (!name) setNameErr('Name is required');
        if (!email) setEmailErr('Email is required');
        if (email && !emailCheck.test(email)) setBadEmailErr('Invalid email');
      } 
    } catch (error) {
      navigate("/error");  
    }
  }


  return (
    <div className='pageLayout'>
      <h1>Fetch Dogs Adoption</h1>
      <h3>Save and bring home a dog today!</h3>
        <form onSubmit={handleLogin}>
          <label>Name</label><br/>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
          <br/>
          {nameErr ? <span style={{ color: 'red' }}>{nameErr}</span> : <></>}
          <br/>
          <label>Email</label>
          <br/>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          {emailErr ? <span style={{ color: 'red' }}>{emailErr}</span> : <></>}
          {badEmailErr ? <span style={{ color: 'red' }}>{badEmailErr}</span> : <></>}          
          <br/>
          <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

