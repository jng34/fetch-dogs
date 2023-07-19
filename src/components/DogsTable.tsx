import { useEffect, useMemo, useState } from "react";

interface Dog {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
}

interface Props {
  dogObjs: Dog[],
  currentPage: number,
  displaySize: number,
  toggleMatch: boolean,
  // currentDogs: any,
  setToggleMatch: (arg: boolean) => void,
}

export default function DogsTable({ dogObjs, currentPage, displaySize, toggleMatch, setToggleMatch }: Props) {
  
  const currentDogs = useMemo(() => {
    // if (toggleMatch) return dogObjs;
    const firstPageIndex = (currentPage - 1) * displaySize;
    const lastPageIndex = firstPageIndex + displaySize;
    return dogObjs.slice(firstPageIndex, lastPageIndex);
  }, [dogObjs, currentPage, toggleMatch]);
  
  return (
    <div>
      <table id="dogTable">
        <thead>
          <tr className="dogTableRow">
            <th>PIC</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>BREED</th>
            <th>ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {currentDogs.map((dogObj: Dog) => {
            return (
              <tr key={dogObj.id} className="dogTableRow" onClick={(e) => console.log(e)}>
                <td>
                  <img
                    src={dogObj.img}
                    style={{ width: "5rem", height: "5rem" }}
                  />
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
    </div>
  )
}