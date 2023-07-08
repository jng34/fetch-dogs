import { useEffect, useState } from "react";
import DogCard from "./DogCard";
import { Row, Col } from "react-bootstrap";

interface DogSearch {
  breed?: string,
  zipCode?: string,
  ageMin?: string,
  ageMax?: string,
}
interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export default function Dogs({ breed, zipCode, ageMin, ageMax }: DogSearch) {
  const [dogObjs, setDogObjs] = useState([]);

  useEffect(() => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => getDogObjs(data.resultIds))
  }, [breed])

  
  function getDogObjs(arr: Dog[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data => setDogObjs(data))
  }

  // const renderDogs = dogObjs.map((dogObj: Dog) => (
  //   <DogCard key={dogObj.id} dogObj={dogObj} />
  // ))

  return (
    <div>
      <header>All dogs in a breed</header>
      <Row xs={1} md={5} className="g-4">
        {Array.from(dogObjs).map((dogObj: Dog, idx) => (
          <Col key={idx}>
            <DogCard dogObj={dogObj} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
