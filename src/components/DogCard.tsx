import { Modal, Button, Card } from "react-bootstrap";

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

export default function DogCard({ dogObj, toggleModal, setToggleModal }: Props) {
  const { img, name, age, zip_code, breed } = dogObj;

  // const displayDogModal = (
  //   <Modal show={dogModal} onHide={() => showDogModal(false)} centered>
  //     <Modal.Header closeButton>
  //       <Modal.Title>{name}</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       Pic: <img src={img} alt=""/>
  //       Breed: {breed}
  //       age: {age}
  //       zip_code: {zip_code}
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button variant="secondary" onClick={() => console.log(false)}>
  //         Close
  //       </Button>
  //       <Button variant="primary" onClick={() => console.log('selected')}>
  //         Select
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // )

  return (
    <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Pic: <img src={img} alt=""/>
        Breed: {breed}
        age: {age}
        zip_code: {zip_code}
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
    // <Card style={{ width: '10rem' }}>
    //   <Card.Img variant="top" src={img} />
    //   <Card.Body>
    //     <Card.Title style={{ fontWeight: 'bold' }}>{name}</Card.Title>
    //     <Card.Text>
    //       <span>Breed: {breed}</span><br/>
    //       <span>Age: {age}</span><br/>
    //       <span>Zip Code: {zip_code}</span>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
  )
}