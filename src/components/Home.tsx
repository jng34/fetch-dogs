import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import { Container, Row, Col } from "react-bootstrap";
import Dogs from "./Dogs";

export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getBreeds();
  }, []);

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
    localStorage.removeItem("user");
    navigate("/");
  };

  let i = 0;

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
    const selectedBreed = e.currentTarget.getAttribute('value');
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

  return (
    <Container className="pageLayout">
      <header>
        Welcome to Fetch Dogs {state && state.name ? `, ${state.name}` : ""}!
        <button style={{ marginLeft: "100px" }} onClick={handleLogOut}>
          Log Out
        </button>
      </header>
      <Row>
        <Col>
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
          </form>
        </Col>
        <Col>
          <Row>
            <p>Filters</p>
            {showBreedFilters}
          </Row>
          <Dogs breeds={breeds} />
        </Col>
      </Row>
    </Container>
  );
}
