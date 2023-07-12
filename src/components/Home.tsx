import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dogs from './Dogs';
import { Placeholder } from 'react-bootstrap';

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { name } = state;

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

  const handleSelectBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    let breedArr: any = [...breeds, e.target.value];
    setBreeds(breedArr);
  }
  
  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    let zipArr: any = [...zipCodes, e.target.value];
    setZipCodes(zipArr)
  }

  const handleMinAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMinAge(Number(e.target.value))
  }

  const handleMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxAge(Number(e.target.value))
  }

  const handleSearchDogs = () => {
    navigate('/dogs', { 
      state: {
        breeds,
        zipCodes,
        minAge,
        maxAge
      }
    })
  }
  
  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate("/");
  }

  return (
    <div>
      <header>
        Welcome to Fetch Dogs, {name}!
      </header>
      <br/>
      <button onClick={handleLogOut}>Log out</button>
      <br/>
      <h4>Search:</h4>
      <form onSubmit={handleSearchDogs}>
        <label>Breed:&nbsp;&nbsp;</label>
        <select name={'breeds'} onChange={handleSelectBreed}>
          <option value="">All</option>
          {dogBreeds.map((breed) => (
            <option key={i++} value={breed}>{breed}</option>
          ))}
        </select>
          <br/>
        <label>Zip Code:&nbsp;&nbsp;</label>
        <input type='number' name='zipcode' placeholder='...e.g. 10028' onChange={handleZipCode} maxLength={5}/>
          <br/>
        <label>Min age:&nbsp;&nbsp;</label>
        <input type='number' name='minAge' onChange={handleMinAge} min={0} maxLength={2}/>
          <br/>
        <label>Max age:&nbsp;&nbsp;</label>
        <input type='number' name='maxAge' onChange={handleMaxAge} max={100} maxLength={3} />
          <br/>
        <input type='submit' value='Search Dogs' />
        {/* <Dogs breed={breed} /> */}
      </form>
    </div>
  )
}
