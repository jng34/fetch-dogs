import { useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import { Dog, DogTableProps } from "./Types";
import { upArrow, downArrow } from "./Arrows";
import DogModal from "./DogModal";

export default function DogsTable({
  dogObjs,
  currentPage,
  displaySize,
  toggleMatch,
  sortName,
  sortAge,
  sortBreed,
  onSortName,
  onSortAge,
  onSortBreed,
}: DogTableProps) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Dog>({
    id: "",
    img: "",
    name: "",
    age: 0,
    zip_code: "",
    breed: "",
  });

  const currentDogs = useMemo(() => {
    if (toggleMatch) return dogObjs;
    const firstPageIndex = ((currentPage - 1) * displaySize) % 100;
    const lastPageIndex = 
      (firstPageIndex + displaySize) % 100 
      ? (firstPageIndex + displaySize) % 100 
      : (firstPageIndex + displaySize);
    return dogObjs.slice(firstPageIndex, lastPageIndex);
  }, [dogObjs, currentPage, toggleMatch]);

  return (
    <div id="table">
      <table>
        <thead>
          <tr className="table-row">
            <th className="table-col">🐾</th>
            <th className="table-col" onClick={onSortName}>
              NAME
              {/* <span style={{ display: 'none', opacity: '0.5' }}> */}
                {sortName ? upArrow : downArrow} 
              {/* </span> */}
            </th>
            <th className="table-col" onClick={onSortAge}>
              AGE
              {sortAge ? upArrow : downArrow}
            </th>
            <th className="table-col" onClick={onSortBreed}>
              BREED
              {sortBreed ? upArrow : downArrow}
            </th>
            <th className="table-col">ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {currentDogs.map((dogObj: Dog) => {
            return (
              <tr
                key={dogObj.id}
                className="table-row"
                onClick={() => {
                  setModalData(dogObj);
                  setToggleModal(true);
                }}
                >
                <td style={{ padding: '10px 10px' }}>
                  <Image
                    src={dogObj.img}
                    style={{ width: "5rem", height: "5rem" }}
                    rounded
                  />
                </td>
                <td >{dogObj.name}</td>
                <td>{dogObj.age}</td>
                <td>{dogObj.breed}</td>
                <td>{dogObj.zip_code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <DogModal 
        dogObj={modalData}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    </div>
  );
}
