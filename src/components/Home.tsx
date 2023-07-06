import { ChangeEvent, useEffect, useState } from 'react';
import Dogs from './Dogs';

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState('');

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

  // const handleSubmit = () => {
  //   setBreed(breed)
  // }
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
