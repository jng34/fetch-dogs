import { Card } from "react-bootstrap";

export default function DogCard({ dogObj }: any) {
  const { img, name, age, zip_code, breed } = dogObj;
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold' }}>{name}</Card.Title>
        <Card.Text>
          <span>Breed: {breed}</span><br/>
          <span>Age: {age}</span><br/>
          <span>Zip Code: {zip_code}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}