import { useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import { Dog, DogTableProps } from "./Types";
import DogModal from "./DogModal";


export default function DogsTable({
  dogObjs,
  currentPage,
  displaySize,
  toggleMatch,
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
    <div>
      <table id="dogTable">
        <thead>
          <tr className="dogTableRow">
            <th>PIC</th>
            <th onClick={onSortName}>NAME</th>
            <th onClick={onSortAge}>AGE</th>
            <th onClick={onSortBreed}>BREED</th>
            <th>ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {currentDogs.map((dogObj: Dog) => {
            return (
              <tr
                key={dogObj.id}
                className="dogTableRow"
                onClick={() => {
                  setModalData(dogObj);
                  setToggleModal(true);
                }}
                >
                <td>
                  <Image
                    src={dogObj.img}
                    style={{ width: "5rem", height: "5rem" }}
                    rounded
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
      <DogModal 
        dogObj={modalData}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    </div>
  );
}
