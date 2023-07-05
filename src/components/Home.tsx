import { useEffect, useState } from 'react';

function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setDogs(data));
  }, [])

  console.log(dogs)
  let i = 0;

  const renderDogBreeds = 
    dogs.map((breed: string) => (
      <li key={i++}>{breed}</li>
    ))

  return (
    <div>
      <header>
        Home of Fetch Dogs!
      </header>
      <ul>{renderDogBreeds}</ul>
    </div>
  )
}


export default Home;