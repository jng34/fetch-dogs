import React, { ChangeEvent, FormEvent, createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Dogs from "./Dogs";
import { querySearch } from "./querySearch";


export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [zip, setZip] = useState('');
  const [zipCodes, setZipCodes] = useState([]);
  const [zipError, setZipError] = useState(false);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [newURI, setNewURI] = useState(
    'https://frontend-take-home-service.fetch.com/dogs/search?size=100'
  );
  
  const navigate = useNavigate();
  // console.log(newURI)
  
  useEffect(() => {
    getBreeds();
    setNewURI(querySearch(breeds, zipCodes, minAge, maxAge));
  }, []);
  
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
    })
      .then(() => navigate("/"));
  };

  const handleSelectBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'All') return setBreeds([]);
    let breedArr: any = [...breeds, e.target.value];
    setBreeds(breedArr);
  };

  const handleZipCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input: string | null = e.currentTarget.getAttribute("value");
    if (input && input.length > 5 || Number(input) < 1 || Number(input) > 99950) return setZipError(true);
    const zipArr: any = [...zipCodes, input];
    setZipCodes(zipArr);
    setZipError(false);
  };

  const handleMinAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMinAge(Number(e.target.value));
  };

  const handleMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxAge(Number(e.target.value));
  };


  const onReset = (e: FormEvent<HTMLFormElement>) => {
    //refactor to setNewURI to default endpoint
    setBreeds([]);
    setZip('');
    setZipCodes([]);
    setZipError(false);
    setMinAge(0);
    setMaxAge(0);
  }


  const removeBreedFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedBreed = e.currentTarget.getAttribute("value");
    if (selectedBreed === 'All') return setBreeds([]);
    const filteredBreeds = breeds.filter((breed: string) => breed !== selectedBreed);
    setBreeds(filteredBreeds);
  };

  const removeZipFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let selectedZip: string | null = e.currentTarget.getAttribute("value");
    const filteredZips = zipCodes.filter((zip: string) => {
      if (selectedZip) return parseInt(zip) !== parseInt(selectedZip);
    });
    setZipCodes(filteredZips);
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
    if (Number(zip) < 10000) zipStr = zip.padStart(5, '0');
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

  let i = 0; // Index as keys for breed options

  return (
    <div>
      <header className="header">
        <h2 style={{ display: 'inline' }}>
          Welcome to Fetch Dogs Adoption!
        </h2>
        <button id="logout" style={{ marginInline: '300px'}} onClick={handleLogOut}>
          Log Out
        </button>
      </header>
      <div className="row">
        <div className="leftCol">
          <h4>Search:</h4>
          <form onSubmit={onReset}>
            <label>Breed:&nbsp;&nbsp;</label>
            <select name={"breeds"} onChange={handleSelectBreed}>
              <option value="All">All</option>
              {dogBreeds.map((breed) => (
                <option key={i++} value={breed}>
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
            <button style={{ cursor: "pointer" }} type="button" value={zip} onClick={handleZipCode}>
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
            <br /><br />
            <button id="reset" type="submit">RESET</button>
          </form>
          <br />
          <p>Filters</p>
          {showBreedFilters}
          {showZipFilters}
        </div>
        <div className="rightCol">
          <Dogs 
            breeds={breeds} 
            zipCodes={zipCodes}
            minAge={minAge}
            maxAge={maxAge}
            newURI={newURI}
            setNewURI={setNewURI}
          />
        </div>
      </div>
    </div>
  );
}
