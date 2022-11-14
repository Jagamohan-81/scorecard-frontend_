import React from "react";
import { Routes ,Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from './components/Loginsignup/Login'
import StudentsListPage from './components/Middle/StudentsListPage'
import PageNotFound from "./components/PageNotFound"
import Logout from "./components/Loginsignup/Logout"
function App() {
  return (
    <Routes >
        <Route path="/" element={<Login />} />
     <Route path="/logout" element={<Logout />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/input" element={<StudentsListPage/>} />
      <Route path="*" elemenet={<PageNotFound />}/>
    </Routes >
  );
}

export default App;
