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
  const [dogObjs, setDogObjs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIndex, setSearchIndex] = useState(0);

  const displaySize = 6;

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
      });
  }


  const getDogObjs = (arr: Dog[]) => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDogObjs(data);
      });
  };

  const displayDogCard = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchIndex((page - 1) * displaySize);
  };

  const disableNext = searchIndex + displaySize >= totalDogs;

  return (
    <div>
      <h4>Total: {totalDogs}</h4>
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
              <tr key={dogObj.id} className="dogTableRow" onClick={displayDogCard}>
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
