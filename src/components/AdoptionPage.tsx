import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dog } from "../types/Types";
import DogCard from "./DogCard";

export default function AdoptionPage() {  
  const [adoptedDog, setAdoptedDog] = useState<Dog>({
    id: '',
    name: '',
    img: '',
    age: 0,
    breed: '',
    zip_code: ''
  });

  const { state } = useLocation();
  const { dogMatch } = state;
    
  useEffect(() => {
    getAdoptedDog([dogMatch])
  }, [])
  
  function getAdoptedDog(dogIDarr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIDarr),
      headers: { "Content-type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => setAdoptedDog(data[0]))
    .catch(err => console.log(err))
  }

  return <DogCard adoptedDog={adoptedDog} />
}
