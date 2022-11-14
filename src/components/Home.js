import Page from "./Page";
import html2pdf from "html2pdf.js";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import axios from 'axios'
function Home() {
  const componentRef = useRef();
  const generatePDF = () => {
    const source = document.getElementById("container");
    const fileName = "Marks.pdf";
    var opt = {
      margin: 0.1,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 8 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(source).save();
  };
  // axios.get('http://localhost:5000/user').then((res)=>console.log(res))
  
  return (
    <div className="App" id="container">
      <Page ref={componentRef} />
      <div className="d-flex justify-content-center m-3">
        <Button variant="light" onClick={generatePDF}>
          Save & Download
        </Button>
      </div>
      
    </div>
  );
}

export default Home;
