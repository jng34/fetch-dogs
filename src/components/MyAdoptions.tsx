import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dog } from "./Types";
import DogCard from "./DogCard";

export default function MyAdoptions() {
  const location = useLocation();
  const { dogMatch } = location.state;

  const [adoptedDog, setAdoptedDog] = useState<Dog>({
    id: '',
    name: '',
    img: '',
    age: 0,
    breed: '',
    zip_code: ''
  });

  useEffect(() => getAdoptedDog([dogMatch]), [])

  function getAdoptedDog(dogIDarr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIDarr),
      headers: { "Content-type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => setAdoptedDog(data[0]));
  }

  return <DogCard adoptedDog={adoptedDog} />
}
