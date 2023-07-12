import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dogs from './components/Dogs';

// Serves as an authorization middleware
const AuthRoutes = () => {
  const checkUser = localStorage.getItem('user');
  if (!checkUser) return <Navigate to='/' replace />
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<AuthRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

