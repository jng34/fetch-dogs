import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
