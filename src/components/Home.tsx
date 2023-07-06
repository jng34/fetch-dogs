import { ChangeEvent, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Dogs from './Dogs';

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState("");

  useEffect(() => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setDogs(data));
  }, [])

  const renderDogBreeds = 
    dogs.map((breed) => (
      <option key={v4()} value={breed}>{breed}</option>
    ))

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setBreed(e.target.value);
  }

  return (
    <div>
      <header>
        Home of Fetch Dogs!
      </header>
      <br/>
      <label>
        Search by breed:&nbsp;&nbsp;
        <select value={breed} onChange={handleSelect}>
          {renderDogBreeds}
        </select>
      </label>
      <Dogs breed={breed}/>
    </div>
  )
}
