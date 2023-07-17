import React, { useEffect, useState } from "react";
import "../index.css";
import SimplePagination from "./SimplePagination";
import { querySearch } from "./querySearch";

interface Props {
  breeds: string[],
  zipCodes: string[],
  minAge: number,
  maxAge: number,
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}


export default function Dogs({ breeds, zipCodes, minAge, maxAge }: Props) {
  const [dogMatch, setDogMatch] = useState('');
  const [dogObjs, setDogObjs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIndex, setSearchIndex] = useState(0);

  const displaySize = 50;

  useEffect(() => {
    getDogIds();
  }, [searchIndex, breeds, zipCodes, minAge, maxAge]);

  //custom URI query search with filters
  const newURI = querySearch(breeds, zipCodes, minAge, maxAge, displaySize, searchIndex);

  const getDogIds = () => {
    fetch(newURI, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalDogs(data.total);
        getDogObjs(data.resultIds);
        getDogMatch(data.resultIds);
      });
  }


  const getDogObjs = (arr: string[]) => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setDogObjs(data))
  };


  const getDogMatch = (arr: string[]) => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDogMatch(data.match)
      })
  };

  const handleDogMatch = () => {
    getDogObjs([dogMatch]);
  }

  const displayDogCard = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    console.log(e)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchIndex((page - 1) * displaySize);
  };

  const disableNext = searchIndex + displaySize >= totalDogs;

  return (
    <div>
      <div style={{ margin: '20px'}}>
        <h4 style={{ display: 'inline', marginRight: '200px' }}>Total: {totalDogs}</h4>
        Choose a dog or <button id="match" type="button" onClick={handleDogMatch}>MATCH ME</button>
      </div>
      <table id="dogTable">
        <thead>
          <tr className="dogTableRow">
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
              <tr key={dogObj.id} className="dogTableRow" onClick={(e) => displayDogCard(e)}>
                <td>
                  <img
                    src={dogObj.img}
                    style={{ width: "5rem", height: "5rem" }}
                  />
                </td>
                <td>{dogObj.name}</td>
                <td>{dogObj.age}</td>
                <td>{dogObj.breed}</td>
                <td>{dogObj.zip_code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SimplePagination
        className="pagination-bar"
        currentPage={currentPage}
        disableNext={disableNext}
        onPageChange={(page: number) => handlePageChange(page)}
      />
    </div>
  );
}
