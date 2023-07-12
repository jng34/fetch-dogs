import { useEffect, useMemo, useState } from "react";
import DogCard from "./DogCard";
import Pagination from "./Pagination";
import "../index.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  breed?: string
}

// interface DogSearch {
//   breed?: string;
//   zipCode?: string;
//   ageMin?: string;
//   ageMax?: string;
// }

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function Dogs({ breed }: Props) {
  const [dogObjs, setDogObjs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { breeds, zipCodes, minAge, maxAge } = location.state;

  useEffect(() => {
    fetch('https://frontend-take-home-service.fetch.com/dogs/search', {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getDogObjs(data.resultIds);
      });
  }, []);

  function getDogObjs(arr: Dog[]) {
    fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(arr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setDogObjs(data));
  }

  let PageSize = 10;

  const currentDogsToDisplay = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dogObjs.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
          {(currentDogsToDisplay.length > 0
            ? currentDogsToDisplay
            : dogObjs.slice(0, PageSize)
          ).map((dogObj: Dog, idx: number) => {
            return (
              <tr key={dogObj.id}>
                <td>
                  <img src={dogObj.img} style={{ width: "5rem" }} />
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
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={dogObjs.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}
