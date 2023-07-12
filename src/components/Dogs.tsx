import { useEffect, useState } from "react";
import "../index.css";
import { useLocation, useNavigate } from "react-router-dom";
import SimplePagination from "./SimplePagination";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function Dogs() {
  const [dogObjs, setDogObjs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIndex, setSearchIndex] = useState(0);
  
  const navigate = useNavigate();

  const { state } = useLocation();
  const { breeds, zipCodes, minAge, maxAge } = state;
  
  const displaySize = 7;

  useEffect(() => {
    getDogIds();
  }, [searchIndex]);

  const getDogIds = () => {
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=${displaySize}&from=${searchIndex}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        getDogObjs(data.resultIds);
      });
  }

  const getDogObjs = (arr: Dog[]) => {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDogObjs(data);
      });
  }


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSearchIndex((page - 1) * displaySize)
  }

  return (
    <div>
      <button onClick={() => navigate('/home')}>Back to Search</button>
      <table id="dogTable">
        <thead>
          <tr>
            <th>PIC</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>BREED</th>
            <th>ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {dogObjs.map((dogObj: Dog) => {
            return (
              <tr key={dogObj.id}>
                <td>
                  <img src={dogObj.img} style={{ width: "5rem", height: "5rem" }} />
                </td>
                <td>{dogObj.name}</td>
                <td>{dogObj.age}</td>
                <td>{dogObj.breed}</td>
                <td>{dogObj.zip_code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SimplePagination 
        className="pagination-bar"  
        currentPage={currentPage}
        onPageChange={(page: number) => handlePageChange(page)}
      />
    </div>
  );
}
