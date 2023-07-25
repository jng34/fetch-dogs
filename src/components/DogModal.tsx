import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";

interface Dog {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
}

interface Props {
  dogObj: Dog,
  toggleModal: boolean,
  setToggleModal: (arg: any) => void
}

export default function DogModal({ dogObj, toggleModal, setToggleModal }: Props) {
  const { img, name, age, zip_code, breed } = dogObj;

  return (
    <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Image src={img} rounded fluid/>
            </Col>
            <Col>
              <ul>
                <li>
                  <b>Breed:</b> {breed}
                </li>
                <li>
                  <b>Age:</b>: {age}
                </li>
                <li>
                  <b>Zip Code:</b> {zip_code}
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setToggleModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => console.log('selected')}>
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  )
}