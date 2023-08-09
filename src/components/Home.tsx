import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { querySearch, minAgeSearch, maxAgeSearch } from "../functions/QueryParams";
import { baseURI } from "../constants/Constants";
import { sortFunction } from "../functions/Sort";
import { Filters, ageFilter, breedFilter, zipCodeFilter } from "../functions/Filters";
import Dogs from "./Dogs";

export default function Home() {
  // States 
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [sortName, setSortName] = useState<boolean>(false);
  const [sortAge, setSortAge] = useState<boolean>(false);
  const [sortBreed, setSortBreed] = useState<boolean>(false);
  const [uri, setUri] = useState<string>(baseURI);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Navigation
  const navigate = useNavigate();

  useEffect(getBreeds, []);
  
  // Auth check 
  function getBreeds() {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.status === 401) navigate("/");
        return res.json();
      })
      .then((data) => setDogBreeds(data));
  }

  // Log out 
  function handleLogOut() {
    fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/"));
  };

  
  function removeBreedFilter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const removeBreed = e.currentTarget.getAttribute("value");
    const filteredBreeds = breeds.filter(
      (breed: string) => breed !== removeBreed
      );
      setBreeds(filteredBreeds);
      if (filteredBreeds.length === 0) {
        return setUri(querySearch(filteredBreeds, zipCode, minAge, maxAge));
      }
      if (removeBreed) {
        let newURI = uri.replace(`&breeds=${encodeURIComponent(removeBreed)}`, '');
        setUri(newURI);
      }
    };
  
  const showBreedFilters = breeds.map((breed: string, idx: number) => {
    return <Filters entry={breed} index={idx} removeBreedFilter={removeBreedFilter} /> 
  });
    
  // Reset 
  const onReset = () => window.location.reload();

  return (
    <Container>
      <header id="header">
        <h2 onClick={() => navigate('/home')}>Welcome to Fetch Dogs Adoption!</h2>&nbsp;&nbsp;&nbsp;
        <button id="logoutButton" onClick={handleLogOut}>Log Out</button>
      </header>
      <Row>
        <Col sm={4}>
          <h4>Search:</h4>
          <form>
            <ul className="form-wrapper">
              <li className="form-row">
                <label htmlFor="breed">Breed:&nbsp;&nbsp;</label>
                <select name={"breeds"} onChange={(e) => breedFilter(e.target.value, breeds, setBreeds, uri, setUri, setCurrentPage)}>
                  <option value='none'>---Select---</option>
                  {dogBreeds.map((breed, idx) => (
                    <option key={idx} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </li>            
              <li className="form-row">
                <label htmlFor="min-age">Min age:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name="minAge"
                  placeholder="min"
                  onChange={(e) => ageFilter(e.target.value, minAge, setMinAge, uri, setUri, minAgeSearch)}
                  min={0}
              />
              </li>            
              <li className="form-row">
                <label htmlFor="max-age">Max age:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name="maxAge"
                  placeholder="max"
                  onChange={(e) => ageFilter(e.target.value, maxAge, setMaxAge, uri, setUri, maxAgeSearch)}
                  max={100}
                />
              </li>             
              <li className="form-row">
              <label htmlFor="zip-code">Zip Code:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name="zip-code"
                  placeholder="zip"
                  value={zipCode}
                  onChange={(e) => zipCodeFilter(e.target.value, setZipCode, uri, setUri)}
                /> 
              </li>
            </ul>
          </form>
          <br />
          <h5>Filters</h5>
          {showBreedFilters}
          <button id="resetButton" type="button" onClick={onReset}>
            Reset
          </button>
        </Col>
        <Col sm={8}>
          <Dogs
            breeds={breeds}
            zipCode={zipCode}
            minAge={minAge}
            maxAge={maxAge}
            uri={uri}
            setUri={setUri}
            sortName={sortName}
            sortAge={sortAge}
            sortBreed={sortBreed}
            onSortName={() => sortFunction('name', sortName, setSortName, uri, setUri)}
            onSortAge={() => sortFunction('age', sortAge, setSortAge, uri, setUri)}
            onSortBreed={() => sortFunction('breed', sortBreed, setSortBreed, uri, setUri)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
}
