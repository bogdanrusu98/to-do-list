import React from "react";
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStatus from "./hooks/useAuthStatus";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import Completed from "./pages/Completed";
import Today from "./pages/Today";
import Progress from "./pages/Progress";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Aside from "./components/Aside";


// Componenta care gestionează Aside-ul
function Layout() {
  const location = useLocation(); // Obținem locația curentă

  // Verificăm dacă ruta curentă este "/sign-in" sau "/sign-up"
  const isAuthRoute = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <>
      <Navbar />
      {!isAuthRoute && <Aside />} {/* Ascundem aside-ul pe rutele "/sign-in" și "/sign-up" */}
    </>
  );
}

function App() {

  return (
    <>
      <Router>
      <Layout />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/today" element={<Today />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
