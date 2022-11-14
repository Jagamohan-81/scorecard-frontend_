
import { Row,Col } from "react-bootstrap";
import React,{useState,useEffect} from "react";
import Form1 from "./Form1";
import { AiOutlineDelete } from "react-icons/ai";
import { RemoveResult } from "../Redux/actions/action";
import "./styles/styles.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Part1 = ({user}) => {
  const [rank,setRank]=useState("")
  const [result_part1,setResult_part1]=useState([])
  
  let  sum=(data)=>{
    let totalSum = 0;
  for(let i=0; i<data.length; i++){
    totalSum+=Number(data[i].total)
    
  }
    return totalSum
  }

let  percentage=(data)=>{
    let totalNumber = data.filter((item)=> item.name !== "Drawing").length * 100 || 0
    // console.log(totalNumber)
    if(sum(data)){
      
      return (((sum(data)*100)/totalNumber).toFixed(2))

    }else{return null}
  
  }
  const Rank=(data)=>{
    
    if(percentage(data)==null){
      return ""
    }
    else if(percentage(data)>90){
      return "A1"
    }
    else if(percentage(data)>80){
      return "A2"
    }
    else if(percentage(data)>70){
      return "B1"
    }
    else if(percentage(data)>60){
      return "B2"
    }
    else if(percentage(data)>50){
      return "C1"
    }
    else if(percentage(data)>44){
      return "C2"
    }
    else if(percentage(data)<44){
      return "Fail"
    }
  }
  // const { result_part1 } = useSelector((state) => state.result_data);


  // const dispatch = useDispatch();
const student_id=JSON.parse(localStorage.getItem("student_id")) || user.student_id
const getResultUI=()=>{
  axios.get(`http://localhost:5000/result/:${student_id}`).then((res)=>{
    setResult_part1(res.data)
  })
}
useEffect(() => {
  getResultUI()
}, [])


  
  const handleDelte = (id) => {
    axios.delete(`http://localhost:5000/result/:${id}`).then((res)=>{
      //console.log("deleted",res)
      
    }).catch((err)=>{
      console.log("delete error :" ,err)
    })
    setTimeout(()=>{
      getResultUI()

    },100)
    
  };


  return (
    <>
    <Col
      md={7}
      sm={12}
      xs={12}
      className="border-end border-secondary border-1"
    >
      <Row className="border-bottom border-secondary">
        <Col className="text-center text-primary fw-bold pt-2">
          Part-I : Scholastic Areas
          <Form1 getResultUI={getResultUI} />
        </Col>
      </Row>

      <Row className="border-bottom border-secondary  heading-height">
        <Col
          className="text-center border-end border-secondary paddingZero fw-bold"
          md={2}
          sm={2}
          xs={1}
        >
          Sl No
        </Col>
        <Col
          md={3}
          sm={3}
          xs={5}
          className="border-end border-secondary fw-bold d-flex align-items-center justify-content-center"
        >
          {" "}
          SUBJECT
        </Col>

        <Col md={7} sm={7} xs={6}>
          <Row>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="paddingZero text-center border-end border-secondary paddingZero fw-bold p-0"
            >
              FA
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end border-secondary paddingZero p-0  fw-bold fntSize"
            >
              O1
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end border-secondary paddingZero fw-bold p-0"
            >
              SA
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end  border-secondary paddingZero fw-bold p-0"
            >
              O2
            </Col>
            <Col md={4} sm={4} xs={4} className="text-center  fw-bold  p-0">
              Total Marks
            </Col>
          </Row>
          <Row>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end border-top border-secondary p-0 fw-bold paddingZero"
            >
              40
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end border-top border-secondary p-0 fw-bold paddingZero"
            >
              10
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-end border-top border-secondary p-0 fw-bold paddingZero"
            >
              40
            </Col>
            <Col
              md={2}
              xs={2}
              sm={2}
              className="text-center border-top border-end border-secondary p-0 fw-bold paddingZero"
            >
              10
            </Col>
            <Col
              md={4}
              sm={4}
              xs={4}
              className="text-center border-top border-secondary p-0 fw-bold paddingZero"
            >
              100
            </Col>
          </Row>
        </Col>
      </Row>

      {result_part1.map((item, i) => (
        
        <Row
          key={Date.now() + Math.random()}
          className="border-bottom border-secondary"
        >
          <Col
            md={2}
            sm={2}
            xs={1}
            className="text-center border-end border-secondary paddingZero fw-bold"
          >
            {i + 1 < 10 ? `0${i + 1}` : `${i + 1}`}
            <span
                  style={{ }}
                  onClick={() => handleDelte(item.result_id)}
                  className="float-start"
                  
                >
                  <AiOutlineDelete  className="red disapear"/>
                </span>
          </Col>
          <Col
            md={3}
            sm={3}
            xs={5}
            className=" border-end border-secondary fw-bold"
          >
            {item.subject}{" "}
          </Col>
          <Col md={7} sm={7} xs={6}>
            <Row>
              <Col
                md={2}
                xs={2}
                sm={2}
                className="text-center border-end border-secondary p-0 fw-bold  paddingZero "
              >
                {item.fa}
              </Col>
              <Col
                md={2}
                xs={2}
                sm={2}
                className="text-center border-end border-secondary p-0 fw-bold paddingZero"
              >
                {item.o1}
              </Col>
              <Col
                md={2}
                xs={2}
                sm={2}
                className="text-center border-end border-secondary p-0 fw-bold paddingZero"
              >
                {item.ba}
              </Col>

              <Col
                md={2}
                xs={2}
                sm={2}
                className="text-center  border-end border-secondary p-0 fw-bold  paddingZero"
              >
                {item.o2}
              </Col>
              <Col
                md={4}
                xs={4}
                sm={4}
                className="text-center  fw-bold "
              >
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;   {item.total}
            
                
                {/* <span  className="float-end">
                
                  <Form1 idx={i} edit={true} data={item} />
                </span> */}
              </Col>
            </Row>
          </Col>
        </Row>
      ))}

      <Row className="border-bottom border-secondary">
        {/* <Col md={1} sm={1} xs={1}></Col> */}
        <Col
          md={5}
          sm={5}
          xs={5}
          className="border-end border-secondary fw-bold"
        >
          GRAND TOTAL
        </Col>
        <Col md={7} sm={7} xs={6} className="text-end">
          <Row>
            <Col xs={{ span: 4, offset: 8 }} className="text-center fw-bold">
            {sum(result_part1)||""}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border-bottom border-secondary">
        {/* <Col md={1} sm={1} xs={1}></Col> */}
        <Col
          md={5}
          sm={5}
          xs={5}
          className="border-end border-secondary fw-bold"
        >
          PERCENTAGE
        </Col>
        <Col md={7} sm={7} xs={6} className="text-end">
          <Row>
            <Col xs={{ span: 4, offset: 8 }}  className="text-center fw-bold p-0">
              {/* {((sumToatal*100)/(result_part1.length*100)).toFixed(2)} */}
              {percentage(result_part1)||""}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="borderSmallScreen">
        {/* <Col md={1} sm={1} xs={1}></Col> */}
        <Col
          md={5}
          sm={5}
          xs={5}
          className="border-end border-secondary fw-bold"
        >
          RANK
        </Col>
        <Col md={7} sm={7} xs={6} className="text-end">
          <Row>
            <Col
              xs={{ span: 4, offset: 8 }}
              className="text-center fw-bold p-0"
            >
              {Rank(result_part1)||""}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </>
  );
};

export default Part1;
