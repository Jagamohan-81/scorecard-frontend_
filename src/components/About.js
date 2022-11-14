import axios from "axios";
import React,{useState} from "react";

function About() {
    const [data,setData]=useState()
  axios.get("http://localhost:5000/about").then((res) => setData(res.data));
  return <h1>{data}</h1>;
}

export default About;
