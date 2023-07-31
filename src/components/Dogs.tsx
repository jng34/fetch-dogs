import { useEffect, useState } from "react";
import { querySearch } from "./queryParams";
import { Dog, DogProps } from "./Types";
import Pagination from "./Pagination";
import DogsTable from "./DogsTable";

const displaySize = 10;

export default function Dogs({
  breeds,
  zipCodes,
  minAge,
  maxAge,
  uri,
  currentPage,
  setUri,
  setCurrentPage,
  onSortName,
  onSortAge,
  onSortBreed,
}: DogProps) {
  const [toggleMatch, setToggleMatch] = useState<boolean>(false);
  const [dogMatch, setDogMatch] = useState<string>("");
  const [dogObjs, setDogObjs] = useState<Dog[]>([]);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [prevDogsURI, setPrevDogsURI] = useState<string>("");
  const [nextDogsURI, setNextDogsURI] = useState<string>("");

  useEffect(() => {
    getDogIds(uri);
  }, [uri, currentPage, breeds, zipCodes, minAge, maxAge, toggleMatch]);

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
      });
  }

  function getDogMatch(dogIDarr: string[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIDarr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setDogMatch(data.match));
  }

  const handleDogMatch = () => {
    setToggleMatch(true);
    getDogObjs([dogMatch]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) return setUri(uri);
    const searchIndex = (page - 1) * displaySize;
    if (searchIndex >= 100 && searchIndex % 100 === 0) {
      return setUri(
        querySearch(breeds, zipCodes, minAge, maxAge, nextDogsURI)
      );
    }
    if (searchIndex < 100 && searchIndex % 100 === 0) {
      return setUri(
        querySearch(breeds, zipCodes, minAge, maxAge, "", prevDogsURI)
      );
    }
  };

  return (
    <div>
      <div style={{ fontSize: "15px", margin: "20px" }}>
        <span style={{ display: "inline", marginRight: "200px" }}>
          Total: {totalDogs}
        </span>
        Choose a dog or{" "}
        <button id="matchButton" type="button" onClick={handleDogMatch}>
          Match Me!
        </button>
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
        onSortName={onSortName}
        onSortAge={onSortAge}
        onSortBreed={onSortBreed}
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
