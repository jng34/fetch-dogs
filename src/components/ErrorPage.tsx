import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const [countDown, setCountDown] = useState(5);
  const navigate = useNavigate();

  const setTimer = (): void => {
    if (countDown === 0) navigate("/home");
    setTimeout(() => {
      setCountDown(countDown-1);
    }, 1000)
  }

  setTimer();

  return (
    <div className='pageLayout'>
      <h1>Oops! 404 Error</h1>
      <p>Sorry, this page does not exist.</p>
      <Link to={'/home'}>Return to Home Page</Link><br/>
      <p>You will be redirected in.....<b>{countDown}s</b></p>
    </div>
  );
}
