import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dogs from './components/Dogs';

type Props = {}

const AuthRoutes = () => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to='/' replace />
  return <Outlet />
}

export default function App(props: Props) {
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

