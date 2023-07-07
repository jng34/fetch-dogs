export default function DogCard({ dogObj }: any) {
  const { img, name, age, zip_code, breed } = dogObj;
  return (
    <li>
      <img src={img} style={{ width: '100px', height: '100px' }}/>
      {name}
    </li>
  )
}