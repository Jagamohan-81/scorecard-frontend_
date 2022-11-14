import React from 'react'
import { useNavigate } from "react-router-dom";
function Logout() {
const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.setItem("authenticated", false);
  navigate("/")
}

  return (
    <div style={{padding:"2px",margin:"3px"}}>
        <button onClick={handleLogout}> Logout </button>



    </div>
  )
}

export default Logout