import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dogs from './Dogs';

export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breed, setBreed] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setDogBreeds(data));
  }, [])

  let i=0;
  const renderDogBreeds = 
    dogBreeds.map((breed) => (
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
      <button onClick={handleLogOut}>Log out</button>
      <br/>
      <label>
        Search by breed:&nbsp;&nbsp;
        <select value={breed} onChange={handleSelect}>
          <option value="">All</option>
          {renderDogBreeds}
        </select>
      </label>
      <br/>
      <Dogs breed={breed} />
    </div>
  )
}
