import React,{useState} from 'react'
import axios from 'axios'
function Contact() {
  const [data,setData]= useState()
    axios.get("http://localhost:5000/contact").then((res) => setData(res.data));
  return (
    
   <h1>{data}</h1>
  )
}

export default Contact