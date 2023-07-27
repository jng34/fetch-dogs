import { useMemo, useState } from "react";
import { Image } from "react-bootstrap";
import DogModal from "./DogModal";

interface Dog {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
}

interface Props {
  dogObjs: Dog[];
  currentPage: number;
  displaySize: number;
  toggleMatch: boolean;
  onSortName: (arg: any) => void;
  onSortAge: (arg: any) => void;
  onSortBreed: (arg: any) => void;
  onSortZip: (arg: any) => void;
}

export default function DogsTable({
  dogObjs,
  currentPage,
  displaySize,
  toggleMatch,
  onSortName,
  onSortAge,
  onSortBreed,
  onSortZip
}: Props) {
  const [toggleModal, setToggleModal] = useState(false);
  const [modalData, setModalData] = useState({
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
            <th onClick={onSortZip}>ZIP CODE</th>
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
