import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface User {
  name: string,
  email: string
}

interface Props {
  user: User
}


export default function ErrorPage({ user }: Props) {
  const [countDown, setCountDown] = useState(5);
  const navigate = useNavigate();

  const setTimer = (): void => {
    setTimeout(() => {
      setCountDown(countDown-1);
    }, 1000)
  }
  
  setTimer();
  
  if (countDown === 0) {
    if (user.name) return <Navigate to="/home" replace={true} />;
  } else {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className='pageLayout'>
      <h1>Oops! 404 Error</h1>
      <p>Sorry, this page does not exist.</p>
      <p>You will be redirected in.....<b>{countDown}s</b></p>
    </div>
  );
}
