import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Dogs from './components/Dogs';

// Serves as an authorization middleware
const AuthRoutes = () => {
  const navigate = useNavigate();
  const checkUser = localStorage.getItem('user');
  if (!checkUser) return <Navigate to='/' replace />
  const checkForAuth = async () => {
    try {
      await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds", {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        console.log(res.status)
        if (res.status === 401) navigate("/");
      })
    } catch (error) {
      navigate("/");
    }
  }
  checkForAuth()
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<AuthRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element ={<ErrorPage />} />
    </Routes>
  )
}

