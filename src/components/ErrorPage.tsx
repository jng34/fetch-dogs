import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function ErrorPage() {
  const [countDown, setCountDown] = useState(5);

  const setTimer = (): void => {
    setTimeout(() => {
      setCountDown(countDown-1);
    }, 1000)
  }
  
  setTimer();
  
  if (countDown === 0) return <Navigate to="/home" replace={true} />;
  
  return (
    <div className='pageLayout'>
      <h1>Oops! 404 Error</h1>
      <p>Sorry, this page does not exist.</p>
      <p>You will be redirected in.....<b>{countDown}s</b></p>
    </div>
  );
}
