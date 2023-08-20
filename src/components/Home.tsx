import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { querySearch, minAgeSearch, maxAgeSearch } from "../functions/queries";
import { baseURI } from '../utils/constants';
import { sortFunction } from "../functions/sort";
import { ageFilter, breedFilter, zipCodeFilter } from "../functions/searchFilters";
import { fetchGET, fetchPOST } from "../functions/fetch";
import { HomeProps } from "../utils/types";
import Filters from "./Filters";
import Dogs from "./Dogs";


export default function Home({ name }: HomeProps) {
  // States 
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [sortName, setSortName] = useState<boolean>(false);
  const [sortAge, setSortAge] = useState<boolean>(false);
  const [sortBreed, setSortBreed] = useState<boolean>(false);
  const [uri, setUri] = useState<string>(`${baseURI}/dogs/search?size=100&sort=breed:asc`);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Auth check 
    fetchGET(`${baseURI}/dogs/breeds`)
      .then((res) => {
        if (res.status === 401) navigate("/");
        return res.json();
      })
      .then((data) => setDogBreeds(data));
  }, []);
  

  // Log out 
  const handleLogOut = () => fetchPOST('/auth/logout').then(() => navigate("/"));
  
  const removeBreedFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const removeBreed = e.currentTarget.getAttribute("value");
    const filteredBreeds = breeds.filter((breed: string) => breed !== removeBreed);
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
  //Configure
  const onReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(input => input.value = '');
    setUri(`${baseURI}/dogs/search?size=100&sort=breed:asc`);
    setSelected('none');
    setBreeds([]);
    setMinAge(0);
    setMaxAge(0);
    setZipCode('');
  }
  
  return (
    <Container>
      <header id="header">
        <h2 onClick={() => navigate('/home')}>Welcome to Fetch Dogs Adoption, {name}!</h2>&nbsp;&nbsp;&nbsp;
        <button id="logoutButton" className="button" onClick={handleLogOut}>Log Out</button>
      </header>
      <Row>
        <Col sm={4}>
          <h4>Search:</h4>
          <form>
            <ul className="form-wrapper">
              <li className="form-row">
                <label htmlFor="breed">Breed:&nbsp;&nbsp;</label>
                <select name={"breeds"} value={selected} onChange={(e) => breedFilter(e.target.value, breeds, setBreeds, uri, setUri, setCurrentPage, setSelected)}>
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
          <button id="resetButton" className="button" type="button" onClick={onReset}>
            Reset
          </button>
          <br /><br />
          <h5>Filters</h5>
          {showBreedFilters}
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
