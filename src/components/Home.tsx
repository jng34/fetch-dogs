import { ChangeEvent, useEffect, useState } from 'react';
import Dogs from './Dogs';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setDogs(data));
  }, [])

  let i=0;
  const renderDogBreeds = 
    dogs.map((breed) => (
      <option key={i++} value={breed}>{breed}</option>
    ))

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setBreed(e.target.value);
  }
  
  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate("/");
  }

  return (
    <div>
      <header>
        Welcome to Fetch Dogs!
      </header>
      <br/>
      <label>
        Search by breed:&nbsp;&nbsp;
        <select value={breed} onChange={handleSelect}>
          {renderDogBreeds}
        </select>
      </label>
      <br/>
      <Link to={"/dogs"}>Check out Dogs</Link>
      <br/>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
