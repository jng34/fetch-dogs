import { useEffect, useState } from "react";
import { querySearch } from "../functions/QueryParams";
import { Dog, DogProps } from "../types/Types";
import { displaySize } from "../constants/Constants";
import Pagination from "./Pagination";
import DogsTable from "./DogsTable";
import MatchModal from "./MatchModal";
import { fetchGET, fetchPOST } from "../functions/APIs";


export default function Dogs({
  breeds,
  zipCode,
  minAge,
  maxAge,
  uri,
  currentPage,
  sortName,
  sortAge,
  sortBreed,
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
  }, [uri, currentPage, breeds, zipCode, minAge, maxAge]);

  function getDogIds(uri: string) {
    fetchGET(uri)
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
    fetchPOST('/dogs', dogIDarr)
      .then((res) => res.json())
      .then((data) => setDogObjs(data))
      .catch(err => console.log(err))
  }

  function getDogMatch(dogIDarr: string[]) {
    fetchPOST('/dogs/match', dogIDarr)
      .then((res) => res.json())
      .then((data) => setDogMatch(data.match))
      .catch(err => console.log(err))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) return setUri(uri);
    const searchIndex = (page - 1) * displaySize;
    if (searchIndex >= 100 && searchIndex % 100 === 0) {
      return setUri(
        querySearch(breeds, zipCode, minAge, maxAge, nextDogsURI)
      )
    };
    if (searchIndex < 100 && searchIndex % 100 === 0) {
      return setUri(
        querySearch(breeds, zipCode, minAge, maxAge, "", prevDogsURI)
      )
    };
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h6 style={{ display: "inline-flex", marginRight: "200px" }}>
        Total: {totalDogs}
      </h6>
      Choose a dog or{" "}
      <button id="matchButton" className="button" type="button" onClick={() => setToggleMatch(true)}>
        Match Me!
      </button>
      
      <div>
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
          sortName={sortName}
          sortAge={sortAge}
          sortBreed={sortBreed}
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
        <MatchModal
          toggleMatch={toggleMatch}
          setToggleMatch={setToggleMatch}
          dogMatch={dogMatch}
        />
      </div>
    </div>
  );
}
