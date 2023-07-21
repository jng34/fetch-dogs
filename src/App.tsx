import { useContext, useState } from "react";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";

// AuthRoutes serves as an authorization middleware
// const AuthRoutes = () => {
//   /* 
//     Indirectly check for cookie by 
//     checking an API endpoint for auth access 
//   */
//   const checkForAuth = async () => {
//     try {
//       const res = await fetch(
//         "https://frontend-take-home-service.fetch.com/dogs/breeds",
//         {
//           method: "GET",
//           credentials: "include",
//           headers: { "Content-type": "application/json" },
//         }
//       );
//       if (res.status === 401) return <Navigate to="/" replace />;
//     } catch (error) {
//       return <Navigate to="/" replace />;
//     }
//   };
//   checkForAuth();
//   // returns children components and index path as last resort
//   return <Outlet />;
// };


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/" element={<AuthRoutes />}> */}
        <Route path="/home" element={<Home />} />
      {/* </Route> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
