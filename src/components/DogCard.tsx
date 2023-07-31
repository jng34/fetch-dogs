import { useNavigate } from "react-router-dom";

export default function DogCard({ adoptedDog }: any) {
  const { img, name, age, breed, zip_code } = adoptedDog;
  const navigate = useNavigate();

  return (
    <div className="match">
      <h2>Congratulations on your match!</h2>
      <br/>
      <div className="match-card" >
        <img src={img} alt="dogPic" className="match-img"/><br/>
        <p style={{ textAlign: 'center' }}>
          <h3>{name}</h3>
          Breed: {breed}<br/>
          Age: {age}<br/>
          Zip Code: {zip_code}
        </p>
      </div>
      <br/>
      <button id="back" type="button" onClick={() => navigate("/home")}>Back to Search</button>
    </div>
  );
}

 