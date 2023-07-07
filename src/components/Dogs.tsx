import { useEffect, useState } from "react";
import DogCard from "./DogCard";

interface DogSearch {
  breed?: string,
  zipCode?: string,
  ageMin?: string,
  ageMax?: string,
}

export default function Dogs({ breed, zipCode, ageMin, ageMax }: DogSearch) {
  const [dogObjs, setDogObjs] = useState([]);

  //render all dogs of breed
  useEffect(() => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => getDogObjs(data.resultIds))
  }, [breed])
  
  function getDogObjs(arr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data => setDogObjs(data))
  }

  interface Dog {
      id: string
      img: string
      name: string
      age: number
      zip_code: string
      breed: string
  }

  const renderDogs = dogObjs.map((dogObj: Dog) => (
    // <li key={dogObj.id}>{dogObj.name}</li>
    <DogCard key={dogObj.id} dogObj={dogObj} />
  )) 
  console.log(dogObjs)

  return (
    <div>
      <header>All dogs in a breed</header>
      <p>This is where we render all dogs</p>
      <ul>{renderDogs}</ul>
      {/* <DogCard dog={dogObjs} /> */}
    </div>
  )
}
