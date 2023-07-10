import { useEffect, useMemo, useState } from "react";
import DogCard from "./DogCard";
import { Row, Col } from "react-bootstrap";
import Pagination from "./Pagination";
import '../index.css';

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

let PageSize = 10;

export default function Dogs({ breed }: DogSearch) {
  const [dogObjs, setDogObjs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dogObjs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=100`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      getDogObjs(data.resultIds)
    })
  }, [])

  
  function getDogObjs(arr: Dog[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" }
    })
    .then(res => res.json())
    .then(data => setDogObjs(data))
  }


  const filterDogs = dogObjs.filter((dog: Dog) => dog.breed === breed);

  return (
    <div>
      <table id="dogTable">
        <thead>
          <tr>
            <th>PIC</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>BREED</th>
            <th>ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {dogObjs.map((dogObj: Dog) => {
            return (
              <tr key={dogObj.id}>
                <td><img src={dogObj.img} style={{ width: '5rem'}}/></td>
                <td>{dogObj.name}</td>
                <td>{dogObj.age}</td>
                <td>{dogObj.breed}</td>
                <td>{dogObj.zip_code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <header>All {breed ? <b>{breed}s</b> : "Dogs"}</header>
      <Row xs={1} md={5} className="g-4">
        {Array.from(dogObjs).map((dogObj: Dog, idx) => (
          <Col key={idx}>
            <DogCard dogObj={dogObj} />
          </Col>
        ))}
      </Row> */}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filterDogs.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  )
}
