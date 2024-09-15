import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import Completed from "./pages/Completed";
import Today from "./pages/Today";
import Progress from "./pages/Progress";

function App() {
  return (
    <>
      <Router>
    <Navbar />
    <div className='container mx-auto px-3 pb-12'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/today" element={<Today />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
