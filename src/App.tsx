import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Adoption from './components/Adoption';
import { Routes, Route } from "react-router-dom";


export default function App() {
  const [name, setName] = useState('');
  
  return (
    <Routes>
      <Route path="/" element={<Login name={name} setName={setName} />} />
      <Route path="/home" element={<Home name={name} />} />
      <Route path="/adoption" element={<Adoption />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
