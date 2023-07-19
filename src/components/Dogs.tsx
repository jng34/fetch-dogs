import React, { useEffect, useMemo, useState } from "react";
import "../index.css";
import SimplePagination from "./SimplePagination";
import { querySearch } from "./querySearch";
import Pagination from "./Pagination";
import DogsTable from "./DogsTable";

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
  const [toggleMatch, setToggleMatch] = useState(false);
  const [dogMatch, setDogMatch] = useState(''); //simplePagination
  const [dogObjs, setDogObjs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextDogs, setNextDogs] = useState('');
  // const [searchIndex, setSearchIndex] = useState(0);

  const displaySize = 10;

  useEffect(() => {
    getDogIds();
  }, [breeds, zipCodes, minAge, maxAge, toggleMatch]);

  //custom URI query search with filters
  const newURI = querySearch(breeds, zipCodes, minAge, maxAge);
  console.log(newURI)
  // const newURI = querySearch(breeds, zipCodes, minAge, maxAge, displaySize, searchIndex);

  function getDogIds() {
    fetch(newURI, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setNextDogs(data.next);
        setTotalDogs(data.total);
        getDogObjs(data.resultIds);
        getDogMatch(data.resultIds);
      });
  }
  console.log(nextDogs)

  function getDogObjs(arr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDogObjs(data);
      })
  };


  function getDogMatch(arr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setDogMatch(data.match))
  };

  const handleDogMatch = () => {
    setToggleMatch(true);
    getDogObjs([dogMatch]);

  }

  // Need to configure
  const displayDogCard = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    console.log(e)
    return
  }

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   setSearchIndex((page - 1) * displaySize);
  // };
  // const disableNext = searchIndex + displaySize >= totalDogs; //simplePagination
  
  return (
    <div>
      <div style={{ margin: '20px'}}>
        <h4 style={{ display: 'inline', marginRight: '200px' }}>Total: {totalDogs}</h4>
        Choose a dog or <button id="match" type="button" onClick={handleDogMatch}>MATCH ME</button>
      </div>
      <Pagination
        className="pagination-bar"
        totalCount={totalDogs}
        currentPage={currentPage}
        pageSize={displaySize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      <DogsTable 
        dogObjs={dogObjs}
        currentPage={currentPage}
        displaySize={displaySize}
        toggleMatch={toggleMatch}
        setToggleMatch={setToggleMatch}
      />
      <Pagination
        className="pagination-bar"
        totalCount={totalDogs}
        currentPage={currentPage}
        pageSize={displaySize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      {/* <SimplePagination
        className="pagination-bar"
        currentPage={currentPage}
        disableNext={disableNext}
        onPageChange={(page: number) => handlePageChange(page)}
      /> */}
    </div>
  );
}
