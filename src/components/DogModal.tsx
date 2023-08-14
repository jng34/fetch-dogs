import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import { DogModalProps } from "../utils/types";
import { useNavigate } from "react-router-dom";

export default function DogModal({ dogObj, toggleModal, setToggleModal }: DogModalProps) {
  const { id, img, name, age, zip_code, breed } = dogObj;
  const navigate = useNavigate();

  return (
    <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>About Me 🐾 </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Image src={img} alt="matched dog image" rounded fluid/>
            </Col>
            <Col>
              <p>
                <b>Name:</b> {name}<br/>
                <b>Breed:</b> {breed}<br/>
                <b>Age:</b> {age}<br/>
                <b>Zip Code:</b> {zip_code}<br/>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setToggleModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => navigate('/adoption', { state: { dogMatch: id }})}>
          Adopt
        </Button>
      </Modal.Footer>
    </Modal>
  )
}