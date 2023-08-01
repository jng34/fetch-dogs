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
        <p style={{ textAlign: 'center', alignContent: 'center' }}>
          <span style={{ fontSize: '25px', fontWeight: 'bold' }}>{name}</span><br/>
          <span style={{ fontSize: '20px', fontStyle: 'italic' }}>
            {breed}, {age} yrs, {zip_code}
          </span>
        </p>
      </div>
      <br/>
      <button id="back" type="button" onClick={() => navigate("/home")}>Back to Search</button>
    </div>
  );
}

 