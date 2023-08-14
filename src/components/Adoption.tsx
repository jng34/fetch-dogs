import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dog } from "../utils/types";
import DogCard from "./DogCard";
import { fetchPOST } from "../functions/fetch";

export default function Adoption() {  
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
    fetchPOST('/dogs', [dogMatch])
      .then((res) => res.json())
      .then((data) => setAdoptedDog(data[0]))
      .catch(err => console.log(err))
  }, [])
  
  return <DogCard adoptedDog={adoptedDog} />
}
