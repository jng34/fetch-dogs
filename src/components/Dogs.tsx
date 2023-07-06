import { useEffect, useState } from "react";

interface DogSearch {
  breed?: string,
  zipCode?: string,
  ageMin?: string,
  ageMax?: string,
}

export default function Dogs({ breed, zipCode, ageMin, ageMax }: DogSearch) {
  const [dogs, setDogs] = useState([]);

  //render all dogs of breed
  useEffect(() => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => setDogs(data.resultIds))
  }, [])

  return (
    <div>
      <header>All dogs in a breed</header>
      <p>{dogs}</p>
    </div>
  )
}
