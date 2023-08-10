import 'bootstrap/dist/css/bootstrap.min.css';
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Adoption from './components/Adoption';
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/adoption" element={<Adoption />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
