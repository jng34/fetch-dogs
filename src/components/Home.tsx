import React, { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import Dogs from "./Dogs";

interface User {
  name: string,
  email: string
}

interface Props {
  user: User
  setUser: (user: User) => void
}

export default function Home({ user, setUser }: Props) {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  const navigate = useNavigate();
  
  useEffect(() => {
    getBreeds();
  }, []);
  
  if (!user.name) return <Navigate to="/" replace={true} />;
  
  function getBreeds() {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
    .then((res) => res.json())
    .then((data) => setDogBreeds(data));
  }
  
  const handleLogOut = () => {
    setUser({ name: '', email: '' })
    return <Navigate to='/' replace />
  };
  
  
  
  const handleSelectBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    let breedArr: any = [...breeds, e.target.value];
    console.log(breedArr);
    setBreeds(breedArr);
  };
  
  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    let zipArr: any = [...zipCodes, e.target.value];
    setZipCodes(zipArr);
  };
  
  const handleMinAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMinAge(Number(e.target.value));
  };

  const handleMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxAge(Number(e.target.value));
  };
  
  const handleSearchDogs = () => {
    navigate("/dogs", {
      state: {
        breeds,
        zipCodes,
        minAge,
        maxAge,
      },
    });
  };

  const removeFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedBreed = e.currentTarget.getAttribute("value");
    const newBreeds = breeds.filter((breed: string) => breed !== selectedBreed);
    setBreeds(newBreeds);
  };
  

  const showBreedFilters = breeds.map((breed: string, idx: number) => {
    return (
      <div key={idx}>
        <button
          type="button"
          className="deleteButton"
          value={breed}
          onClick={(e) => removeFilter(e)}
        >
          X
        </button>
        &nbsp;
        <span>{breed}</span>
      </div>
    );
  });

  
  let i = 0; // Index as keys for breed options
  
  return (
    <div>
      <header className="header">
        <h2>Welcome to Fetch Dogs {user.name ? `, ${user.name}` : ""}!
        {/* <h2>Welcome to Fetch Dogs {state && state.name ? `, ${state.name}` : ""}! */}
        <button style={{ marginLeft: "200px" }} onClick={handleLogOut}>
          Log Out
        </button>
        </h2>
      </header>
      <div className="row">
        <div className="leftCol">
          <h4>Search:</h4>
          <form onSubmit={handleSearchDogs}>
            <label>Breed:&nbsp;&nbsp;</label>
            <select name={"breeds"} onChange={handleSelectBreed}>
              <option value="">All</option>
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
              placeholder="...e.g. 10028"
              onChange={handleZipCode}
              maxLength={5}
            />
            <br />
            <label>Min age:&nbsp;&nbsp;</label>
            <input
              type="number"
              name="minAge"
              onChange={handleMinAge}
              min={0}
              maxLength={2}
            />
            <br />
            <label>Max age:&nbsp;&nbsp;</label>
            <input
              type="number"
              name="maxAge"
              onChange={handleMaxAge}
              max={100}
              maxLength={3}
            />
            <br />
          </form><br/>
          <p>Filters</p>
          {showBreedFilters}
        </div>
        <div className="rightCol">
          <Dogs breeds={breeds} />
        </div>
      </div>
    </div>
  );
}
