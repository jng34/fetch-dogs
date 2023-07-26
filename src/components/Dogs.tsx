import { useEffect, useState } from "react";
import "../index.css";
import { querySearch } from "./querySearch";
import Pagination from "./Pagination";
import DogsTable from "./DogsTable";

interface Props {
  breeds: string[],
  zipCodes: string[],
  minAge: number,
  maxAge: number,
  newURI: string,
  setNewURI: (arg: any) => void,
}

export default function Dogs({ breeds, zipCodes, minAge, maxAge, newURI, setNewURI }: Props) {
  const [toggleMatch, setToggleMatch] = useState(false);
  const [dogMatch, setDogMatch] = useState(''); //simplePagination
  const [dogObjs, setDogObjs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevDogsURI, setPrevDogsURI] = useState('');
  const [nextDogsURI, setNextDogsURI] = useState('');
  const displaySize = 10;

  useEffect(() => {
    getDogIds(newURI);
  }, [newURI, currentPage, toggleMatch]);


  function getDogIds(uri: string) {
    fetch(uri, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.prev) setPrevDogsURI(data.prev);
        setNextDogsURI(data.next);
        setTotalDogs(data.total);
        getDogObjs(data.resultIds);
        getDogMatch(data.resultIds);
      });
  }

  function getDogObjs(dogIDarr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIDarr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDogObjs(data);
      })
  };


  function getDogMatch(dogIDarr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIDarr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setDogMatch(data.match))
  };

  const handleDogMatch = () => {
    setToggleMatch(true);
    getDogObjs([dogMatch]);
  }


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) return setNewURI(querySearch(breeds, zipCodes, minAge, maxAge));
    const searchIndex = ((page - 1) * displaySize);
    if (searchIndex >= 100 && searchIndex % 100 === 0) {
      return setNewURI(querySearch(breeds, zipCodes, minAge, maxAge, nextDogsURI));
    }
    if (searchIndex < 100 && searchIndex % 100 === 0) {
      return setNewURI(querySearch(breeds, zipCodes, minAge, maxAge, '', prevDogsURI));
    }
  };

  
  return (
    <div>
      <div style={{ margin: '20px' }}>
        <h4 style={{ display: 'inline', marginRight: '200px' }}>Total: {totalDogs}</h4>
        Choose a dog or <button id="match" type="button" onClick={handleDogMatch}>MATCH ME</button>
      </div>
      <Pagination
        className="pagination-bar"
        totalCount={totalDogs}
        currentPage={currentPage}
        pageSize={displaySize}
        onPageChange={(page: number) => handlePageChange(page)}
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
        onPageChange={(page: number) => handlePageChange(page)}
      />
    </div>
  );
}
