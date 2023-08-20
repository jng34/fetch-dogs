import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURI } from '../utils/constants';
import { Player } from '@lottiefiles/react-lottie-player';
import { Col, Container, Row } from 'react-bootstrap';
import { emailCheck } from '../utils/constants';
import { fetchGET, fetchPOST } from '../functions/fetch';
import { LoginProps } from '../utils/types';

export default function Login({ name, setName }: LoginProps) {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [badEmailErr, setBadEmailErr] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchGET(`${baseURI}/dogs/breeds`)
      .then(data => {
        if (data.status === 200) navigate('/home');
      })
      .catch(console.error);
  },[]);
    
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameErr('');
    setEmailErr('');
    setBadEmailErr('');
    //Authenticate user
    try {
      const auth = await fetchPOST(`/auth/login`, { name, email })
      if (auth.status === 200) {
        navigate("/home", { state: { name }});
      } else {
        if (!name) setNameErr('Name is required');
        if (!email) setEmailErr('Email is required');
        if (email && !emailCheck.test(email)) setBadEmailErr('Invalid email');
      } 
    } catch (err) {
      console.log(err)
      navigate("/error");  
    }
  }

  return (
    <Container>
      <Row className="d-flex align-items-center" onClick={() => navigate('/')}>
        <Col md={4} className='text-end'>
          <h1>Fetch Dogs Adoption</h1>
          <h6>Save and bring home a dog today!</h6>
        </Col>
        <Col xs={1} >
          <Player
            autoplay
            loop
            background=''
            speed={1}
            src="https://lottie.host/f5297362-d27b-470a-9bdf-bd31f933bce9/IQVCfsP6HQ.json"
            style={{ height: "200px", width: "200px" }}
            />
        </Col>
      </Row>
      <Row style={{ marginLeft: '100px'}}>
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
      </Row>
    </Container>
  )
}

