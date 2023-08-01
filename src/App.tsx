import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Login from "./components/Login";
import MyAdoptions from './components/AdoptionPage';
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/adoption" element={<MyAdoptions />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
