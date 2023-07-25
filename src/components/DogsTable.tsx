import { useMemo, useState } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import DogCard from "./DogCard";

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
  setToggleMatch: (arg: boolean) => void;
  // displayDogCard: (arg: number) => void;
  // displayDogCard: (arg: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

export default function DogsTable({
  dogObjs,
  currentPage,
  displaySize,
  toggleMatch,
  setToggleMatch,
  // displayDogCard
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

  console.log(modalData)
  const currentDogs = useMemo(() => {
    // if (toggleMatch) return dogObjs  ;
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
            <th>NAME</th>
            <th>AGE</th>
            <th>BREED</th>
            <th>ZIP CODE</th>
          </tr>
        </thead>
        <tbody>
          {currentDogs.map((dogObj: Dog) => {
            return (
              <>
                <tr
                  key={dogObj.id}
                  className="dogTableRow"
                  onClick={() => {
                    setModalData(dogObj);
                    setToggleModal(true);
                  }}
                  >
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
              </>
            );
          })}
        </tbody>
      </table>
      {/* {modalData.name ? 
      <DogCard 
        dogObj={modalData}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
      : 
      <></>
      } */}
      <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <img src={modalData.img} alt="dog" />
              </Col>
              <Col>
                <ul>
                  <li>
                    Breed: {modalData.breed}
                  </li>
                  <li>
                    age: {modalData.age}
                  </li>
                  <li>
                    zip_code: {modalData.zip_code}
                  </li>
                </ul>
              
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => console.log(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => console.log('selected')}>
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
