import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Completed from "./pages/Completed";
import Today from "./pages/Today";
import Progress from "./pages/Progress";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Aside from "./components/Aside";
import Profile from "./pages/Profile";
import { UserProvider } from './hooks/userContext';
import PrivateRoute from "./hooks/PrivateRoute";


// Componenta care gestionează Aside-ul
function Layout() {
  const location = useLocation(); // Obținem locația curentă

  // Verificăm dacă ruta curentă este "/sign-in" sau "/sign-up"
  const isAuthRoute = location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/profile';

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
        <UserProvider>
          <Layout />

          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/progress" element={<Progress />} />
            <Route path="/completed" element={
              <PrivateRoute>
                <Completed />
              </PrivateRoute>} />
            <Route path="/today" element={
              <PrivateRoute>
                <Today />
              </PrivateRoute>} />
          </Routes>
        </UserProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
