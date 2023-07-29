import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Dogs from "./Dogs";
import { querySearch, baseURI, breedSearch, zipSearch, minAgeSearch, maxAgeSearch } from "./queryParams";
import { sortFunction } from "./sortFunction";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [zip, setZip] = useState("");
  const [zipCodes, setZipCodes] = useState([]);
  const [zipError, setZipError] = useState(false);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [sortName, setSortName] = useState(false);
  const [sortAge, setSortAge] = useState(false);
  const [sortBreed, setSortBreed] = useState(false);
  const [uri, setUri] = useState(baseURI);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getBreeds();
  }, [breeds, zipCodes, minAge, maxAge, sortName, sortAge, sortBreed]);

  
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

  const handleLogOut = () => {
    fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/"));
  };


  // Breeds
  const handleSelectBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = e.target.value;
    if (selectedBreed === "All") {
      setBreeds([]);
      setUri(querySearch([], [], 0, 0));
      return;
    }
    let breedArr: any = [...breeds, e.target.value];
    setBreeds(breedArr);
    let query = breedSearch(breedArr);
    setUri(uri + query);
    setCurrentPage(1);
  };

  const removeBreedFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const removeBreed = e.currentTarget.getAttribute("value");
    const filteredBreeds = breeds.filter(
      (breed: string) => breed !== removeBreed
    );
    setBreeds(filteredBreeds);
    if (filteredBreeds.length === 0) {
      return setUri(querySearch(filteredBreeds, zipCodes, minAge, maxAge));
    }
    if (removeBreed) {
      let newURI = uri.replace(`&breeds=${encodeURIComponent(removeBreed)}`, '');
      setUri(newURI);
    }
  };


  // Zip Codes
  const handleZipCode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const input: string | null = e.currentTarget.getAttribute("value");
    if (
      (input && input.length > 5) ||
      Number(input) < 1 ||
      Number(input) > 99950
    )
      return setZipError(true);
    const zipArr: any = [...zipCodes, input];
    setZipCodes(zipArr);
    setZipError(false);
    let query = zipSearch(zipArr);
    setUri(uri + query);
  };

  const removeZipFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let removeZip: string | null = e.currentTarget.getAttribute("value");
    if (removeZip) {   
      const filteredZips = zipCodes.filter((zip: string) => {
        if (removeZip) return parseInt(zip) !== parseInt(removeZip);
      });
      setZipCodes(filteredZips);
      let newURI = uri.replace(`&zipCodes=${encodeURIComponent(removeZip)}`, '');
      setUri(newURI);
    }
  };

  // Min Age
  const handleMinAge = (e: ChangeEvent<HTMLInputElement>) => {
    const prevMin = minAge;
    const newMin = Number(e.target.value);
    setMinAge(newMin);
    let newURI = '';
    if (newMin > 0) {
      if (uri.includes(minAgeSearch(prevMin))) {
        newURI = uri.replace(minAgeSearch(prevMin), minAgeSearch(newMin)); 
      } else {
        newURI = uri + minAgeSearch(newMin);
      }
    } else {
      newURI = uri.replace(minAgeSearch(prevMin), minAgeSearch(newMin)); 
    }
    setUri(newURI);
  };


  // Max Age
  const handleMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
    const prevMax = maxAge;
    const newMax = Number(e.target.value);
    setMaxAge(newMax);
    let newURI = '';
    if (newMax > 0) {
      if (uri.includes(maxAgeSearch(prevMax))) {
        newURI = uri.replace(maxAgeSearch(prevMax), maxAgeSearch(newMax)); 
      } else {
        newURI = uri + maxAgeSearch(newMax);
      }
    } else {
      newURI = uri.replace(maxAgeSearch(prevMax), maxAgeSearch(newMax)); 
    }
    setUri(newURI);
  };


  // Reset
  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBreeds([]);
    setZip("");
    setZipCodes([]);
    setZipError(false);
    setMinAge(0);
    setMaxAge(0);
    setUri(baseURI);
  };


  const showBreedFilters = breeds.map((breed: string, idx: number) => {
    return (
      <div key={idx}>
        <button
          type="button"
          className="deleteButton"
          value={breed}
          onClick={(e) => removeBreedFilter(e)}
        >
          X
        </button>
        &nbsp;
        <span>{breed}</span>
      </div>
    );
  });

  const showZipFilters = zipCodes.map((zip: string, idx: number) => {
    let zipStr = zip;
    if (Number(zip) < 10000) zipStr = zip.padStart(5, "0");
    return (
      <div key={idx}>
        <button
          type="button"
          className="deleteButton"
          value={zipStr}
          onClick={(e) => removeZipFilter(e)}
        >
          X
        </button>
        &nbsp;
        <span>{zipStr}</span>
      </div>
    );
  });



  // Functions that sort by field
  // const handleSortByName = () => {
  //   setSortName(!sortName);
  //   const sortRegEx = /&sort=.+:(a|de)sc/;
  //   let queryStr = ''; 
  //   if (sortRegEx.test(uri)) {
  //     queryStr = uri.replace(sortRegEx, '&sort=name:asc')
  //   } else {
  //     queryStr = sortByField(uri, 'name', sortName);
  //   }
  //   setUri(queryStr);
  // }

  // const handleSortByAge = () => {
  //   setSortAge(!sortAge);
  //   const queryStr = sortByField(uri, 'age', sortAge);
  //   setUri(queryStr);
  // }
  
  // const handleSortByBreed = () => {
  //   setSortBreed(!sortBreed);
  //   const queryStr = sortByField(uri, 'breed', sortBreed);
  //   setUri(queryStr);
  // }



  return (
    <Container>
      <header className="header">
        <h2 style={{ display: "inline" }}>Welcome to Fetch Dogs Adoption!</h2>
        <button
          style={{ marginInline: "300px" }}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </header>
      <Row>
        <Col sm={4}>
          <h4>Search:</h4>
          <form onSubmit={onReset}>
            <label>Breed:&nbsp;&nbsp;</label>
            <select name={"breeds"} onChange={handleSelectBreed}>
              <option value="All">All</option>
              {dogBreeds.map((breed, idx) => (
                <option key={idx} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
            <br />
            <label>Zip Code:&nbsp;&nbsp;</label>
            <input
              type="number"
              name="zipcode"
              placeholder="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <button
              style={{ cursor: "pointer" }}
              type="button"
              value={zip}
              onClick={handleZipCode}
            >
              Set
            </button>
            <br />
            {zipError ? (
              <>
                <span style={{ color: "red" }}>
                  Please enter a valid zip code
                </span>
                <br />
              </>
            ) : (
              <></>
            )}
            <label>Min age:&nbsp;&nbsp;</label>
            <input
              type="number"
              name="minAge"
              placeholder="min"
              onChange={handleMinAge}
              min={0}
            />
            <br />
            <label>Max age:&nbsp;&nbsp;</label>
            <input
              type="number"
              name="maxAge"
              placeholder="max"
              onChange={handleMaxAge}
              max={100}
            />
            <br />
            <br />
            <button id="reset" type="submit">
              RESET
            </button>
          </form>
          <br />
          <p>Filters</p>
          {showBreedFilters}
          {showZipFilters}
        </Col>
        <Col sm={8}>
          <Dogs
            breeds={breeds}
            zipCodes={zipCodes}
            minAge={minAge}
            maxAge={maxAge}
            uri={uri}
            setUri={setUri}
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
